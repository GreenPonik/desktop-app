import React, { Component } from "react";
import styles from './Home.css';

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    if (localStorage.getItem("data")) {
      this.state.data = JSON.parse(localStorage.getItem("data"));
    }
  }

  render() {
    const { data } = this.state;
    return (
      <ul className="list-unstyled">
        <li className="list-item alert alert-success">
          <i className="fas fa-thermometer-three-quarters fa-2x" />{" "}
          <span className="h2">{data.hub.sensors.temperature} °C</span>
        </li>
        <li className="list-item alert alert-info">
          <i className="fas fa-tint fa-2x" />{" "}
          <span className="h2">{data.hub.sensors.humidity} %</span>
        </li>
        <li className="list-item alert alert-warning">
          <i className="fas fa-cloud fa-2x" />{" "}
          <span className="h2">{data.hub.sensors.pressure} Pa</span>
        </li>
        <li className="list-item alert alert-secondary">
          <i className="fas fa-sun fa-2x" />{" "}
          <span className="h2">{data.hub.sensors.light} lx</span>
        </li>
        <li className="list-item alert alert-danger">
          <i className="fas fa-mountain fa-2x" />{" "}
          <span className="h2">{data.hub.sensors.altitude} m</span>
        </li>
      </ul>
    );
  }
}

export default Hub;
