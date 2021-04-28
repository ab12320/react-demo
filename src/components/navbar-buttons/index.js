import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
import classNames from 'classnames';
import {connect} from "react-redux";
import axios from 'axios';
import {bindActionCreators} from "redux";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {signOut} from "../../features/account/accountSlice";

class NavbarButtons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null, // validation errors обрабатываем в компонентах
    }
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignOutClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.showSpinner({text: 'Signing out...'});

    // пока API нет
    this.props.signOut();
    this.props.hideSpinner();

    // TODO: когда будет API отправляем запрос
    // axios.delete('/api/tokens', {
    //     accessToken: this.props.accessToken,
    //   })
    //   .then(
    //     (response) => {
    //       if (response.status === 200) {
    //         this.props.signOut();
    //       }
    //     },
    //     // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    //     // чтобы не перехватывать исключения из ошибок в самих компонентах.
    //     (error) => {
    //       this.setState((state, props) => ({
    //         errors: error.response.data.errors
    //       }));
    //     })
    //   .finally(() => {
    //     this.props.hideSpinner();
    //   });
  }

  render() {
    // const { location } = this.props;
    const baseClasses = ['btn', 'text-nowrap'];

    if (this.props.accessToken) {
      const signOutClasses = classNames(baseClasses, 'btn-outline-secondary', 'float-md-none', 'float-right', 'mr-n1', 'mr-md-0');

      return (
        <a className={signOutClasses} href='#' onClick={this.handleSignOutClick}>Sign Out</a>
      );
    } else {
      const signInClasses = classNames(baseClasses, 'btn-outline-primary', 'mr-2');
      const signUpClasses = classNames(baseClasses, 'btn-primary');

      return (
        <div className="d-inline-block float-right float-sm-none ml-auto mr-n1 mr-sm-0">
          <Link className={signInClasses} to="/sign-in">Sign In</Link>
          <Link className={signUpClasses} to="/sign-up">Sign Up</Link>
        </div>
      )
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
  mapStateToProps,
  mapDispatchToProps
)(NavbarButtons);

// export default withRouter(NavbarButtons);
// export default NavbarButtons;

