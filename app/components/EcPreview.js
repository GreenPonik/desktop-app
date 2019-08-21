import React, { Component } from 'react';

class EcPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    if (localStorage.getItem('data')) {
      this.state.data = JSON.parse(localStorage.getItem('data'));
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div className="m-0 pb-5">
        <h2 className="display-4 m-0">
          EC{' '}
          <span className="display-5">
            {data.slaves_modules.water_sensor.ec !== undefined
              ? Number(data.slaves_modules.water_sensor.ec.value).toFixed(2)
              : ''}
          </span>
        </h2>
        <span className="h4">
          setPoint{' '}
          {data.slaves_modules.water_sensor.ec !== undefined
            ? Number(data.slaves_modules.water_sensor.ec.set_point).toFixed(2)
            : ''}
        </span>
      </div>
    );
  }
}

export default EcPreview;
