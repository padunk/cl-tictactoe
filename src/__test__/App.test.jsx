import App, { winningStates } from "../App";
import { checkDraw, checkWinner } from "../utils";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Cell from "../components/cell";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

describe("App", () => {
  it("matching the snapshot", () => {
    render(<App />);

    expect(<App />).toMatchSnapshot();
  });

  it("click the cell will change the inner text", async () => {
    const { getAllByTestId } = render(<App />);
    const buttons = getAllByTestId("test.cell");

    await user.click(buttons[0]);
    expect(buttons[0].innerHTML).toBe("X");

    await user.click(buttons[0]);
    expect(buttons[0].innerHTML).not.toBe("O"); // negative test

    await user.click(buttons[1]);
    expect(buttons[1].innerHTML).toBe("O");
  });

  it("should show winner title", async () => {
    const { getAllByTestId, getByTestId } = render(<App />);
    const buttons = getAllByTestId("test.cell");

    await user.click(buttons[0]); // X
    await user.click(buttons[4]); // O
    await user.click(buttons[1]); // X
    await user.click(buttons[5]); // O
    await user.click(buttons[2]); // X

    expect(getByTestId("test.winner")).toBeInTheDocument();
  });

  it("should show draw title", async () => {
    const { getAllByTestId, getByTestId } = render(<App />);
    const buttons = getAllByTestId("test.cell");

    await user.click(buttons[0]); // X
    await user.click(buttons[1]); // O
    await user.click(buttons[2]); // X
    await user.click(buttons[6]); // O
    await user.click(buttons[7]); // X
    await user.click(buttons[8]); // O
    await user.click(buttons[3]); // X
    await user.click(buttons[4]); // O
    await user.click(buttons[5]); // X

    expect(getByTestId("test.draw")).toBeInTheDocument();
  });

  it("should render correct text", () => {
    const { getByTestId } = render(<Cell text="X" onClick={() => {}} />);

    expect(getByTestId("test.cell").innerHTML).toEqual("X");
  });
});

describe("Unit Test", () => {
  test("should not return winner", () => {
    let result = checkWinner(winningStates, board);
    expect(result).toBeNull();

    board[0] = ["X", "X", "O"];
    result = checkWinner(winningStates, board);
    expect(result).toBeNull();

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "X", "O"];
    board[2] = [null, null, null];

    result = checkWinner(winningStates, board);
    expect(result).toBeNull();
  });

  test("should return a winner", () => {
    let result = checkWinner(winningStates, board);
    expect(result).toBeNull();

    board[0] = ["X", "X", "X"];
    result = checkWinner(winningStates, board);
    expect(result).toEqual("X");

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "O", "O"];
    board[2] = [null, null, null];

    result = checkWinner(winningStates, board);
    expect(result).toEqual("O");

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "X", "O"];
    board[2] = [null, null, "O"];

    result = checkWinner(winningStates, board);
    expect(result).toEqual("O");

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "X", "O"];
    board[2] = [null, null, "X"];

    result = checkWinner(winningStates, board);
    expect(result).toEqual("X");
  });

  test("should be draw", () => {
    let result = checkDraw(board);
    expect(result).toBe(false);

    board[0] = ["X", "O", "X"];
    result = checkDraw(board);
    expect(result).toBe(false);

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "O", "O"];
    board[2] = [null, null, null];

    result = checkDraw(board);
    expect(result).toBe(false);

    board[0] = ["X", "X", "O"];
    board[1] = ["O", "X", "O"];
    board[2] = [null, null, "O"];

    result = checkDraw(board);
    expect(result).toEqual(false);

    board[0] = ["X", "O", "O"];
    board[1] = ["O", "O", "X"];
    board[2] = ["O", "X", "X"];

    result = checkDraw(board);
    expect(result).toEqual(true);
  });
});
