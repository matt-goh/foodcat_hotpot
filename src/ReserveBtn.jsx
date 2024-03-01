import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import React from "react";

const ReserveBtn = ({ selectedTable, selectedDateTime }) => {
  const username = useSelector((state) => state.user.username);
  const reserveTable = async (table, dateTime) => {
    try {
      const tableInfo = {
        user: username,
        reservedTime: dateTime,
        isReserved: true,
      };
      await setDoc(
        doc(db, "bookings", "/", "Table " + String(table)),
        tableInfo,
        {
          merge: true,
        }
      );
    } catch (error) {
      console.error("Error reserving table: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-blur bg-orange mt-6 hover:bg-dark-orange text-white text-lg font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
        onClick={() => reserveTable(selectedTable, selectedDateTime)}
      >
        Reserve
      </button>
    </div>
  );
};

export default ReserveBtn;
