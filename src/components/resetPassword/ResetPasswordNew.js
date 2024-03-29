import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/resetPassword';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class ResetPasswordNew extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    const { email, token } = this.props.location.query;

    this.props.verifyResetPassword({ email, token });
  }

  handleFormSubmit(props) {
    const { email, token } = this.props.location.query;

    props.email = email;
    props.token = token;

    this.props.resetPasswordNew(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section className="intro">
        <div className="col-md-6 left hidden-xs hidden-sm">
        </div>
        <div className="col-md-6 col-sm-12 right">
          <img id="logo" src="../style/images/logo.png" alt="Heineken"></img>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {/* New password */}
            <Field name="newpassword" component={renderField} type="password" placeholder="New password" />

            {/* Repeat new password */}
            <Field name="renewpassword" component={renderField} type="password" placeholder="Repeat New password" />

            {
              /* Server error message */
              this.props.errorMessage && this.props.errorMessage.verifyResetPassword &&
                <div className="error-container">{ this.props.errorMessage.verifyResetPassword.message }</div>
            }

            {/* Submit button */}
            <input type="submit" value="Submit" className="btn btn-default Sign" />
          </form>
      </div>
      </section>
    )
  }
}

function validate(props) {
  const errors = {};
  const fields = ['newpassword', 'renewpassword'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.newpassword && props.newpassword.length < 6) {
    errors.newpassword = "minimum 6 characters";
  }

  if(props.newpassword !== props.renewpassword) {
    errors.renewpassword = "passwords doesn't match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error };
}

ResetPasswordNew = reduxForm({ form: 'resetnewpassword', validate })(ResetPasswordNew);

export default connect(mapStateToProps, actions)(ResetPasswordNew);
