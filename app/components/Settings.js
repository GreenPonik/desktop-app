import React, { Component } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount(){
    if (localStorage.getItem('ipAddress')) {
      this.setState({
        ipAddress: localStorage.getItem('ipAddress')
      });
    }
    if (localStorage.getItem('setupName')) {
      this.setState({
        setupName: localStorage.getItem('setupName'),
      });
    }
  }

  handleSetupNameChange(e) {
    e.preventDefault();
    this.setState({ setupName: e.target.value });
  }

  handleIpAddressChange(e) {
    e.preventDefault();
    this.setState({ ipAddress: e.target.value });
  }

  handleIpSubmit(e) {
    e.preventDefault();
    localStorage.setItem('setupName', this.state.setupName);
    localStorage.setItem('ipAddress', this.state.ipAddress);
    // window.location.href = '/';
  }

  render() {
    const { ipAddress, setupName } = this.state;
    return (
      <div className="mx-auto">
        <h1>Settings</h1>
        <form className="form" onSubmit={event => this.handleIpSubmit(event)}>
          <div className="input-group mb-2">
            <input
              className="form-control"
              id="_setupName"
              type="text"
              placeholder="put here setup name you want"
              value={setupName == null ? '' : setupName}
              onChange={event => this.handleSetupNameChange(event)}
              required
            />
            <label htmlFor="_setupName">put the name you want</label>
          </div>
          <div className="form-label-group input-group">
            <input
              className="form-control"
              id="_ip"
              type="text"
              placeholder="put here hub ip address"
              value={ipAddress == null ? '' : ipAddress}
              onChange={event => this.handleIpAddressChange(event)}
              required
            />
            <label htmlFor="_ip">put here hub ip address</label>
            <div className="input-group-append">
              <div className="input-group-text bg-info">
                <button
                  className="btn bg-transparent border-none p-0 text-white"
                  type="submit"
                >
                  {/* <i className="far fa-caret-square-down fa-2x" /> */}
                  Submit
                </button>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
