// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Hub from '../components/Hub';

class HubPage extends Component {
  render() {
    return (
      <div id="hub-page" className="container-fluid p-0 mh-100 h-100">
        <div className="row no-gutters justify-content-center bg-primary text-white h-100">
          <div className="col d-flex align-items-center">
            <div className="mx-auto">
              <h2>Weather</h2>
              <Hub />
              <Link className="btn btn-success" to={routes.HOME}>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HubPage;
