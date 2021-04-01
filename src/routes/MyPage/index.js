import React, { lazy } from "react";
import { Route } from "react-router-dom";

const EditAccountSetting = lazy(() => import("pages/EditAccountSetting"));

export default () => [<Route component={EditAccountSetting} />];
