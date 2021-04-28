import React from 'react';

// components
import SignUpForm from "../sign-up-form";
import UserAgreementModal from '../user-agreement-modal';

export default class SignUpPage extends React.Component {

  render() {
    return (
      <>
        <SignUpForm/>
        <UserAgreementModal/>
      </>
    );
  }
}
