import React, { lazy } from 'react';

const India = lazy(() => import('../pages/India'));
const State = lazy(() => import('../pages/State'));

export const routes = [
  {
    path: '/',
    component: India,
    exact: true,
  },
  {
    path: '/state/:stateId',
    component: State,
    exact: true,
  },
];
