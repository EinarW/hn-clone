import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Posts from './components/Posts'
import Loading from './components/Loading'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

export default function App () {

    return(
        <Router>
            <div className='container'>
                <h1>Hacker News Clone</h1>
                <Nav />
                <React.Suspense fallback={<Loading/>}>
                    <Switch>
                        <Redirect exact from='/' to='/posts'/>
                        <Route exact path='/posts' component={Posts} />

                        <Route render={() => (
                                <React.Fragment>
                                    <h1>404 - This page does not exist</h1>
                                    <Link to='/'>Click here to return</Link>
                                </React.Fragment>
                            )}
                        />
                    </Switch>
                </React.Suspense>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,                        // React Element
    document.getElementById('app')  // Where to render element to
)