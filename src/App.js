import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
const Layouts = React.lazy(() => import("@/layouts"));
const Login = React.lazy(() => import("@pages/Login"));
function App() {
  return (
    <Router>
      <div>
        <Suspense fallback="<div>loading...</div>">
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={Layouts}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
