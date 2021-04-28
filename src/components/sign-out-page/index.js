import React from 'react';
import {bindActionCreators} from "redux";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {signOut} from "../../features/account/accountSlice";
import {connect} from "react-redux";
import axios from 'axios';
import {
  Redirect
} from "react-router-dom";

class SignOutPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null, // validation errors обрабатываем в компонентах
    }
  }

  render() {
    if (this.props.accessToken) {
      return null;
    } else {
      return (
        <Redirect to="/" />
      );
    }
  }

  componentDidMount() {
    // TODO: show spinner in interceptors before request sent
    if (this.props.accessToken) {

    }
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    accessToken: state.account.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOut, showSpinner, hideSpinner }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(SignOutPage);
