import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
const Layouts = React.lazy(() => import("@/layouts"));
const Login = React.lazy(() => import("@pages/Login"));
const ProfileEdit = React.lazy(() => import("@pages/Profile/Edit/index"));

function App() {
  return (
    <Router>
      <div>
        <Suspense fallback="<div>loading...</div>">
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={Layouts}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/profile/edit" component={ProfileEdit}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
