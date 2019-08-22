import React, { Component } from 'react';
import styles from './Home.css';

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sensors: {}
    };
    // if (localStorage.getItem('data')) {
    //   this.state.data = JSON.parse(localStorage.getItem('data'));
    //   this.state.sensors = this.state.data.hub.sensors;
    // }
  }

  componentWillMount(){
    if (localStorage.getItem('data')) {
      this.state.data = JSON.parse(localStorage.getItem('data'));
      this.state.sensors = this.state.data.hub.sensors;
    }
  }

  render() {
    const { sensors } = this.state;
    return (
      <ul className="list-unstyled">
        <li className="list-item alert alert-success">
          <i className="fas fa-thermometer-three-quarters fa-2x" />{' '}
          <span id="temperature" className="h2">
            {sensors !== null ? sensors.temperature : 0} °C
          </span>
        </li>
        <li className="list-item alert alert-info">
          <i className="fas fa-tint fa-2x" />{' '}
          <span id="humidity" className="h2">
            {sensors !== null ? sensors.humidity : 0} %
          </span>
        </li>
        <li className="list-item alert alert-warning">
          <i className="fas fa-cloud fa-2x" />{' '}
          <span id="pressure" className="h2">
            {sensors !== null ? sensors.pressure : 0} Pa
          </span>
        </li>
        <li className="list-item alert alert-secondary">
          <i className="fas fa-sun fa-2x" />{' '}
          <span id="light" className="h2">
            {sensors !== null ? sensors.light : 0} lx
          </span>
        </li>
        <li className="list-item alert alert-danger">
          <i className="fas fa-mountain fa-2x" />{' '}
          <span id="altitude" className="h2">
            {sensors !== null ? sensors.altitude : 0} m
          </span>
        </li>
      </ul>
    );
  }
}

export default Hub;
