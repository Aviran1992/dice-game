import React from 'react';
import Game from './Game/Game';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <Game />
      </div>
    );
  }
}

export default App;
