import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/resetPassword';

class ResetPasswordVerify extends Component {
  constructor(props) {
    super(props);

    this.state = { resend: false };
  }

  componentWillMount() {
    this.email = this.props.location.query.email;

    if(!this.props.resetPasswordProgress || !this.email) {
      browserHistory.push('/reduxauth/signup');
    }
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resetPassword(props);
  }

  render() {
    return (
      <section className="intro">
        <div className="col-md-6 left hidden-xs hidden-sm">
        </div>
        <div className="col-md-6 col-sm-12 right">
          <img id="logo" src="../style/images/logo.png" alt="Heineken"></img>
          <div>
            <h1>Reset Password</h1>
            <h3>We've just emailed you password reset instructions at <u>{ this.email && this.email }</u></h3>
            {
              !this.state.resend ?
                <p className="resend" onClick={this.resendEmail.bind(this, { email: this.email })}>Resend instructions</p> :
                <p className="resended">Reset password instructions has been resent</p>
            }
            {
              this.props.errorMessage && this.props.errorMessage.resetPassword &&
                <div className="error-container">{ this.props.errorMessage.resetPassword }</div>
            }
          </div>
      </div>
      </section>

    )
  }
}

function mapStateToProps(state) {
  return { resetPasswordProgress: state.resetPass.resetPassword, errorMessage: state.resetPass.error };
}

export default connect(mapStateToProps, actions)(ResetPasswordVerify);
