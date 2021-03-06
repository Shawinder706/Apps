import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layouts/navbar";
import Landing from "./components/layouts/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from './components/layouts/alert';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/privateRoute'
import CreateProfile from './components/profile-forms/createProfile'
import EditProfile from './components/profile-forms/editProfile'
import AddExperience from './components/profile-forms/addExperience'


//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from "./utils/setAuthToken";
import addExperience from './components/profile-forms/addExperience';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path='/create-profile' component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
              <PrivateRoute exact path='/add-experience' component={addExperience}></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
