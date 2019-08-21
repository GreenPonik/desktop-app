import React, { Component } from 'react';

class Ph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ipAddress: null
    };
    if (localStorage.getItem('ipAddress')) {
      this.state.ipAddress = localStorage.getItem('ipAddress');
    }
    if (localStorage.getItem('data')) {
      this.state.data = JSON.parse(localStorage.getItem('data'));
    }
  }

  handleToggleReg(e) {
    e.preventDefault();
    let water_sensor = Object.assign(
      {},
      this.state.data.slaves_modules.water_sensor
    );
    water_sensor.ph.regulation_state = !e.target.value;
    this.setState({ water_sensor });
    alert(
      'regulation state will send : ' + JSON.stringify(water_sensor, null, 2)
    );
  }

  handleToggleCal(e) {
    e.preventDefault();
    let water_sensor = Object.assign(
      {},
      this.state.data.slaves_modules.water_sensor
    );
    console.log('uncomment line above to permit calibration launch');
    // water_sensor.ph.calib_launch = !e.target.value;
    this.setState({ water_sensor });
    alert(
      'calibration state will send : ' + JSON.stringify(water_sensor, null, 2)
    );
  }

  handleChange(e) {
    let sp;
    if (!e) {
      sp = document.getElementById('_setPoint').value;
    } else {
      e.preventDefault();
      sp = e.target.value;
    }
    let water_sensor = Object.assign(
      {},
      this.state.data.slaves_modules.water_sensor
    );
    water_sensor.ph.set_point = sp;
    this.setState({ water_sensor });
  }

  handleChangePumpsDuration(e) {
    let d;
    if (!e) {
      d = document.getElementById('_maxDuration').value;
    } else {
      e.preventDefault();
      d = e.target.value;
    }
    let water_sensor = Object.assign(
      {},
      this.state.data.slaves_modules.water_sensor
    );
    water_sensor.ph.max_pumps_durations = d;
    this.setState({ water_sensor });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*
    {
        "water_sensor": {
            "unique_id": "water-sensor-84d",
            "ec": {
                "calib_launch": 0,
                "sensor_k_origin": 1.2,
                "sensor_k_calibration": 1.3,
                "calibration_solution": 1.2,
                "regulation_state":1,
                "set_point":1.0,
                "max_pumps_durations": 5000
            },
            "ph": {
                "calib_launch": 0,
                "regulation_state":1,
                "set_point":7.0,
                "max_pumps_durations": 5000
            },
            "water": {
                "pump_enable": false
            }
        }
    }
    */
    let water_sensor = Object.assign(
      {},
      this.state.data.slaves_modules.water_sensor
    );
    water_sensor.ph.set_point = this.state.data.slaves_modules.water_sensor.ph.set_point;
    water_sensor.ph.max_pumps_durations = this.state.data.slaves_modules.water_sensor.ph.max_pumps_durations;
    this.setState({ water_sensor });
    console.log('data will send : ' + JSON.stringify({ water_sensor }));
    const url = 'http://' + this.state.ipAddress + '/set-water-sensor';
    console.info('info : sending to : ' + url);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ water_sensor })
    }).then(response => {
      console.log(response.status);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <ul className="list-unstyled">
        <li className="list-item alert alert-dark">
          <ul className="list-inline">
            <li
              className={
                data.slaves_modules.water_sensor.ph.regulation_state === 1
                  ? 'list-inline-item text-success'
                  : 'list-inline-item text-danger'
              }
              title="Regulation status"
            >
              <span className="" onClick={event => this.handleToggleReg(event)}>
                <i className="fas fa-poll fa-2x" />{' '}
                {data.slaves_modules.water_sensor.ph.regulation_state === 1
                  ? 'Runnig'
                  : 'Stopped'}
              </span>
            </li>
            <li
              className={
                data.slaves_modules.water_sensor.ph.calib_launch === 1
                  ? 'list-inline-item text-success'
                  : 'list-inline-item text-danger'
              }
              title="Calibration status"
            >
              <span className="" onClick={event => this.handleToggleCal(event)}>
                <i className="fas fa-syringe fa-2x" />{' '}
                {data.slaves_modules.water_sensor.ph.calib_launch === 1
                  ? 'Running'
                  : 'Stopped'}
              </span>
            </li>
          </ul>
        </li>
        <li className="list-item alert alert-success">
          <span className="h2">pH </span>{' '}
          <i className="fas fa-ruler-horizontal fa-rotate-90 fa-2x" />{' '}
          <span className="h2">
            {Number(data.slaves_modules.water_sensor.ph.value).toFixed(2)}
          </span>
        </li>
        <li>
          <form className="form">
            <li className="list-item alert alert-info">
              <label className="text-center">SetPoint</label>
              <div className="input-group">
                <div className="input-group-prepend row no-gutters">
                  <label className="input-group-text text-secondary text-center px-3 px-md-1 col-12 col-md-2">
                    <i className="fas fa-bullseye" />{' '}
                    {Number(
                      data.slaves_modules.water_sensor.ph.set_point
                    ).toFixed(2)}
                  </label>
                  <input
                    className="custom-range mt-2 px-1 text-center col-12 col-md-6 mx-auto"
                    type="range"
                    min="0.0"
                    max="14.0"
                    step="0.1"
                    name="_setPoint"
                    id="_setPoint"
                    value={data.slaves_modules.water_sensor.ph.set_point}
                    onChange={event => this.handleChange(event)}
                  />
                  <div className="col-12 col-md-4 text-center">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        document.getElementById('_setPoint').stepDown(1);
                        this.handleChange();
                      }}
                    >
                      <i className="fas fa-minus" />
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        document.getElementById('_setPoint').stepUp(1);
                        this.handleChange();
                      }}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-item alert alert-warning">
              <label className="text-center">Max pumps duration</label>
              <div className="input-group">
                <div className="input-group-prepend row no-gutters">
                  <label className="input-group-text text-secondary text-center px-3 px-md-0 col-12 col-md-2">
                    <i className="fas fa-bullseye" />{' '}
                    {Number(
                      data.slaves_modules.water_sensor.ph.max_pumps_durations
                    ).toFixed(0)}
                  </label>
                  <input
                    className="custom-range mt-2 px-1 text-center col-12 col-md-6 mx-auto"
                    type="range"
                    min="0"
                    max="60000"
                    step="100"
                    name="_maxDuration"
                    id="_maxDuration"
                    value={
                      data.slaves_modules.water_sensor.ph.max_pumps_durations
                    }
                    onChange={event => this.handleChangePumpsDuration(event)}
                  />
                  <div className="col-12 col-md-4 text-center">
                    <button
                      type="button"
                      className="btn btn-warning text-white"
                      onClick={() => {
                        document.getElementById('_maxDuration').stepDown(1);
                        this.handleChangePumpsDuration();
                      }}
                    >
                      <i className="fas fa-minus" />
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-warning text-white"
                      onClick={() => {
                        document.getElementById('_maxDuration').stepUp(1);
                        this.handleChangePumpsDuration();
                      }}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <button
              className="btn btn-warning text-white form-control mt-3"
              type="submit"
              onClick={event => this.handleSubmit(event)}
            >
              Send it to hub
            </button>
          </form>
        </li>
      </ul>
    );
  }
}

export default Ph;
