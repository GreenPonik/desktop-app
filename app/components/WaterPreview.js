import React, { Component } from 'react';

class WaterPreview extends Component {
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
          Water{' '}
          <span className="display-5">
            {data.slaves_modules.water_sensor.water !== undefined
              ? Number(
                  data.slaves_modules.water_sensor.water.temperature
                ).toFixed(2)
              : ''}
          </span>
        </h2>
        <span className="h4">
          <br />
        </span>
      </div>
    );
  }
}

export default WaterPreview;
