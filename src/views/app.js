import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import request from 'superagent';

import NotFoundPage from './not-found';
import Home from './home';
import Register from './register';
import EventPages from './event';
import AdminPages from './admin'

// todo fix this
import Dashboard from './RawDashboard/dashboard';
import Eventinfo from './RawDashboard/Event Info';
import Appliedmusician from './RawDashboard/AppliedMusician';
import Currentcontract from './RawDashboard/CurrentContract';

import config from 'src/config';
import { globalLoginState } from 'src/store';


const App = ({loginState}) => {
  const attempt = useRef(false);
  
  if (!attempt.current) {
    attempt.current = true;
    request.get(`${config.API_URL}/auth/status`)
      .withCredentials()
      .then(res => {
        const {username} = JSON.parse(res.text);
        if (username){
          loginState.username = username;
          console.log("logged in as", username);
        }
      })
      .catch(err => {
      })
  }

  return (
    <Router>
      <Switch>
        <Route path='/event'>
          <EventPages/>
        </Route>
        <Route path='/admin'>
          <AdminPages/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/eventinfo">
          <Eventinfo/>
        </Route>
        <Route path="/appliedmusician">
          <Appliedmusician/>
        </Route>
        <Route path="/currentcontract">
          <Currentcontract/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/">
          <NotFoundPage/>
        </Route>
      </Switch>
    </Router>
          
  );
};

export default () => <App loginState={globalLoginState}/>; 