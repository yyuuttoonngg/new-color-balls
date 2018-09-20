import React from 'react';
import Board from './Board';



export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      starClass: true,
    }
  }
  handleBackground(){
    let starClass = this.state.starClass;
    this.setState({
      starClass: !starClass
    })
  }
  render() {
    let starClass = this.state.starClass;
    return (
      <div className="game">
        <div className={starClass?"stars":""}></div>
        <div className="game-board">
          <Board />
        </div>
        <div className="background-btn" onClick={()=>this.handleBackground()}> background</div>
      </div>
    );
  }
}
