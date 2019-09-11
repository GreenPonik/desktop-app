import React, { Component } from 'react';

class Ec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ec: {},
      ipAddress: null
    };
    if (localStorage.getItem('ipAddress')) {
      this.state.ipAddress = localStorage.getItem('ipAddress');
    }
    if (localStorage.getItem('data')) {
      this.state.data = JSON.parse(localStorage.getItem('data'));
      this.state.ec = this.state.data.slaves_modules.water_sensor.ec;
    }
  }

  componentDidMount() {
    if (localStorage.getItem('ipAddress')) {
      this.setState({
        ipAddress: localStorage.getItem('ipAddress')
      });
    }
    if (localStorage.getItem('data')) {
      this.setState({
        data: JSON.parse(localStorage.getItem('data')),
        ec: this.state.data.slaves_modules.water_sensor.ec
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleToggleReg(e) {
    e.preventDefault();
    console.debug('dataset value: ', e.target.dataset.value);
    let toggle = !e.target.dataset.value;
    console.debug(`regulation ec will be toggled to: ${toggle}`);
    // eslint-disable-next-line react/destructuring-assignment
    this.state.ec.regulation_state = toggle;
    // eslint-disable-next-line react/destructuring-assignment
    const url = `http://${this.state.ipAddress}/set-water-sensor?toggleRegulation=ec`;
    console.info(`info : sending to : ${url}`);
    fetch(url, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(result => console.debug(result))
      .catch(error => console.debug(error));
  }

  handleLaunchCal(e) {
    e.preventDefault();
    console.debug('dataset value: ', e.target.dataset.value);
    let launch = !e.target.value;
    console.debug(`calibration ec will be launch`);
    // eslint-disable-next-line react/destructuring-assignment
    this.state.ec.calib_launch = launch;
        // eslint-disable-next-line react/destructuring-assignment
        const url = `http://${this.state.ipAddress}/set-water-sensor?launchCalibration=ec`;
        console.info(`info : sending to : ${url}`);
        fetch(url, {
          method: 'POST'
        })
          .then(response => response.json())
          .then(result => console.debug(result))
          .catch(error => console.debug(error));
  }

  handleChangeSetPoint(e) {
    let sp;
    if (!e) {
      sp = document.getElementById('_setPoint').value;
    } else {
      e.preventDefault();
      sp = e.target.value;
    }
    let ec = Object.assign({}, this.state.ec);
    ec.set_point = sp;
    this.setState({ ec });
  }

  handleChangePumpsDuration(e) {
    let d;
    if (!e) {
      d = document.getElementById('_maxDuration').value;
    } else {
      e.preventDefault();
      d = e.target.value;
    }
    let ec = Object.assign({}, this.state.ec);
    ec.max_pumps_durations = d;
    this.setState({ ec });
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
    let ec = Object.assign({}, this.state.ec);
    ec.set_point = this.state.ec.set_point;
    ec.max_pumps_durations = this.state.ec.max_pumps_durations;
    this.setState({ ec });
    // eslint-disable-next-line no-template-curly-in-string
    console.log(`data will send : ${JSON.stringify({ water_sensor: { ec } })}`);
    // eslint-disable-next-line react/destructuring-assignment
    const url = `http://${this.state.ipAddress}/set-water-sensor`;
    console.info(`info : sending to :${url}`);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ water_sensor: { ec } })
    })
      .then(response => console.log(response.status))
      .catch(error => console.debug(error));
  }

  render() {
    const { ec } = this.state;
    return (
      <ul className="list-unstyled">
        <li className="list-item alert alert-dark">
          <ul className="list-inline">
            <li
              className={
                // eslint-disable-next-line no-nested-ternary
                ec === null
                  ? 'list-inline-item text-secondary'
                  : ec.regulation_state === 1
                  ? 'list-inline-item text-success'
                  : 'list-inline-item text-danger'
              }
              title="Regulation status"
            >
              <span className="" onClick={event => this.handleToggleReg(event)}>
                <i
                  className="fas fa-poll fa-2x"
                  data-value={ec.regulation_state}
                />{' '}
                {// eslint-disable-next-line no-nested-ternary
                ec === null
                  ? 'Error'
                  : ec.regulation_state === 1
                  ? 'Runnig'
                  : 'Stopped'}
              </span>
            </li>
            <li
              className={
                // eslint-disable-next-line no-nested-ternary
                ec === null
                  ? 'list-inline-item text-secondary'
                  : ec.calib_launch === 1
                  ? 'list-inline-item text-success'
                  : 'list-inline-item text-danger'
              }
              title="Calibration status"
            >
              <span className="" onClick={event => this.handleLaunchCal(event)}>
                <i
                  className="fas fa-syringe fa-2x"
                  data-value={ec.calib_launch}
                />{' '}
                {// eslint-disable-next-line no-nested-ternary
                ec === null
                  ? 'Error'
                  : ec.calib_launch === 1
                  ? 'Running'
                  : 'Stopped'}
              </span>
            </li>
          </ul>
        </li>
        <li className="list-item alert alert-success">
          <i className="fas fa-ruler-horizontal fa-rotate-90 fa-2x" />
          <span className="h2">Ec </span>{' '}
          <span className="h2">
            {ec === null ? 0 : Number(ec.value).toFixed(2)}
          </span>
        </li>
        <li>
          <form className="form">
            <li className="list-item alert alert-info">
              <label className="text-center">SetPoint</label>
              <div className="input-group">
                <div className="input-group-prepend row no-gutters">
                  <label className="input-group-text text-secondary text-center px-3 px-md-1 col-12 col-md-4">
                    <i className="fas fa-bullseye" />{' '}
                    {ec === null ? 0 : Number(ec.set_point).toFixed(2)}
                  </label>
                  <input
                    className="custom-range mt-2 px-1 text-center col-12 col-md-8 mx-auto"
                    type="range"
                    min="0.0"
                    max="4.0"
                    step="0.1"
                    name="_setPoint"
                    id="_setPoint"
                    value={ec === null ? 0 : ec.set_point}
                    onChange={event => this.handleChangeSetPoint(event)}
                  />
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        document.getElementById('_setPoint').stepDown(1);
                        this.handleChangeSetPoint();
                      }}
                    >
                      <i className="fas fa-minus" />
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        document.getElementById('_setPoint').stepUp(1);
                        this.handleChangeSetPoint();
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
                  <label className="input-group-text text-secondary text-center px-3 px-md-0 col-12 col-md-4">
                    <i className="fas fa-bullseye" />{' '}
                    {ec === null
                      ? 0
                      : Number(ec.max_pumps_durations).toFixed(0)}
                  </label>
                  <input
                    className="custom-range mt-2 px-1 text-center col-12 col-md-8 mx-auto"
                    type="range"
                    min="0"
                    max="60000"
                    step="100"
                    name="_maxDuration"
                    id="_maxDuration"
                    value={ec === null ? 0 : ec.max_pumps_durations}
                    onChange={event => this.handleChangePumpsDuration(event)}
                  />
                  <div className="col-12 text-center">
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
              className="btn btn-info form-control mt-3"
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

export default Ec;
