/*
 * Tupaia
 *  Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../api';
import { ROUTES } from '../constants';

// Reusable wrapper to handle redirecting to login if user is not logged in and the route is private
export const PrivateRoute = ({ children }: { children?: ReactNode }): any => {
  const { isLoggedIn, ...user } = useCurrentUser();
  const location = useLocation();
  if (!isLoggedIn)
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      />
    );

  const PROJECT_SELECT_URLS = [ROUTES.PROJECT_SELECT, ROUTES.REQUEST_ACCESS];
  // If the user is logged in and has a project, but is attempting to go to the project select page, redirect to the home page
  if (user.projectId && PROJECT_SELECT_URLS.includes(location.pathname))
    return <Navigate to={ROUTES.HOME} replace={true} />;

  // If the user is logged in and does not have a project and is not already on the project select page, redirect to the project select page
  if (!user.projectId && !PROJECT_SELECT_URLS.includes(location.pathname))
    return (
      <Navigate
        to={ROUTES.PROJECT_SELECT}
        replace={true}
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      />
    );
  return children ? children : <Outlet />;
};
