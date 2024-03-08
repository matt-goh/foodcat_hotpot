import React, { useEffect, useState } from "react";

const Table = ({
  tableNum,
  selectedTable,
  onSelectTable,
  selectedDateTime,
}) => {
  const [isTableReserved, setIsTableReserved] = useState(false);
  const isSelected = selectedTable === tableNum;

  const handleClick = () => {
    onSelectTable(tableNum);
  };

  const checkTableReservation = async (tableNum, dateTime) => {
    const userSelectedTime = new Date(dateTime);

    const formattedDate = userSelectedTime
      .toLocaleDateString()
      .split("/")
      .join("-");

    const formattedTime = userSelectedTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const endTime = new Date(userSelectedTime);
    endTime.setHours(endTime.getHours() + 2);

    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations?tableNumber=${tableNum}&reservedDate=${formattedDate}&startTime=${formattedTime}&endTime=${formattedEndTime}`
      );

      if (response.ok) {
        const reservationData = await response.json();
        setIsTableReserved(reservationData !== false);
      } else {
        throw new Error("Error checking table reservation");
      }
    } catch (error) {
      console.error("Error checking table reservation: ", error);
    }
  };

  useEffect(() => {
    checkTableReservation(tableNum, selectedDateTime);
  }, [selectedDateTime]);

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
