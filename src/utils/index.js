export const checkWinner = (winningStates, currentBoard) => {
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
      return currentBoard[row0][col0];
    }
  }
  return null;
};

export const checkDraw = (currentBoard) => {
  return currentBoard.every((row) => {
    return row.every((r) => Boolean(r));
  });
};
