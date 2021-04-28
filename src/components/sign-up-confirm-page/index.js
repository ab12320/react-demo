import React from 'react';
import axios from 'axios';
import config from '../../config/default.json';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux';
import { showAlert } from "../../features/alert/alertSlice";
import { showSpinner, hideSpinner } from "../../features/spinner/spinnerSlice";
import {connect} from "react-redux";

class SignUpConfirmPage extends React.Component {

  constructor(props) {
    super(props);

    const { match } = this.props;
    this.state = {
      token: match.params.token,
      errors: null,
      verified: false,
    }
  }

  render() {
      return null;
  };

  componentDidMount() {
    if (this.state.token) {
      this.props.showSpinner({text: 'Loading...'});
      axios.patch('/api/users', {
          verificationToken: this.state.token
        })
        .then(
          (response) => {
            if (response.status === 200) {
              this.props.showAlert({type: 'success', title: config.signUpConfirm.alert.title, text: config.signUpConfirm.alert.text});
            }
          },
          (error) => {
            this.setState((state, props) => ({
              errors: error.response.data.errors
            }));
          })
        .finally(() => {
          this.props.hideSpinner();
        });
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert, showSpinner, hideSpinner }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignUpConfirmPage));
