import * as React from "react";

function Board() {
      const [squares, setSquares] = React.useState(Array(9).fill(null));
      const [status, setStatus] = React.useState("");

      function selectSquare(square) {
            if (calculateWinner(squares) || squares[square]) {
                  setStatus("Game Over. Please restart.");
                  return;
            }

            const next = calculateNextValue(squares);
            const squaresCopy = [...squares];
            squaresCopy[square] = next;
            setSquares(squaresCopy);

            const winner = calculateWinner(squaresCopy);
            const nextValue = calculateNextValue(squaresCopy);
            const newStatus = calculateStatus(winner, squaresCopy, nextValue);
            setStatus(newStatus);
      }

      function restart() {
            setSquares(Array(9).fill(null));
            setStatus("");
      }

      function renderSquare(i) {
            return (
                  <button className="square" onClick={() => selectSquare(i)}>
                        {squares[i]}
                  </button>
            );
      }

      return (
            <div>
                  <div className="board-row">
                        <div className="square">{renderSquare(0)}</div>
                        <div className="square">{renderSquare(1)}</div>
                        <div className="square">{renderSquare(2)}</div>
                  </div>
                  <div className="board-row">
                        <div className="square">{renderSquare(3)}</div>
                        <div className="square">{renderSquare(4)}</div>
                        <div className="square">{renderSquare(5)}</div>
                  </div>
                  <div className="board-row">
                        <div className="square">{renderSquare(6)}</div>
                        <div className="square">{renderSquare(7)}</div>
                        <div className="square">{renderSquare(8)}</div>
                  </div>
                  <div className="status">
                        <button className="btn" onClick={restart}>
                              restart
                        </button>
                        {status}
                  </div>
            </div>
      );
}

function Game() {
      return (
            <div>
                  <div>
                        <Board />
                  </div>
            </div>
      );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
      return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's game` : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
      return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
      const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                  return squares[a];
            }
      }
      return null;
}

function App() {
      return <Game />;
}

export default App;
