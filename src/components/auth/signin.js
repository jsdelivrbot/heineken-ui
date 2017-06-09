import React,{ Component } from 'react' ;
import { reduxForm, Field } from 'redux-form' ;
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom' ;
import * as actions  from '../../actions' ;
import { connect } from 'react-redux';


const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}


class Signin extends Component{
  handleFormSubmit({ email, password }){
    console.log(email,password) ;
    //Need to log user in
    this.props.signinUser({ email, password }) ;
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
  const { handleSubmit, fields: {email, password }} = this.props ;
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
         <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                      {this.renderAlert()}
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
 form: 'signin',
  fields: [ 'email', 'password' ]
})(Signin);
export default connect(mapStateToProps, actions)(Signin);
