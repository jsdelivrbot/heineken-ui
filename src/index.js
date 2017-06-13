import React from 'react';
import { Route, IndexRoute,Router, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types/index';
import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerifyEmail';
import SignupVerify from './components/auth/SignupVerify';
import requireAuth from './components/auth/RequireAuth';
import requireNotAuth from './components/auth/RequireNotAuth';
import dashboard from './components/dashboard' ;
import reducers from './reducers';
import ResetPassword from './components/resetPassword/ResetPassword';
import ResetPasswordVerify from './components/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './components/resetPassword/ResetPasswordNew';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in
if (token) {
  // We need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route path="/verify-email" component={(VerifyEmail)} />
        <Route path="/dashboard" component={requireAuth(dashboard)} />
        <Route path="/" component={Signin} />
        <Route path="/signin" component={(Signin)} />
        <Route path="/signup" component={(Signup)} />
        <Route path="/signup/verify-email" component={(SignupVerify)} />
        <Route path="/reset-password" component={(ResetPassword)} />
        <Route path="/reset-password/verify" component={ResetPasswordVerify} />
        <Route path="/reset-password/new" component={(ResetPasswordNew)} />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.main'));
