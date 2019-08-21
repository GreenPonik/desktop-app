import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

class Navigation extends Component {
render() {
    return (
    <nav className="nav justify-content-center border-bottom sticky-top bg-light">
      <Link
        className="nav-link text-decoration-none text-dark"
        to={routes.HOME}
      >
        Home
      </Link>
      <Link
        className="nav-link text-decoration-none text-dark"
        to={routes.SETTINGS}
      >
        Settings
      </Link>
    </nav>
  )}
    }

  export default Navigation;