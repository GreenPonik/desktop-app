import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import HubPage from './containers/HubPage';
import EcPage from './containers/EcPage';
import PhPage from './containers/PhPage';
import PumpsPage from './containers/PumpsPage';
import SettingsPage from './containers/SettingsPage';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.EC} component={EcPage} />
      <Route path={routes.PH} component={PhPage} />
      <Route path={routes.HUB} component={HubPage} />
      <Route path={routes.PUMPS} component={PumpsPage} />
      <Route path={routes.SETTINGS} component={SettingsPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
