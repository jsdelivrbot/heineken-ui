import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
    import {
      BrowserRouter as Router,
      Route,
      Link,
      Switch,
    } from 'react-router-dom' ;
import { AUTH_USER } from './actions/types';
import Signin from './components/auth/signin' ;
import reduxThunk from 'redux-thunk' ;
import Signup from './components/auth/signup' ;
import App from './components/app';
import dashboard from './components/dashboard' ;
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
/*
const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in
if (token) {
  // We need to update application state
  store.dispatch({ type: AUTH_USER });
}
*/
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/dashboard" component={RequireAuth(dashboard)} />
        <Route path="/" component={Signin} />
      </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.main'));
