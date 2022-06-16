import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import Components from "./components";
import Form from "./form";
import Table from "./table";
import Vote from "./vote";
import Pickers from "./pickers";
import ExtraPages from "./extraPages";
import Payment from "./payment";
import asyncComponent from "../../util/asyncComponent";
import { withRouter } from "react-router";

const Routes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/dashboard`} component={Dashboard} />
    <Route path={`${match.url}/components`} component={Components} />
    <Route path={`${match.url}/form`} component={Form} />
    <Route path={`${match.url}/table`} component={Table} />
    <Route path={`${match.url}/vote`} component={Vote} />
    <Route path={`${match.url}/payments`} component={Payment} />
    <Route path={`${match.url}/pickers`} component={Pickers} />

    <Route path={`${match.url}/user`} component={ExtraPages} />
    <Route
      component={asyncComponent(() =>
        import("app/routes/extraPages/routes/404")
      )}
    />
  </Switch>
);

export default withRouter(Routes);
