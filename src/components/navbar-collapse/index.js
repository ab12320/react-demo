import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import NavbarSearch from '../navbar-search';
import NavbarCollapseButton from '../navbar-collapse-button';
import NavbarButtons from '../navbar-buttons';
import NavbarNav from '../navbar-nav';
import classNames from 'classnames';
import {connect} from "react-redux";

class NavbarCollapse extends React.Component {
  render() {
    const navbarCollapseClasses = classNames('navbar-collapse',
      'collapse', 'px-1',
      'pb-1', 'pt-1', {
        'px-sm-0': !this.props.accessToken,
        'pb-sm-0': !this.props.accessToken,
        'pt-sm-0': !this.props.accessToken,
        'px-md-0': this.props.accessToken,
        'pb-md-0': this.props.accessToken,
        'pt-md-0': this.props.accessToken,
      });

    return (
      <>
        <NavbarCollapseButton />
        <div className={navbarCollapseClasses} id="alphaNavbar">
          {this.props.accessToken && <NavbarNav />}
          <NavbarButtons />
        </div>
      </>
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
)(NavbarCollapse);

