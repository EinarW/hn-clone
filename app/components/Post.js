import React from "react";
import Loading from "./Loading";
import queryString from 'query-string'
import Item from "./Item";
import { getPost, getChildItems } from "../utils/api";


export default class Post extends React.Component {
    state = {
        id: null,
        post: null,
        comments: null,
        error: null
    }

    componentDidMount() {
        this.getItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.getItem();
        }
    }

    getItem = () => {
        this.setState({
            id: this.getPostIdFromQueryString()
        }, () => {
            getPost(this.state.id)
                .then((post) => this.setState({
                    post: post
                }, () => {
                    getChildItems(this.state.post.kids, true)
                        .then((comments) => this.setState({
                            comments: comments
                        }))
                        .catch((error) => this.setState({
                            error: error
                        }))
                }))
                .catch((error) => this.setState({
                    error: error
                }))
        })
    }

    isLoading = () => {
        const { post, comments, error } = this.state
        return (post === null || comments === null) && error === null
    }

    getPostIdFromQueryString = () => {
        return queryString.parse(this.props.location.search).id
    }

    numberOfComments = (comments) => {
        let count = 0
        if (comments !== undefined) {
            comments.forEach(() => count++)
        }
        
        return count
    }

    render() {
        const { post, comments } = this.state
        return(
            <div>
                {this.isLoading() && <Loading />}
                {this.isLoading() === false && (
                    <ul>
                        <li>
                            <Item showText={true} item={post}/>
                        </li>
                        {comments.map((comment) => (
                            <li key={comment.id}> 
                                <Item showText={true} item={comment}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}