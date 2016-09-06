import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Article from './containers/Article'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="article/:id" component={Article}/>
    </Route>
)