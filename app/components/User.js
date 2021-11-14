import React from "react";
import Loading from "./Loading";
import Item from "./Item";
import queryString from "query-string";
import { getUser, getUserPosts } from "../utils/api";
import { convertTime } from "../utils/time";

export default class User extends React.Component {
    state = {
        username: null,
        user: null,
        posts: null,
        error: null
    }

    getUserNameFromQueryString = () => {
        return queryString.parse(this.props.location.search).id
    }

    componentDidMount() {
        this.setState({
            username: this.getUserNameFromQueryString()
        }, () => {
            getUser(this.state.username)
                .then((user) => this.setState({
                    user: user
                }, () => {
                    getUserPosts(this.state.user.submitted)
                        .then((posts) => this.setState({
                            posts: posts
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
        const { user, posts, error } = this.state
        return (user === null || posts === null) && error === null
    }

    createMarkup(markup) {
        return {__html: markup}
    }
    
    render () {
        const { posts, user } = this.state

        return(
            <React.Fragment>
                {this.isLoading() && <Loading content='Fetching user data'/>}
                {this.isLoading() === false && (
                    <div className='user'>
                        <div className='user-description'>
                            <h1>{user.id}</h1>
                            {'joined '}
                            <p>{convertTime(user.created)}</p>
                            {' has '}
                            <p>{user.karma}</p> 
                            {' karma'}
                        </div>
                        <div className='user-about'>
                            {user.about !== null && <div dangerouslySetInnerHTML={this.createMarkup(user.about)}/>}
                        </div>
                        <h2>Posts</h2>
                        <div className='item-description'>
                            {Object.keys(posts).map((id) => (
                                <li key={id}>
                                    <Item fontSize='15px' item={posts[id]}/>
                                </li>
                            ))}
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}