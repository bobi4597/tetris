import React, { Component } from 'react';
import Tetris from 'tetris/Tetris.jsx';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Tetris />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
