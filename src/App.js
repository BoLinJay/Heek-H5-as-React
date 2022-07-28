import React, { Suspense } from "react";
import AuthRoute from "./components/AuthRouter";
import history from "./utils/history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
const Layouts = React.lazy(() => import("@/layouts"));
const Login = React.lazy(() => import("@pages/Login"));
const ProfileEdit = React.lazy(() => import("@pages/Profile/Edit/index"));
const NotFond = React.lazy(() => import("@pages/NotFond"));
function App() {
  return (
    <Router history={history}>
      <div>
        <Suspense fallback="<div>loading...</div>">
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={Layouts}></Route>
            <Route path="/login" component={Login}></Route>
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <Route component={NotFond}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
