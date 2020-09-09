import React from 'react';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';
import './App.css';

function onAuthRequired({ history }) {
  history.push('/login')
}

function App() {

  return (
    <Router>
      <Security
        issuer={process.env.REACT_APP_OKTA_ISSUER_URI}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={window.location.origin + '/implicit/callback'}
        onAuthRequired={onAuthRequired}
        pkce={true} >
        <div className="App">
          <Navbar />
          <div className="container">
            <Route path="/" exact component={Home} />
            <SecureRoute path="/staff" exact component={Staff} />
            <Route
              path='/login'
              render={() => <Login issuer={process.env.REACT_APP_OKTA_ISSUER_URI} />} />
            <Route path='/implicit/callback' component={LoginCallback} />
          </div>
        </div>
      </Security>
      
    </Router>
    
  );
}

export default App;
