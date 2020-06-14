import React from 'react';
import './App.css';
import Cronos from './components/Cronos';

const App = (props) => {
  return (
    <div className="App">
      <h1 className="ui dividing centered header">Cronómetros</h1>
      <div id="content"></div>
      <Cronos/>
    </div>
  );
}

export default App;
