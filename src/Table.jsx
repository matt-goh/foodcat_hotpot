import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import React, { useState } from "react";

const Table = ({ tableNum, selectedTable, onSelectTable }) => {
  const [isTableReserved, setIsTableReserved] = useState(false);
  const isSelected = selectedTable === tableNum;

  const checkTableReservation = async () => {
    const docRef = doc(db, "bookings", "Table " + String(tableNum));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIsTableReserved(docSnap.data().isReserved);
    }
  };

  checkTableReservation();

  const handleClick = async () => {
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
