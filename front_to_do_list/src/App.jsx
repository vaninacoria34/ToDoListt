import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes, { renderRoutes } from './routes';

const App = () => {
  return <BrowserRouter basename="/">{renderRoutes(routes)}</BrowserRouter>;
};

export default App;
