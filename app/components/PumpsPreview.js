import React, { Component } from "react";

class PumpsPreview extends Component {
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
    return data.slaves_modules.pump_module !== undefined ?(
      <div>
        {data.slaves_modules.pump_module.pumps.map((pump, index) => (
          <div key={index} className="row no-gutters px-0 py-2 m-0">
            <div className="col-4 text-center">
              <span className="m-auto">
                <i className="fas fa-indent fa-2x" />{" "}
                <span className="h4">
                  {pump.type !== 0 ? (pump.type === 1 ? "pH" : "EC") : "Water"}
                </span>
              </span>
            </div>
            <div className="col-4 text-center">
              <span className="m-auto">
                <i className="fas fa-clock fa-2x" />{" "}
                <span className="h4">
                  {pump.durarion === 0 ? "0" : pump.duration} ms
                </span>
              </span>
            </div>
            <div className="col-4 text-center">
              <span className="m-auto">
                <i className="fas fa-power-off fa-2x" />{" "}
                <span className="h4">{pump.state ? "On" : "Off"}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    ):(<div>something wrong</div>);
  }
}

export default PumpsPreview;
