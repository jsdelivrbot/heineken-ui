import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom' ;

const renderInput = (field) => {
    const {  type, input, meta: { error, touched } } = field;
    return (
        <div>
            <input {...input} type={type}
                className="form-control" />
                {touched && error && <div className="error">{error}</div>}
        </div>
    );
}

class Signup extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user
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
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                  placeholder="Confirm"
                 />
                 {this.renderAlert()}

              <input type="submit" value="Sign Up" className="btn btn-default Sign" />

      </div>
       </form>
       <div className="end">Already have an account?<Link to={'/login'}>Sign In</Link> </div>
        </div>
          </section>
        );
    }
}

function validate(formProps) {
    const errors = {};
    const { password, passwordConfirm, email } = formProps;

    if (!email) {
        errors.email = 'Please enter an email';
    }

    if (!password) {
        errors.password = 'Please enter a password';
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}


const form = reduxForm({ form: 'signup', fields:['email', 'password', 'passwordConfirm'], validate });
export default connect(mapStateToProps, actions)(form(Signup));
