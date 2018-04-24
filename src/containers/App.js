import React from "react";
import { browserHistory, Route, Router, IndexRoute } from "react-router";

import Layout from "./Layout";
import FAQContainer from "./FAQContainer";
import LauncherList from "../components/LauncherList";
import LauncherShow from "../components/LauncherShow";

const App = (props) => {
  return(
    <Router history={ browserHistory }>
      <Route path="/" component={ Layout }>
        <IndexRoute component={ FAQContainer } />
        <Route path="/launchers" component={ LauncherList } />
        <Route path="/launcher/:id" component={ LauncherShow } />
      </Route>
    </Router>
  )
};

export default App;
