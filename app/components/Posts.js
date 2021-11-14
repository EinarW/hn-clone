import React from "react";
import Loading from "./Loading";
import queryString from "query-string";
import { getStories } from "../utils/api";
import { convertTime } from "../utils/time";


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
            type: this.findType(),
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

    numberOfComments = (comments) => {
        let count = 0
        if (comments !== undefined) {
            comments.forEach(() => count++)
        }
        
        return count
    }

    findType = () => {
        let queryType = queryString.parse(this.props.location.search).type
        queryType = queryType === undefined ? 'top' : queryType

        return queryType
    }

    isLoading = () => {
        const { error, posts } = this.state
        return posts === null && error === null
    }

    
    
    render() {
        const { type, posts } = this.state
            return (
                <React.Fragment>
                    {this.isLoading() && <Loading content={`Fetching ${this.state.type} posts`} />}
                    {this.isLoading() === false && this.state.error === true && this.state.error}
                    {this.isLoading() === false && this.state.error === null && (
                        <React.Fragment>
                            <ul>
                                {Object.keys(posts).map((id) => (
                                    <li key={id}>
                                        <div className='item'>
                                            <ul>
                                                <li>
                                                    <h3 className='title'>
                                                        <a href={
                                                            posts[id].url === undefined 
                                                                ? `https://news.ycombinator.com/item?id=${posts[id].id}` 
                                                                : posts[id].url 
                                                        }>
                                                            {posts[id].title}
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    {'by '} 
                                                    <a 
                                                        className='with-line' 
                                                        href={`https://news.ycombinator.com/user?id=${posts[id].by}`}
                                                    >
                                                        {posts[id].by}
                                                    </a>
                                                    {` on ${convertTime(posts[id].time)} with `}
                                                    <a 
                                                        className='with-line' 
                                                        href={`https://news.ycombinator.com/item?id=${posts[id].id}`}
                                                    >
                                                        {this.numberOfComments(posts[id].kids)}
                                                    </a>
                                                    {' comments'}
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )
        }      
    }