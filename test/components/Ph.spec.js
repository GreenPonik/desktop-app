import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Ph from '../../app/components/Ph';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  // const actions = {
  //   increment: spy(),
  //   incrementIfOdd: spy(),
  //   incrementAsync: spy(),
  //   decrement: spy()
  // };
  const component = shallow(<Ph /*counter={1} {...actions}*/ />);
  return {
    component,
    //actions,
    //buttons: component.find('button'),
    ul: component.find('ul')
  };
}

describe('Ph component', () => {
  // it('should should display list of sensor data', () => {
  //   const { ul } = setup();
  //   expect(ul).toBe();
  // });

  // it('should first button should call increment', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(0).simulate('click');
  //   expect(actions.increment.called).toBe(true);
  // });

  it('should match exact snapshot', () => {
    //const { actions } = setup();
    const ph = (
      <div>
        <Router>
          <Ph /*counter={1} {...actions}*/ />
        </Router>
      </div>
    );
    const tree = renderer.create(ph).toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it('should second button should call decrement', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(1).simulate('click');
  //   expect(actions.decrement.called).toBe(true);
  // });

  // it('should third button should call incrementIfOdd', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(2).simulate('click');
  //   expect(actions.incrementIfOdd.called).toBe(true);
  // });

  // it('should fourth button should call incrementAsync', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(3).simulate('click');
  //   expect(actions.incrementAsync.called).toBe(true);
  // });
});
