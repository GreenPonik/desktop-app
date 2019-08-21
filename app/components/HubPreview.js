import React, { Component } from "react";
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

class HubPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {}
    };
    if (localStorage.getItem("data")) {
      this.state.data = JSON.parse(localStorage.getItem("data"));
    }
  }

  render() {
    const { data } = this.state;
    return data !== undefined || data !== null ? (
      <div className="row no-gutters justify-content-center pb-5">
        <div className="col-6 py-3">
          <span className="mx-auto p-3">
            <i className="fas fa-thermometer-three-quarters fa-2x" />{" "}
            <span className="h2">{data.hub.sensors.temperature} °C</span>
          </span>
        </div>
        <div className="col-6 py-3">
          <span className="mx-auto p-3">
            <i className="fas fa-tint fa-2x" />{" "}
            <span className="h2">{data.hub.sensors.humidity} %</span>
          </span>
        </div>
        <div className="w-100" />
        <div className="col-6 py-3">
          <span className="mx-auto p-3">
            <i className="fas fa-cloud fa-2x" />{" "}
            <span className="h2">{data.hub.sensors.pressure} Pa</span>
          </span>
        </div>
        <div className="col-6 py-3">
          <span className="mx-auto p-3">
            <i className="fas fa-sun fa-2x" />{" "}
            <span className="h2">{data.hub.sensors.light} lx</span>
          </span>
        </div>
        <div className="col-12 py-2">
          <span className="mx-auto p-3">
            <i className="fas fa-mountain fa-2x" />{" "}
            <span className="h2">{Number(data.hub.sensors.altitude).toFixed(2)} m</span>
          </span>
        </div>
      </div>
    ) : (
      <div>something wrong</div>
    );
  }
}

export default HubPreview; 