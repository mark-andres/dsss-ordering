import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../components/dashboard/Dashboard';
import OrderEntry from '../components/OrderEntry';

const routes = (
  <div>
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route path='/orderentry' component={OrderEntry} />
  </Switch>
  </div>
);

export default routes;