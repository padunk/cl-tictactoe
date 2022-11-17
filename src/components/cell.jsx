import React from "react";

const Cell = ({ text, onClick }) => {
  return (
    <button
      className="cell"
      onClick={onClick}
      type="button"
      data-testid={`test.cell`}
    >
      {text}
    </button>
  );
};

export default Cell;
