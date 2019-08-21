// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import Navigation from '../components/Navigation';
import HubPreview from '../components/HubPreview';
import PhPreview from '../components/PhPreview';
import EcPreview from '../components/EcPreview';
import PumpsPreview from '../components/PumpsPreview';
import WaterPreview from '../components/WaterPreview';
import SettingsPreview from '../components/SettingsPreview';
import Settings from '../components/Settings';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      ipAddress: null,
      setupName: null
    };
    if (localStorage.getItem('ipAddress')) {
      this.state.ipAddress = localStorage.getItem('ipAddress');
    }
    if (localStorage.getItem('setupName')) {
      this.state.setupName = localStorage.getItem('setupName');
    }
  }

  componentDidMount() {
    const url = 'http://' + this.state.ipAddress + '/get-hub';
    console.log('info : calling url : ' + url);
    fetch(url)
      .then(response => response.json())
      .then(
        result => {
          console.log('fetch result data: ', result.data);
          localStorage.setItem('data', JSON.stringify(result.data));
          // console.log('local storage data : '+localStorage.getItem("data"));
          this.setState({
            isLoaded: true
          });
        },
        error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  reload() {
    setInterval(() => {
      window.location.reload();
    }, 30000); // milliseconds
  }

  render() {
    // this.reload();
    const { ipAddress, setupName, isLoaded, error } = this.state;
    return ipAddress == null ? (
      <Settings />
    ) : !isLoaded ? (
      <div className="container-fluid mh-100 h-100 p-0 bg-transparent">
        <div className="row no-gutters justify-content-center">
          <div className="col-12 align-self-center">
            <Navigation />
          </div>
          <div className="col-11 align-self-center">
            <div
              className="alert alert-info alert-dismissible fade show text-center"
              role="alert"
            >
              <h1>
                loading data <i className="fas fa-spinner fa-pulse" />
              </h1>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : error ? (
      <div className="container-fluid mh-100 h-100 p-0 bg-transparent">
        <div className="row no-gutters justify-content-center">
          <div className="col-12 align-self-center">
            <Navigation />
          </div>
          <div className="col-11 align-self-center">
            <div
              className="alert alert-danger alert-dismissible fade show text-center"
              role="alert"
            >
              <h1>
                <i className="fas fa-exclamation-circle" /> {error.message}{' '}
                <i className="fas fa-exclamation-circle" />
              </h1>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container-fluid p-0 mh-100 h-100">
        <div className="row no-gutters justify-content-center align-items-center mh-100 h-100">
          <div className="col-10 bg-transparent shadow">
            <div className="row no-gutters justify-content-center text-center">
              <div className="col-12 text-white px-5 pt-5">
                <h1 className="m-auto text-center text-success">
                  {setupName.toUpperCase()}
                </h1>
              </div>
              <div className="col w-100 text-white px-5 pt-5">
                <Link
                  className="text-decoration-none text-white"
                  to={routes.PH}
                >
                  <div className="bg-success text-reverse px-5 pt-5 rounded-top">
                    <PhPreview />
                  </div>
                </Link>
              </div>
              <div className="col w-100 text-white px-5 pt-5">
                <Link
                  className="text-decoration-none text-white"
                  to={routes.EC}
                >
                  <div className="bg-success text-white px-5 pt-5 rounded-top">
                    <EcPreview />
                  </div>
                </Link>
              </div>
              <div className="col w-100 text-white px-5 pt-5">
                <div className="bg-success text-reverse px-5 pt-5 rounded-top">
                  <WaterPreview />
                </div>
              </div>
            </div>
            <div className="row no-gutters justify-content-center text-center">
              <div className="col w-100 text-dark px-5 pt-5">
                <Link
                  className="text-decoration-none text-dark"
                  to={routes.PUMPS}
                >
                  <div className="bg-success text-white px-0 pt-5 pb-5 rounded-top">
                    <div className="m-0 p-0">
                      <h2 className="display-4">Pumps</h2>
                    </div>
                    <PumpsPreview />
                  </div>
                </Link>
              </div>
            </div>
            <div className="row no-gutters justify-content-center text-center">
              <div className="col w-100 text-white px-5 pt-5">
                <Link
                  className="text-decoration-none text-white"
                  to={routes.HUB}
                >
                  <div className="bg-success text-reverse px-0 pt-5 rounded-top">
                    <div className="m-0 p-0">
                      <h2 className="display-4 mb-3">Weather</h2>
                    </div>
                    <HubPreview />
                  </div>
                </Link>
              </div>
              <div className="col w-100 text-white px-5 pt-5">
                <div className="bg-success text-white px-5 pt-5 rounded-top">
                  <div className="m-0 p-0">
                    <h2 className="display-4">Settings</h2>
                  </div>
                  <SettingsPreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
