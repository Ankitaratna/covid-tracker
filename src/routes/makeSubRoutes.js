import React from 'react';
import { Route } from 'react-router-dom';

export const MakeRouteWithSubRoutes = (route) => {
  return <Route path={route.path} component={route.component} />;
};
