import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Ec from '../components/Ec';

class EcPage extends Component {
  render() {
    return (
      <div className="container-fluid p-0 mh-100 h-100">
        <div className="row no-gutters justify-content-center bg-warning text-white h-100">
          <div className="col d-flex align-items-center">
            <div className="mx-auto">
              <Ec />
              <Link className="btn btn-info" to={routes.HOME}>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EcPage;
