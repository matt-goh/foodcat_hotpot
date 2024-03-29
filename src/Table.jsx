import React from "react";

const Table = ({
  tableNum,
  selectedTable,
  onSelectTable,
  isTableReserved,
}) => {
  const isSelected = selectedTable === tableNum;

  const handleClick = () => {
    onSelectTable(tableNum);
  };

  return (
    <button
      id="table"
      className="cursor-pointer w-1/12 mx-auto"
      onClick={handleClick}
      disabled={isTableReserved}
    >
      <div className="relative">
        <img
          src={`src/assets/dinning-table.png`}
          alt={`Table ${tableNum}`}
          className={`h-auto rounded transition-opacity duration-300 ${isTableReserved ? "opacity-40" : isSelected ? "opacity-40" : "opacity-100"}`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange transition-opacity duration-300  ${isTableReserved ? "opacity-40" : isSelected ? "opacity-40" : "opacity-100"}`}
        >
          {tableNum}
        </div>
      </div>
    </button>
  );
};

export default Table;
