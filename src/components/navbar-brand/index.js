import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

export default class NavbarBrand extends React.Component {
  render() {
    return (
      <>
        <Link className="navbar-brand mr-1" to="/">
          Brand
        </Link>
      </>
    );
  }
}

