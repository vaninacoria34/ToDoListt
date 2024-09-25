import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/',
    element: lazy(() => import('./views/extra/index'))
  },
  {
    exact: 'true',
    path: '/auth/signin',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/home',
        element: lazy(() => import('./views/extra/home'))
      },
      {
        exact: 'true',
        path: '/profile',
        element: lazy(() => import('./views/profile/Profile'))
      },
      {
        exact: 'true',
        path: '/tarea/add',
        element: lazy(() => import('./views/tarea/AddTarea'))
      },
      {
        exact: 'true',
        path: '/tarea/edit/:id',
        element: lazy(() => import('./views/tarea/EditTarea'))
      },{
        exact: 'true',
        path: '/tarea/listado',
        element: lazy(() => import('./views/tarea/ListadoTareas'))
      },
      {
        exact: 'true',
        path: '/categoria/add',
        element: lazy(() => import('./views/categoria/AddCategoria'))
      },
      {
        exact: 'true',
        path: '/categoria/edit/:id',
        element: lazy(() => import('./views/categoria/EditCategoria'))
      },
      {
        exact: 'true',
        path: '/categoria/listado',
        element: lazy(() => import('./views/categoria/ListadoCategorias'))
      },
      {
        exact: 'true',
        path: '/estado/add',
        element: lazy(() => import('./views/estado/AddEstado'))
      },
      {
        exact: 'true',
        path: '/estado/edit/:id',
        element: lazy(() => import('./views/estado/EditEstado'))
      },
      {
        exact: 'true',
        path: '/estado/listado',
        element: lazy(() => import('./views/estado/ListadoEstados'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
