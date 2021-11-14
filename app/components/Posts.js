import React from "react";
import Loading from "./Loading";
import Nav from './Nav'
import queryString from "query-string";
import { getStories } from "../utils/api";
import Item from "./Item";

export default class Popular extends React.Component {
    state = {
        type: 'top',
        posts: null,
        error: null
    }

    componentDidMount() {
        this.updateStories()
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.updateStories();
        }
    }


    updateStories = () => {
        this.setState({
            type: this.getTypeFromQueryString(),
            error: null,
            posts: null
        }, () => {
            getStories(this.state.type)
                .then((items) => this.setState({
                    posts: items
                }))
                .catch(({ error }) => this.setState({
                    error: error
                }))
        })
        
    }

    getTypeFromQueryString = () => {
        let queryType = queryString.parse(this.props.location.search).type
        queryType = queryType === undefined ? 'top' : queryType

        return queryType
    }

    isLoading = () => {
        const { error, posts } = this.state
        return posts === null && error === null
    }

    
    
    render() {
        const { type, posts, error } = this.state
            return (
                <React.Fragment>
                    <Nav/>
                    {this.isLoading() && <Loading content={`Fetching ${this.getTypeFromQueryString()} posts`} />}
                    {this.isLoading() === false && error === true && error}
                    {this.isLoading() === false && error === null && (
                        <React.Fragment>
                            <ul>
                                {Object.keys(posts).map((id) => (
                                    <li key={id}>
                                        <Item item={posts[id]}/>
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )
        }      
    }