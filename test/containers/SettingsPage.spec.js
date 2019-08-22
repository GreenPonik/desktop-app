import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import SettingsPage from '../../app/containers/SettingsPage';
import { configureStore } from '../../app/store/configureStore';

Enzyme.configure({ adapter: new Adapter() });

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();
  const provider = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SettingsPage />
      </ConnectedRouter>
    </Provider>
  );
  const app = mount(provider);
  return {
    app,
    anchor: app.find('a'),
  };
}

describe('containers', () => {
  describe('App', () => {
    // it('should display altitude value',()=>{
    //   const { altitude } = setup();
    //   expect(altitude.text()).toMatch(/^\d{1,5} \ m$/);
    // });

    it('should display back button', () => {
      const { anchor } = setup();
      expect(anchor.text()).toMatch(/^Back$/);
    });
  });
});
