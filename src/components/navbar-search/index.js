import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from "react-router-dom";

export default class NavbarSearch extends React.Component {
  render() {
    let searchForm = '';
    if (this.props.isInline) {
      searchForm = <form className="form-inline my-2 m-auto d-none d-sm-flex">
        <input className="form-control" type="text" placeholder="Start typing to filter..." aria-label="Search"/>
      </form>;
    } else {
      searchForm = <form className="form-inline my-2 m-auto d-flex d-sm-none">
        <input className="form-control" type="text" placeholder="Start typing to filter..." aria-label="Search"/>
      </form>;
    }

    return searchForm;
  }
}

