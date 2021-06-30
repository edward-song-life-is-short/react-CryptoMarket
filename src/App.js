import './App.css';
import React from 'react';

import Stonks from './pages/stockPage';
import Crypto from './StockSetUp/crypto';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from './navBar/nav';

import Home from './pages';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Navigation />
            <Switch>
             <Route path = '/' exact component = {Home} />
             <Route path="/stockPage" component={Stonks} />
             <Route path="/cryptoPage" component={Crypto}/>
             
           </Switch>
        </div> 
      </Router>
      {/* <img src= {require('./img/logo.svg')} alt='logfo' /> */}
    </div>
  );
}

export default App;
