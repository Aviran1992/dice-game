import React, { Component } from 'react';
import Scoreboard from '../Scoreboard/Scoreboard';
import Dice from '../Dice/Dice';
import GameActions from '../GameActions/GameActions';

class Game extends Component {
  state = {
    winner: 'none',
    pointsForWin: 100,
    dice: [0, 0],
    playerTurn: 0,
    players: [
      {
        totalScore: 0,
        roundScore: 0,
      },
      {
        totalScore: 0,
        roundScore: 0,
      },
    ],
  };

  changeTurn = () => {
    this.state.playerTurn < this.state.players.length - 1
      ? this.setState({ playerTurn: this.state.playerTurn + 1 })
      : this.setState({ playerTurn: 0 });
  };

  onRollClick = () => {
    if (this.state.winner === 'none') {
      console.log(this.state.pointsForWin);
      const die1 = Math.floor(Math.random() * 6);
      const die2 = Math.floor(Math.random() * 6);

      const UpdateRoundScore = this.state.players.map((player, i) => {
        if (i === this.state.playerTurn) {
          if (die1 === die2) {
            player.roundScore = 0;
            this.changeTurn();
          } else player.roundScore = player.roundScore + die1 + die2 + 2;
        }
        return player;
      });

      this.setState({
        dice: [die1, die2],
        players: UpdateRoundScore,
      });
    }
  };

  onHoldClick = () => {
    if (this.state.dice[0] !== this.state.dice[1]) {
      const UpdateTotalScore = this.state.players.map((player, i) => {
        if (i === this.state.playerTurn) {
          player.totalScore = player.totalScore + player.roundScore;
          player.roundScore = 0;
          if (player.totalScore >= this.state.pointsForWin)
            this.setState({ winner: this.state.playerTurn });
        }
        return player;
      });

      this.setState({ players: UpdateTotalScore });
      if (this.state.winner === 'none') this.changeTurn();
    }
  };

  onResetClick = (e) => {
    this.setState({
      dice: [0, 0],
      winner: 'none',
      pointsForWin: this.state.pointsForWin,
      players: [
        {
          totalScore: 0,
          roundScore: 0,
        },
        {
          totalScore: 0,
          roundScore: 0,
        },
      ],
      playerTurn: 0,
    });
  };

  onPointsChange = (value) => {
    if (isNaN(value)) alert('You must enter a number!');
    else this.setState({ pointsForWin: value });
  };

  render() {
    return (
      <div>
        <Scoreboard
          players={this.state.players}
          turn={this.state.playerTurn}
          winner={this.state.winner}
        />
        <Dice dice={this.state.dice} />
        <GameActions
          roll={this.onRollClick}
          hold={this.onHoldClick}
          reset={this.onResetClick}
          pointsChange={this.onPointsChange}
        />
      </div>
    );
  }
}

export default Game;
