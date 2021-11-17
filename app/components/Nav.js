import React from 'react'
import queryString from "query-string";
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
    color: 'rgb(214,43,31)'
}

export default function Nav () {
    return(
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink 
                                activeStyle={activeStyle} 
                                className='nav-link'
                                to="/posts"
                                isActive={(match, location) => {
                                    return queryString.parse(location.search).type === undefined
                                }}
                            >
                                Top
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                activeStyle={activeStyle} 
                                className='nav-link'
                                to='/posts?type=new'
                                isActive={(match, location) => {
                                    return queryString.parse(location.search).type === 'new'
                                }}
                            >
                                New
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        style={{fontSize: 30}}
                        className='btn-clear'
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}