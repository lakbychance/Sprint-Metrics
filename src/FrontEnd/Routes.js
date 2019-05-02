import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardApp from "./Views/Dashboard/components/DashboardApp.js";
import CMetrixApp from "./Views/C-Metrix/components/CMetrixApp.js";
export default class Routes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={DashboardApp} />
          <Route exact path="/c-metrix" component={CMetrixApp} />
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
