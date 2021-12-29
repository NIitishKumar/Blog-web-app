import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./Register";
import HomePage from "./HomePage";
import PrivateRoute from "./auth/auth";
import AdminLogin from './AdminLogin'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={AdminLogin} />
      <Route exact path="/login" component={App} />
      {/* <Route exact path="/" component={App} /> */}
      <Route exact path="/register" component={Register} />
      {/* <Route exact path='/homw' component={Register}/> */}
      {/* {console.log(window.localStorage.getItem("token"))} */}
      <PrivateRoute exact path="/:id">
        {/* {window.localStorage.getItem("token") ? ( */}
        <HomePage />
        {/* ) : (
          <Redirect to="/login"></Redirect> */}
      </PrivateRoute>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
