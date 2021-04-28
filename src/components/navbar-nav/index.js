import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import {connect} from "react-redux";
import { withRouter } from "react-router";

class NavbarNav extends React.Component {

  constructor(props) {
    super(props);

    const { location } = this.props;
    this.location = location;
  }

  render() {
    const navbarNavClasses = classNames('navbar-nav', 'nav-fill',
      'flex-grow-1', 'flex-lg-grow-0', 'ml-lg-auto', 'mr-lg-4');

    const genericClassesForItems = classNames('nav-item');

    const profileClasses = classNames(genericClassesForItems, {
      'active': this.location.pathname === '/profile'
    });

    const messagesClasses = classNames(genericClassesForItems, {
      'active': this.location.pathname === '/messages'
    });

    const favoritesClasses = classNames(genericClassesForItems, {
      'active': this.location.pathname === '/favorites'
    });

    const settingsClasses = classNames(genericClassesForItems, {
      'active': this.location.pathname === '/settings'
    });

    return (
      <ul className={navbarNavClasses}>
        <li className={profileClasses}>
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className={messagesClasses}>
          <Link className="nav-link" to="/messages">Messages  <span className="badge badge-pill badge-primary">25</span></Link>
        </li>
        <li className={favoritesClasses}>
          <Link className="nav-link" to="/favorites">Favorites</Link>
        </li>
        <li className={settingsClasses}>
          <Link className="nav-link" to="/settings">Settings</Link>
        </li>
      </ul>
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
)(withRouter(NavbarNav));

