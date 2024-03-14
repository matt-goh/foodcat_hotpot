import ReservationSuccessModal from "./ReservationSuccessModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "./firebase.js";
import React, { useState } from "react";

const ReserveBtn = ({
  selectedTable,
  selectedDateTime,
  selectedPackage,
  selectedPayment,
  checkAllTablesReservation,
  resetSelectedTable,
}) => {
  const [userIsSignedIn] = useAuthState(auth);
  const username = useSelector((state) => state.user.username);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  const reserveTable = async (
    table,
    dateTime,
    selectedPackage,
    selectedPayment
  ) => {
    const userSelectedTime = new Date(dateTime);

    const formattedDate = userSelectedTime
      .toLocaleDateString()
      .split("/")
      .join("-");

    const formattedTime = userSelectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const endTime = new Date(userSelectedTime);

    endTime.setHours(endTime.getHours() + 2);

    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    try {
      const requestBody = {
        tableNumber: table,
        user: username,
        reservedDate: formattedDate,
        startTime: formattedTime,
        endTime: formattedEndTime,
        selectedPackage: selectedPackage,
        selectedPayment: selectedPayment,
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
      // Show the success modal and set the reservation details
      setShowSuccessModal(true);
      setReservationDetails(requestBody);

      await checkAllTablesReservation(dateTime);
    } catch (error) {
      console.error("Error reserving table: ", error);
    }
  };

  const handleCloseSuccessModal = async () => {
    setShowSuccessModal(false);
    setReservationDetails(null);
    await resetSelectedTable(null);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-blur bg-orange mt-6 hover:bg-dark-orange text-white text-lg font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-opacity duration-300"
        onClick={() =>
          !userIsSignedIn
            ? alert("Please sign in first.")
            : reserveTable(
                selectedTable,
                selectedDateTime,
                selectedPackage,
                selectedPayment
              )
        }
      >
        Reserve
      </button>
      <ReservationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        reservationDetails={reservationDetails}
      />
    </div>
  );
};

export default ReserveBtn;
