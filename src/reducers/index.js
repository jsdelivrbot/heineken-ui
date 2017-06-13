import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import resetPasswordReducer from './resetPasswordReducer';


const rootReducer = combineReducers({
  form,
  auth: authReducer,
  resetPass: resetPasswordReducer
});

export default rootReducer;
