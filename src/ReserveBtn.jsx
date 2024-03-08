import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "./firebase.js";
import React from "react";

const ReserveBtn = ({ selectedTable, selectedDateTime }) => {
  const [userIsSignedIn] = useAuthState(auth);
  const username = useSelector((state) => state.user.username);

  const reserveTable = async (table, dateTime) => {
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
      const requestBody = {
        tableNumber: table,
        user: username,
        reservedDate: formattedDate,
        startTime: formattedTime,
        endTime: formattedEndTime, // Assuming a reservation is for 2 hours
      };

      const response = await fetch("http://localhost:3000/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestBody,
        }),
      });

      if (!response.ok) {
        throw new Error("Reservation failed");
      }

      console.log(
        `Table ${table} reserved from ${formattedTime} to ${formattedEndTime} on ${formattedDate} by ${username}`
      );
    } catch (error) {
      console.error("Error reserving table: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-blur bg-orange mt-6 hover:bg-dark-orange text-white text-lg font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
        onClick={() =>
          !userIsSignedIn
            ? alert("Please sign in first.")
            : reserveTable(selectedTable, selectedDateTime)
        }
      >
        Reserve
      </button>
    </div>
  );
};

export default ReserveBtn;
