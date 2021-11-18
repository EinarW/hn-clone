import React from "react";
import Loading from "./Loading";
import Item from "./Item";
import queryString from "query-string";
import { getUser, getChildItems } from "../utils/api";
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
                    getChildItems(this.state.user.submitted)
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

    createMarkup = (markup) => ({__html: markup})
    
    render () {
        const { posts, user } = this.state

        return(
            <React.Fragment>
                {this.isLoading() && <Loading content='Fetching user data'/>}
                {this.isLoading() === false && (
                    <div className='user'>
                        <div className='user-description'>
                            <h1>{user.id}</h1>
                            <span>
                                {'joined '}
                                <p>{convertTime(user.created)}</p>
                                {' has '}
                                <p>{user.karma}</p> 
                                {' karma'}
                            </span>
                        </div>
                        <div className='user-about'>
                            {user.about !== null && <div dangerouslySetInnerHTML={this.createMarkup(user.about)}/>}
                        </div>
                        <hr/>
                        <h2>Posts</h2>
                        {Object.keys(posts).map((id) => (
                            <React.Fragment key={'top' + id}>
                                <li key={id}>
                                    <Item item={posts[id]}/>
                                </li>
                                <hr key={'hr' + id}/>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </React.Fragment>
        )
    }
}