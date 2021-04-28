import React from 'react';

// components
import SignInForm from "../sign-in-form";
import {connect} from "react-redux";
import {
  Redirect
} from "react-router-dom";

class SignInPage extends React.Component {

  render() {
    if (this.props.accessToken) {
      return (
        <Redirect to="/" />
      );
    } else {
      return (
        <SignInForm/>
      );
    }
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    accessToken: state.account.accessToken
  }
}

export default connect(
  mapStateToProps,
  null
)(SignInPage);

