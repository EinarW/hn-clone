
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Posts from './components/Posts'
import User from './components/User'
import Post from './components/Post'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

export default class App extends React.Component {
    state = {
        theme: 'dark',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return(
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <React.Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Redirect exact from='/' to='/posts'/>
                                    <Route exact path='/posts' component={Posts} />
                                    <Route exact path='/post' component={Post} />
                                    <Route exact path='/user' component={User} />
            
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
                    </div>
                </ThemeProvider>
            </Router>
        )   
    }
}

ReactDOM.render(
    <App/>,                        // React Element
    document.getElementById('root')  // Where to render element to
)

serviceWorkerRegistration.register();