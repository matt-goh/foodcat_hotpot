import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import Modal from "react-modal";
import auth from "./firebase";
import "./styles/index.css";

const seatsNum = (selectedTable) => {
  if (selectedTable >= 6 && selectedTable <= 15) {
    return "2-4";
  }
  return "6-8";
};

const BookingModal = ({
  isOpen,
  onClose,
  checkAllTablesReservation,
  selectedDateTime,
}) => {
  const [bookings, setBookings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/bookings?user=${username}`,
          {
            headers: {
              Authorization: `Bearer ${auth.currentUser.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (isOpen && username) {
      fetchBookings();
    }
  }, [isOpen, username]);

  const handleDeleteBooking = async (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/bookings/${selectedBookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.currentUser.accessToken}`,
        },
      });
      setBookings(
        bookings.filter((booking) => booking._id !== selectedBookingId)
      );
      checkAllTablesReservation(selectedDateTime);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
    setShowConfirmation(false);
    setSelectedBookingId(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setSelectedBookingId(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      className="fixed-center relative z-50 bg-white p-5 rounded-lg shadow-lg wide-modal"
    >
      <div className="flex min-h-full flex flex-col justify-center px-6 py-4">
        <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li
                key={booking._id}
                className={`mb-2 pb-2 ${index !== bookings.length - 1 ? "border-b-2" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <span className="font-medium">Table:</span>{" "}
                      {booking.tableNumber} ({seatsNum(booking.tableNumber)}{" "}
                      seats)
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {booking.reservedDate} (
                      {format(
                        new Date(
                          `${booking.reservedDate} ${booking.startTime}`
                        ),
                        "h:mm aa"
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(`${booking.reservedDate} ${booking.endTime}`),
                        "h:mm aa"
                      )}
                      )
                    </p>
                    <p>
                      <span className="font-medium">Package:</span>{" "}
                      {booking.selectedPackage}
                    </p>
                    <p>
                      <span className="font-medium">Payment Method:</span>{" "}
                      {booking.selectedPayment}
                    </p>
                  </div>
                  <div>
                    {!showConfirmation && selectedBookingId !== booking._id && (
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-700 focus:outline-none focus:shadow-outline transition-opacity duration-300"
                      >
                        Cancel
                      </button>
                    )}
                    {showConfirmation && selectedBookingId === booking._id && (
                      <div className="text-center">
                        <p className="pb-1 font-medium">Confirm?</p>
                        <button
                          onClick={confirmDelete}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-2xl ml-2 hover:bg-red-700 focus:outline-none focus:shadow-outline transition-opacity duration-300"
                        >
                          Yes
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="bg-green-500 text-white px-4 py-1.5 rounded-2xl ml-2 hover:bg-green-700 focus:outline-none focus:shadow-outline transition-opacity duration-300"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default BookingModal;
