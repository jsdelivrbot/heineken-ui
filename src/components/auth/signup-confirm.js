import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import * as actions from '../../actions/auth';


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

class SignupSuccess extends Component {

    render() {
        return (
          <section className="intro">
          <div className="col-md-6 left  hidden-xs hidden-sm">
          </div>
          <div className="col-md-6 col-sm-12 right">
            <img id="logo" src="./style/images/logo.png" alt="Heineken"></img>
            <img id="success" src="./style/images/success.png" alt="Success"></img>
          </div>
          <div className="success">
            <h2>Great! Congragulations on signing up.</h2>
            <h2>You can proceed to <Link to={'/signin'}>Sign In </Link></h2>
          </div>
        </section>
        );
    }
}

export default SignupSuccess ;
