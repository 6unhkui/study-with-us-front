import React from 'react';
import { Route } from "react-router-dom"

import EditAccountSettingsPage from 'pages/EditAccountSettingsPage';

export default (path) => [
    <Route path={`${path}/account`} component={EditAccountSettingsPage} />
]