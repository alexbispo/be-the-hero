import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

class PrivateRoute extends React.Component {

  render() {
    if (!localStorage.getItem('ongId')) {
      return (
        <Redirect to='/' />
      );
    }

    return (
      <Route path={this.props.path} component={this.props.component} />
    );
  }
}

export default class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Logon} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/incidents/new" component={NewIncident} />
        </Switch>
      </BrowserRouter>
    );
  }
}
