import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tetris from './tetris/Tetris.jsx';
import prepareData from "./tetris/sampleData";

class App extends Component {
  render() {
    const data = prepareData();
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <Tetris data={data} />
      </React.Fragment>
    );
  }
}

export default App;
