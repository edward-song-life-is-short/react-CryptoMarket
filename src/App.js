import './App.css';
import React from 'react';

import Stonks from './StockSetUp/stockPage';
import Crypto from './StockSetUp/crypto';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from './SmallComponents/nav';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Stonks} exact/>
             <Route path="/StockSetUp/crypto.js" component={Crypto}/>
             
           </Switch>
        </div> 
      </Router>

    </div>
  );
}

export default App;
