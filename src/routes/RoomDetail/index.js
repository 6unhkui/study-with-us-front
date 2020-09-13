import React from 'react';
import { Route } from "react-router-dom"

import PostsPage from 'pages/PostsPage';
import MembersPage from 'pages/MemebersPage';

export default (path) => [
    <Route path={`${path}/posts`} component={PostsPage}/>,
    <Route path={`${path}/members`} component={MembersPage}/>
]