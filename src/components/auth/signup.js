import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import * as actions from '../../actions/auth';


const renderInput = (field) => {
    const {  type, input, meta: { error, touched }, placeholder} = field;
    return (
        <div>
            <input {...input} type={type}
                className="form-control"
                placeholder={placeholder}
              />
                {touched && error && <div className="error">{error}</div>}
        </div>
    );
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
          <section className="intro">
            <div className="col-md-6 left  hidden-xs hidden-sm">
            </div>
            <div className="col-md-6 col-sm-12 right">
              <img id="logo" src="./style/images/logo.png" alt="Heineken"></img>
              <div className="GetAccount">
                <h2>Get your own account.</h2>
                <h3>Sign Up. There's more behind the Star.</h3>
              </div>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="Names">
         <Field name="firstname" component={renderInput} type="text" placeholder="First name" />
         <Field name="lastname" component={renderInput} type="text" placeholder="Last name" />
                </div>
              <div className="signup">
                <Field name="email"
                    type="email"
                    component={renderInput}
                    placeholder="Email"
                   />
              <div id="role">Which role fits you best?</div>
              <div className="buttons">
                <button className="but">Developer</button>
                <button className="but">Lead</button>
                <button className="but">Manager</button>
              </div>
              <Field name="password"
                  type="password"
                  component={renderInput}
                  placeholder="Password"
                />
              <Field name="passwordConfirm"
                  type="password"
                  component={renderInput}
                  placeholder="Confirm Password"
                 />
                 {/* Server error message */}
                <div>
                    { this.props.errorMessage && this.props.errorMessage.signup &&
                       <div className="error-container">Oops! { this.props.errorMessage.signup }</div> }
                </div>
              <input type="submit" value="Sign Up" className="btn btn-default Sign" />

      </div>
       </form>
       <div className="end">Already have an account?<Link to={'/signin'}>Sign In</Link> </div>
        </div>
          </section>
        );
    }
}


const validate = props => {
  const errors = {};
  const fields = ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.firstname && props.firstname.length < 3) {
    errors.firstname = "minimum of 4 characters";
  }

  if(props.firstname && props.firstname.length > 20) {
    errors.firstname = "maximum of 20 characters";
  }

  if(props.lastname && props.lastname.length < 3) {
    errors.lastname = "minimum of 4 characters";
  }

  if(props.lastname && props.lastname.length > 20) {
    errors.lastname = "maximum of 20 characters";
  }

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "please provide valid email";
  }

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.password !== props.passwordConfirm) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
};


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}


const form = reduxForm({ form: 'signup', validate });
export default connect(mapStateToProps, actions)(form(Signup));
