import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

class SettingsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: null
    };
    if (localStorage.getItem('ipAddress')) {
      this.state.ipAddress = localStorage.getItem('ipAddress');
    }
  }

  render() {
    const { ipAddress } = this.state;
    const consolePath = "http://" + ipAddress + "/logs";
    const calibrationPath = "http://" + ipAddress + "/cal";
    return (
      <div className="row no-gutters pt-3 pb-5">
        <div className="col-12 text-center py-3">
          <Link
            className="text-decoration-none text-white"
            to={routes.SETTINGS}
          >
            <span className="m-auto p-3" title="settings">
              <i className="fas fa-network-wired fa-2x" />{' '}
              <span className="h2">{ipAddress}</span>
            </span>
          </Link>
        </div>
        <div className="col-12 text-center py-3">
          <a
            className="text-decoration-none text-white"
            href={calibrationPath}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="m-auto p-3" title="Go to calibration">
              <i className="fas fa-syringe fa-2x" />{' '}
              <span className="h2">Calibration</span>
            </span>
          </a>
        </div>
        <div className="col-12 text-center py-3">
          <a
            className="text-decoration-none text-white"
            href={consolePath}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="m-auto p-3" title="Go to hub console">
              <i className="fas fa-terminal fa-2x" />{' '}
              <span className="h2">Console</span>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default SettingsPreview;
