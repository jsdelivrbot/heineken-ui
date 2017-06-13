import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/resetPassword';
import { connect } from 'react-redux';

const renderInput = field =>
  <div className="input-group">
    <input type={field.type} placeholder={field.placeholder} {...field.input} />
  </div>

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.resetPassword(props);
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

                {/* Email */}
                <div className="input-group">
                  <Field name="email" type="text" placeholder="Enter your email" component={renderInput}  />
                </div>

                {/* Server error message */}
                <div>
                  { this.props.errorMessage && this.props.errorMessage.resetPassword &&
                      <div className="error-container">{ this.props.errorMessage.resetPassword }</div> }
                </div>

                {/* Submit button */}
                <input type="submit" value="Submit" className="btn btn-default Sign" />
              </form>
          </div>
          </section>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error };
}

ResetPassword = reduxForm({ form: 'resetpassword' })(ResetPassword);

export default connect(mapStateToProps, actions)(ResetPassword);
