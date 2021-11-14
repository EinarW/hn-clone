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

    render() {
        const { item, fontSize = '20px'} = this.props

        return (
            <div className='item-description'>
                <ul>
                    <li>
                        <h3 style={{fontSize: fontSize}} className='title'>
                            <a href={
                                item.url === undefined 
                                    ? `https://news.ycombinator.com/item?id=${item.id}` 
                                    : item.url 
                            }>
                                {item.title}
                            </a>
                        </h3>
                    </li>
                    <li>
                        {'by '} 
                        <Link 
                            className='with-line' 
                            to={`/user?id=${item.by}`}
                        >
                            {item.by}
                        </Link>
                        {` on ${convertTime(item.time)} with `}
                        <a 
                            className='with-line' 
                            href={`https://news.ycombinator.com/item?id=${item.id}`}
                        >
                            {this.numberOfComments(item.kids)}
                        </a>
                        {' comments'}
                    </li>
                </ul>
            </div>
        )
    }
}