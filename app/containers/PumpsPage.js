import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Pumps from '../components/Pumps';

class PumpsPage extends Component {
  render() {
    return (
      <div className="container-fluid p-0 mh-100 h-100">
        <div className="row no-gutters justify-content-center bg-light text-white">
          <div className="col d-flex align-items-center">
            <div className="mx-auto">
              <Pumps />
              <Link className="btn btn-secondary" to={routes.HOME}>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PumpsPage;
