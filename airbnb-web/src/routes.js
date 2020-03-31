import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import App from './pages/App';
import AddProperty from './pages/AddProperty';
import Property from './pages/Property';

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated() ? (
        children
      ) : (
        <Redirect to={{ pathname: '/', state: { from: location } }} />
      )
    }
  />
);

const Routes = () => {
  const location = useLocation();

  const addProperty = location.state && location.state.modal === 'ADD_PROPERTY';
  const property = location.state && location.state.modal === 'PROPERTY';

  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="/app">
          <App />
        </PrivateRoute>
      </Switch>

      {addProperty && (
        <Route path="/app/properties/add">
          <AddProperty />
        </Route>
      )}

      {property && (
        <Route path="/app/property/:id">
          <Property />
        </Route>
      )}
    </Fragment>
  );
};

const Router = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default Router;
