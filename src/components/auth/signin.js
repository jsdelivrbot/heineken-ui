import React,{ Component } from 'react' ;
import { reduxForm, Field } from 'redux-form' ;
import * as actions  from '../../actions/auth' ;
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';



const renderInput = field => {
    const { input, type , placeholder } = field;
    return (
        <div>
            <input {...input} type={type} placeholder={placeholder} className="form-control" />
        </div>
    );
}


class Signin extends Component{
  constructor(props) {
   super(props);
   this.handleFormSubmit = this.handleFormSubmit.bind(this);
 }

  handleFormSubmit(props){
    this.props.signinUser(props);
  }

  renderAlert() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{errorMessage}
                </div>
            );
        }
    }

  render()
  {
  const { handleSubmit } = this.props ;
  return (
    <section className="intro">
     <div className="col-md-6 left  hidden-xs hidden-sm">
     </div>
     <div className="col-md-6 col-sm-12 right">
       <img id="logo" src="./style/images/logo.png" alt="Heineken"></img>
       <div className="greeting">
         <h2>Good Morning! Welcome Back.</h2>
         <h3>Sign In.</h3>
       </div>
       <div className="login">
         <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="inputs">
                      <Field name="email"
                             type="email"
                             component={renderInput}
                             placeholder="IBM"
                             className="form-control"
                         />
                      <Field name="password"
                          type="password" component={renderInput}
                          placeholder="password"
                          className="form-control"
                        />
                        <div className="forgot"><Link to="/reset-password">Forgot Password?</Link>
                        </div>
                        {/* Server error message */}
                      { this.props.errorMessage && this.props.errorMessage.signin &&
                          <div className="error-container signin-error">Oops! { this.props.errorMessage.signin }</div> }
                        <input type="submit" name="login" value="Sign in" className="btn btn-default Sign" />
                </div>
              </form>
       </div>
    <div className="end">New User?<Link to={'/signup'}>Sign Up</Link> </div>
     </div>
   </section>
  );
}
}




function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
     };
}


Signin = connect(mapStateToProps, actions)(Signin);
Signin = reduxForm({
 form: 'signin'
})(Signin);
export default connect(mapStateToProps, actions)(Signin);
