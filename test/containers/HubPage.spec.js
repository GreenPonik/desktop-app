import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import HubPage from '../../app/containers/HubPage';
import { configureStore } from '../../app/store/configureStore';

Enzyme.configure({ adapter: new Adapter() });

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();
  const provider = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HubPage />
      </ConnectedRouter>
    </Provider>
  );
  const app = mount(provider);
  return {
    app,
    // id: app.find('#hub-page'),
    temperature: app.find('#temperature'),
    humidity: app.find('#humidity'),
    pressure: app.find('#pressure'),
    light: app.find('#light'),
    altitude: app.find('#altitude'),
    anchor: app.find('a'),
  };
}

describe('containers', () => {
  describe('App', () => {
    // it('should display #hub-page id on first div',()=>{
    //   const { id } = setup();
    //   expect(id.text()).toMatch(/^hub-page$/);
    // });

    // it('should display temperature value',()=>{
    //   const { temperature } = setup();
    //   expect(temperature.text()).toMatch(/^(\d{1,2}\.\d{1,2})\ °C$/);
    // });

    // it('should display humidity value',()=>{
    //   const { humidity } = setup();
    //   expect(humidity.text()).toMatch(/^(\d{1,2}\.\d{1,2})\ %$/);
    // });

    // it('should display light value',()=>{
    //   const { light } = setup();
    //   expect(light.text()).toMatch(/^\d{1,5} \ lx$/);
    // });

    // it('should display altitude value',()=>{
    //   const { altitude } = setup();
    //   expect(altitude.text()).toMatch(/^\d{1,5} \ m$/);
    // });

    it('should display back button', () => {
      const { anchor } = setup();
      expect(anchor.text()).toMatch(/^Back$/);
    });
    // it('should display initial count', () => {
    //   const { p } = setup();
    //   expect(p.text()).toMatch(/^0$/);
    // });

    // it('should display updated count after increment button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(0).simulate('click');
    //   expect(p.text()).toMatch(/^1$/);
    // });

    // it('should display updated count after decrement button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(1).simulate('click');
    //   expect(p.text()).toMatch(/^-1$/);
    // });

    // it('shouldnt change if even and if odd button clicked', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^0$/);
    // });

    // it('should change if odd and if odd button clicked', () => {
    //   const { buttons, p } = setup({ counter: 1 });
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^2$/);
    // });
  });
});
