import React from 'react';
import ReactDOM from 'react-dom';
import NavbarBrand from '../navbar-brand';
import NavbarSearch from '../navbar-search';
import NavbarCollapse from '../navbar-collapse';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import {showAlert} from "../../features/alert/alertSlice";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {connect} from "react-redux";

class Navbar extends React.Component {
  render() {
    const navbarClassName = classNames(
      'navbar',
      'navbar-light',
      'bg-white',
      'fixed-top',
      'shadow-sm', {
      'navbar-expand-md': this.props.accessToken,
      'navbar-expand-sm': !this.props.accessToken,
    });

    return (
      <nav className={navbarClassName}>
        <NavbarBrand />
        <NavbarCollapse />
      </nav>
    );
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
)(Navbar);

