import React from 'react';
import { Route } from "react-router-dom"

import EditAccountSettings from 'pages/EditAccountSettings';

export default (path) => [
    <Route path={`${path}/setting`} component={EditAccountSettings} />
]