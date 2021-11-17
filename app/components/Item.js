import React from "react";
import { convertTime } from "../utils/time";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";

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
            <ThemeConsumer>
                {({ theme }) => (
                    <div 
                        className='item' 
                        style={
                            isComment ? {
                                backgroundColor: theme === 'light' ? 'rgb(240,240,240)' : 'rgb(15,15,15)', 
                                padding: '1em',
                                borderRadius: '10px'
                            } 
                            : null
                        }
                    >
                        <ul>
                            {isComment !== true && (
                                <li>
                                    <h3 className='title'>
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
                            <li className='item-description'>
                                <ul>
                                    <li>
                                        {'by '} 
                                        <Link 
                                            className='with-line' 
                                            to={`/user?id=${item.by}`}
                                        >
                                            {item.by}
                                        </Link>
                                        {` on ${convertTime(item.time)}`}
                                    </li>
                                    <li>
                                        {` with `}
                                        <Link 
                                            className='with-line' 
                                            to={`/post?id=${item.id}`}
                                        >
                                            {this.numberOfComments(item.kids)}
                                        </Link>
                                        {isComment === false ? ' top level comments' : ((this.numberOfComments(item.kids) > 1) || (this.numberOfComments(item.kids) === 0) ? ' replies' : ' reply')}
                                    </li>
                                </ul>
                            </li>
                            {this.props.showText && item.url === undefined && (
                                <li className='item-text'>
                                    <div dangerouslySetInnerHTML={this.createMarkup(item.text)}/>
                                </li>
                            )} 
                        </ul>
                    </div>  
                )}
            </ThemeConsumer>
        )
    }
}

Item.defaultProps = {
    showText: false
}