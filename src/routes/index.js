import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../components/dashboard/Dashboard';
import OrderEntry from '../components/OrderEntry';
import CustomerInfo from '../components/customer/CustomerInfo';

const routes = (
  <div>
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route path='/orderentry' component={OrderEntry} />
    <Route path='/customer' component={CustomerInfo} />
  </Switch>
  </div>
);

export default routes;