import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {connect} from "react-redux";

class NavbarCollapseButton extends React.Component {
  render() {
    const navbarCollapseButtonClassName = classNames(
      'collapsed', 'btn', 'btn-outline-info', 'd-inline-block',
      'ml-auto', {
        'd-md-none': this.props.accessToken,
        'd-sm-none': !this.props.accessToken,
      });

    return (
      <button className={navbarCollapseButtonClassName} type="button" data-toggle="collapse"
              data-target="#alphaNavbar" aria-controls="alphaNavbar" aria-expanded="false"
              aria-label="Toggle navigation">
        Menu
      </button>
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
)(NavbarCollapseButton);
