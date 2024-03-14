import React from "react";
import Modal from "react-modal";
import format from "date-fns/format";

const seatsNum = (selectedTable) => {
  if (selectedTable >= 6 && selectedTable <= 15) {
    return "2-4";
  }
  return "6-8";
};

const ReservationSuccessModal = ({ isOpen, onClose, reservationDetails }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      className="bg-white rounded-lg p-10 max-w-md mx-auto"
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20 text-green-600 mb-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-4">Reservation Successful!</h2>
        {reservationDetails && (
          <div className="text-gray-700">
            <p>
              <span className="font-medium">Table:</span>{" "}
              {reservationDetails.tableNumber} (
              {seatsNum(reservationDetails.tableNumber)} seats)
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {reservationDetails.reservedDate} (
              {format(
                new Date(
                  `${reservationDetails.reservedDate} ${reservationDetails.startTime}`
                ),
                "h:mm aa"
              )}{" "}
              -{" "}
              {format(
                new Date(
                  `${reservationDetails.reservedDate} ${reservationDetails.endTime}`
                ),
                "h:mm aa"
              )}
              )
            </p>
            <p>
              <span className="font-medium">Package:</span>{" "}
              {reservationDetails.selectedPackage}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {reservationDetails.selectedPayment === "Cash"
                ? "Cash"
                : "Proceed to Online Payment"}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReservationSuccessModal;
