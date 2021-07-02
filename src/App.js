import './App.css';
import React from 'react';

import Stonks from './pages/stockPage';
import CryptoPage from './pages/cryptoPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from './components/navBar/nav';

import Home from './pages';
import AccInfo from './pages/accInfo';
import Contact from './pages/contact-me';
import Profile from './pages/editProfile';
import Login from './pages/login';
import Account from './pages/account';
import CryptoStockPage from './pages/stockCryptoPage';

function App() {

  return (
    <div className="App">
      <Router>
          <Navigation />
            <Switch>
             <Route path = '/' exact component = {Home} />
             <Route path="/stockPage" component={Stonks} />
             <Route path="/cryptoPage" component={CryptoPage}/>
             <Route path="/accInfo" component={AccInfo}/>
             <Route path="/contact-me" component={Contact}/>
             <Route path="/editProfile" component={Profile}/>
             <Route path="/login" component={Login}/>
             <Route path='/account' component = {Account} />
             <Route path = '/cryptoStock' component = {CryptoStockPage} />
           </Switch> 
      </Router>
      {/* <img src= {require('./img/logo.svg')} alt='logfo' /> */}
    </div>
  );
}

export default App;
