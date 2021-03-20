import React, { Component } from 'react';

class Scoreboard extends Component {
  render() {
    return (
      <div className="scoreboard">
        {this.props.players.map((player, i) => (
          <div className={`${this.props.turn === i ? 'playerTurn' : 'player'}`}>
            <h2 className={`${this.props.winner === i ? 'winner' : 'name'}`}>
              Player{i + 1}
            </h2>
            <h3>Total Score:</h3>
            <h3>{player.totalScore}</h3>
            <h3>Current Round Score:</h3>
            <h3> {player.roundScore}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Scoreboard;
