import { useState } from "react";

const Table = ({ tableNum, selectedTable, onSelectTable }) => {
  const isSelected = selectedTable === tableNum;

  const handleClick = () => {
    onSelectTable(tableNum);
  };

  return (
    <div className="cursor-pointer w-1/12 mx-auto" onClick={handleClick}>
      <div className="relative">
        <img
          src={`src/assets/dinning-table.png`}
          alt={`Table ${tableNum}`}
          className={`h-auto rounded transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-40"}`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange transition-opacity duration-300  ${isSelected ? "opacity-100" : "opacity-40"}`}
        >
          {tableNum}
        </div>
      </div>
    </div>
  );
};

export default Table;
