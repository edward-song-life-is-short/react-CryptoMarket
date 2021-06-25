import './App.css';
import Stock from './Stock'
import React from 'react';
import Timers from './SmallComponents/timer.js'

function App() {
  
  return (
    <div className="App">
      <Timers />
        <Stock> </Stock>
        
    </div>
  );
}

export default App;
