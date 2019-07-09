import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import AsyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

const SuspenseDemo = React.lazy(() => import('./SuspenseDemo/SuspenseDemo'));

const AsyncNewPost = AsyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true,
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to='/posts/'
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/suspense-demo',
                            }}>React suspense demo (after v16.6)</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" exact render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                    {this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null}
                    <Route path='/posts' component={Posts} />
                    <Route path='/suspense-demo' render={() => (
                        <Suspense fallback={<div>loading...</div>}>
                            <SuspenseDemo />
                        </Suspense>
                    )} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/* <Redirect from='/' to='/posts' /> */}
                    {/* <Route path='/' component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;