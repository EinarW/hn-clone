import React from "react";
import { convertTime } from "../utils/time";
import { Link } from "react-router-dom";

export default class Item extends React.Component {
    numberOfComments = (comments) => {
        let count = 0
        if (comments !== undefined) {
            comments.forEach(() => count++)
        }
        
        return count
    }

    createMarkup(markup) {
        return {__html: markup}
    }

    render() {
        const { item, fontSize = '20px'} = this.props

        const isComment = item.type === 'comment'

        return (
            <div 
                className='item-description' 
                style={
                    isComment ? {
                        backgroundColor: 'rgb(240,240,240)', 
                        padding: '1em',
                        borderRadius: '10px'
                    } 
                    : null
                }
            >
                <ul>
                    {isComment !== true && (
                        <li>
                            <h3 style={{fontSize: fontSize}} className='title'>
                                {item.url === undefined && (
                                    <Link to={`/post?id=${item.id}`}>
                                        {item.title}
                                    </Link> 
                                )}
                                {item.url !== undefined && (
                                    <a href={item.url}>
                                        {item.title}
                                    </a>  
                                )}
                            </h3>
                        </li>
                    )}
                    <li>
                        {'by '} 
                        <Link 
                            className='with-line' 
                            to={`/user?id=${item.by}`}
                        >
                            {item.by}
                        </Link>
                        {` on ${convertTime(item.time)}`}
                            <React.Fragment>
                            {` with `}
                            <Link 
                                className='with-line' 
                                to={`/post?id=${item.id}`}
                            >
                                {this.numberOfComments(item.kids)}
                            </Link>
                            {isComment === false ? ' top level comments' : ' replies'}
                        </React.Fragment>
                    </li>
                    {this.props.showText && item.url === undefined && (
                        <li className='item-text'>
                            <div dangerouslySetInnerHTML={this.createMarkup(item.text)}/>
                        </li>
                    )} 
                </ul>
            </div>
        )
    }
}

Item.defaultProps = {
    showText: false
}