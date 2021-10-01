import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "../home/HomeScreen";
import Main from "../../components/Main";

function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/swap">
            <Main />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
