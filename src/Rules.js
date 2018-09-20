import React from 'react';
import { Link } from 'react-router-dom';

export default function Rules() {
  return (
    <div>
      <div className="restart" id="rules">
        <Link to="/">Back to game!</Link>
      </div>
      <h3>Color-5-O Rules</h3>
      <p>Line up balls with the same color - line can be vertical, horizontal or diagonal!</p>
      <p>To move, click the ball to select, then click an empty square. If there is a clear path, you can move it!</p>
      <p>Balls can only move vertically or horizontally, not Diagonally.</p>
      <p>When you create a line of 5 or more balls of the same color, score! (The random balls from the system don't count, sorry!)</p>
      <p>Now try to stay alive!</p>
      <div>
        <p>Score:</p>
        <ul>
          <li>5 balls - 10 points</li>
          <li>6 balls - 12 points</li>
          <li>7 balls - 18 points</li>
          <li>8 balls - 28 points</li>
          <li>9 balls - 42 points</li>
          <li>10 balls - 60 points</li>
        </ul>
      </div>

    </div>
  );
}