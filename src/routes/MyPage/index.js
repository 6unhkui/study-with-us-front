import React from 'react';
import { Route } from "react-router-dom"

import EditAccountSetting from 'pages/EditAccountSetting';

export default (path) => [
    // <Route path={`${path}/setting`} component={EditAccountSetting} />
    <Route component={EditAccountSetting} />
]