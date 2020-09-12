import React from 'react';
import { Route } from "react-router-dom"

import PostsPage from 'pages/PostsPage';
import EditRoomPage from 'pages/EditRoomPage';

export default (path) => [
    <Route path={`${path}/posts`} component={PostsPage} />,
    <Route path={`${path}/edit`} component={EditRoomPage} />
]