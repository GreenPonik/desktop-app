import React, { Component } from 'react';

class Pumps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ph: {},
      ec: {},
      pumpModule: {},
      pumps: {},
      ipAddress: null
    };
    if (localStorage.getItem('ipAddress')) {
      this.state.ipAddress = localStorage.getItem('ipAddress');
    }
    if (localStorage.getItem('data')) {
      this.state.data = JSON.parse(localStorage.getItem('data'));
      this.state.ec = this.state.data.slaves_modules.water_sensor.ec;
      this.state.ph = this.state.data.slaves_modules.water_sensor.ph;
      this.state.pumpModule = this.state.data.slaves_modules.pump_module;
      this.state.pumps = this.state.pumpModule.pumps;
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
        ec: this.state.data.slaves_modules.water_sensor.ec,
        ph: this.state.data.slaves_modules.water_sensor.ph,
        pumpModule: this.state.data.slaves_modules.pump_module,
        pumps: this.state.pumpModule.pumps
      });
    }
  }

  handleChangeType(i, e) {
    e.preventDefault();
    console.log('type change for pump ' + i);
    console.log('type ' + e.target.value);
    let pump = this.state.pumps[i];
    pump.type = parseInt(e.target.value);
    //add new pump object to pumps
    this.setState({
      pumps: this.state.pumps.map(el =>
        el.id === i ? Object.assign({}, el, { pump }) : el
      )
    });
  }

  handleChangeDuration(i, e) {
    let duration;
    if (!e) {
      duration = document.getElementById('range-' + i).value;
    } else {
      e.preventDefault();
      duration = e.target.value;
    }
    console.log('duration change for pump ' + i);
    console.log('duration ' + duration);
    let pump = this.state.pumps[i];
    pump.duration = parseInt(duration);
    //add new pump object to pumps
    this.setState({
      pumps: this.state.pumps.map(el =>
        el.id === i ? Object.assign({}, el, { pump }) : el
      )
    });
  }

  handleClickState(i, e, state) {
    e.preventDefault();
    console.log('state change for pump ' + i);
    console.log('state ' + state);
    let pump = this.state.pumps[i];
    pump.state = !state;
    //add new pump object to pumps
    this.setState({
      pumps: this.state.pumps.map(el =>
        el.id === i ? Object.assign({}, el, { pump }) : el
      )
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('data submited doing json and send it to hub');
    console.log(
      'data will send : ' +
        JSON.stringify({
          pump_module: this.state.pumpModule
        })
    );
    const urlDataHub = 'http://' + this.state.ipAddress + '/set-pump-module';
    console.info('info : sending to : ' + urlDataHub);
    fetch(urlDataHub, {
      method: 'POST',
      body: JSON.stringify({
        pump_module: this.state.pumpModule
      })
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        this.setState({ sentToHub: true });
      }
    });
  }

  render() {
    const { pumps, ec, ph } = this.state;
    return (
      <div className="w-100">
        {pumps === null
          ? 'Error'
          : pumps.map((pump, index) => (
              <div
                id={index}
                key={index}
                className="row no-gutters justify-content-center"
              >
                <div className="col-5 align-self-center alert alert-primary p-4 mb-0">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <label className="input-group-text text-primary">
                        {' '}
                        <i className="fas fa-indent" />
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      value={pump.type}
                      onChange={event => this.handleChangeType(index, event)}
                    >
                      <option value="0">Water</option>
                      <option value="1">pH</option>
                      <option value="2">EC</option>
                    </select>
                  </div>
                </div>
                <div
                  onClick={event =>
                    this.handleClickState(index, event, pump.state)
                  }
                  className={
                    // eslint-disable-next-line no-nested-ternary
                    pump.state
                      ? 'col-5 align-self-center alert alert-success text-center p-4 mb-0'
                      : 'col-5 align-self-center alert alert-secondary text-center p-4 mb-0'
                  }
                >
                  <button className="btn">
                    <i className="fas fa-power-off" />{' '}
                    {// eslint-disable-next-line no-nested-ternary
                    pump.state ? 'On' : 'Off'}
                  </button>
                </div>
                <div className="w-100" />
                <div className="col-10 alert alert-dark">
                  <div className="row no-gutters justify-content-center">
                    <label className="input-group-text text-dark col-10">
                      <span className="mx-auto">
                        <i className="fas fa-clock" /> {pump.duration} ms
                      </span>
                    </label>
                    <input
                      id={'range-' + index}
                      className="custom-range ml-3 mt-2 col-10"
                      type="range"
                      min="100"
                      /**
                       * max range is defined by pump type
                       * 0 = 60000ms
                       * 1 = 60000ms provided by user through smartapp init @ 5000ms
                       * 2 = 60000ms provided by user through smartapp init @ 5000ms
                       */
                      max={
                        // eslint-disable-next-line no-nested-ternary
                        pump.type === 1
                          ? ph.max_pumps_durations
                          : pump.type === 2
                          ? ec.max_pumps_durations
                          : ph.max_pumps_durations
                      }
                      step="10"
                      value={pump.duration}
                      onChange={event =>
                        this.handleChangeDuration(index, event)
                      }
                    />
                    <div className="col-12 col-md text-center">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          document.getElementById('range-' + index).stepDown(1);
                          this.handleChangeDuration(index);
                        }}
                      >
                        <i className="fas fa-minus" />
                      </button>{' '}
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          document.getElementById('range-' + index).stepUp(1);
                          this.handleChangeDuration(index);
                        }}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        <div className="row no-gutters">
          <div className="col-12 text-center">
            <button
              className="btn btn-secondary"
              onClick={event => this.handleSubmit(event)}
            >
              Send it to hub
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pumps;
