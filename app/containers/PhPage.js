import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Ph from '../components/Ph';

class PhPage extends Component {
  render() {
    return (
      <div className="container-fluid p-0 mh-100 h-100">
        <div className="row no-gutters justify-content-center bg-info text-white h-100">
          <div className="col d-flex align-items-center">
            <div className="mx-auto">
              <Ph />
              <Link className="btn btn-warning text-white" to={routes.HOME}>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhPage;
