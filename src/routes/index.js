import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MakeRouteWithSubRoutes } from './makeSubRoutes';
import { routes } from './routes';

const Routes = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        {routes.map((route, index) => (
          <MakeRouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};
export default Routes;
