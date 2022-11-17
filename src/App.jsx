import "./App.css";

import * as React from "react";

import Cell from "./components/cell";
import lo from "lodash";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// we export this to test it
export const winningStates = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const PLAYER_A = "X";
const PLAYER_B = "O";

function App() {
  const [currentPlayer, setNextPlayer] = React.useState("playerA");
  const [currentBoard, setCurrentBoard] = React.useState(board);

  const handleClick = (row, column) => {
    const tempBoardState = lo.cloneDeep(currentBoard);
    if (tempBoardState[row][column] !== null) {
      alert("The cell is already selected. Please choose other cell.");
      return;
    }
    if (tempBoardState[row][column] === null) {
      tempBoardState[row][column] =
        currentPlayer === "playerA" ? PLAYER_A : PLAYER_B;
    }

    setNextPlayer(currentPlayer === "playerA" ? "playerB" : "playerA");
    setCurrentBoard(tempBoardState);
  };

  const checkWinner = () => {
    for (let i = 0; i < winningStates.length; i++) {
      const winningState = winningStates[i];
      const [row0, col0] = winningState[0];
      const [row1, col1] = winningState[1];
      const [row2, col2] = winningState[2];

      if (
        currentBoard[row0][col0] &&
        currentBoard[row0][col0] === currentBoard[row1][col1] &&
        currentBoard[row1][col1] === currentBoard[row2][col2]
      ) {
        let scoreHistory = JSON.parse(localStorage.getItem("tictactoe"));
        if (scoreHistory === null) {
          scoreHistory = { a: 0, b: 0 };
        }
        if (currentBoard[row0][col0] === PLAYER_A) {
          scoreHistory.a++;
        } else {
          scoreHistory.b++;
        }

        localStorage.setItem("tictactoe", JSON.stringify(scoreHistory));
        return currentBoard[row0][col0];
      }
    }
    return null;
  };

  const checkDraw = () => {
    return currentBoard.every((row) => {
      return row.every((r) => Boolean(r));
    });
  };

  const isWinner = checkWinner();
  const isDraw = checkDraw();

  return (
    <div className="App">
      <h1 className="title">TIC TAC TOE</h1>
      <h3>Player A: {PLAYER_A}</h3>
      <h3>Player B: {PLAYER_B}</h3>
      {isDraw ? (
        <>
          <h2 data-testid="test.draw">It's a DRAW!</h2>
          <button onClick={() => setCurrentBoard(board)}>Restart</button>
        </>
      ) : isWinner ? (
        <>
          <h2 data-testid="test.winner">
            Player {isWinner === PLAYER_A ? "A" : "B"} has win
          </h2>
          <button onClick={() => setCurrentBoard(board)}>Restart</button>
        </>
      ) : (
        currentBoard.map((b, idx) => {
          return (
            <div key={idx} className="row">
              <Cell text={b[0]} onClick={() => handleClick(idx, 0)} />
              <Cell text={b[1]} onClick={() => handleClick(idx, 1)} />
              <Cell text={b[2]} onClick={() => handleClick(idx, 2)} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
