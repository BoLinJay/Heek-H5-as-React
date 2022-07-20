import React, { Suspense } from 'react'
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from '@pages/Home'
import Login from '@pages/Login'
function App() {
  return <Router>
      <div>
        <Suspense fallback="<div>Lodding...</div>">
            <Switch>
              <Redirect exact from='/' to='/home'></Redirect>
              <Route path='/home' component={Home}></Route>
              <Route path='/login' component={Login}></Route>
            </Switch>
        </Suspense>
      </div>
  </Router>
 

 
}

export default App;
