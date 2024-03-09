import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { enGB } from "date-fns/locale";
import PackageType from "./PackageType.jsx";
import PaymentType from "./PaymentType.jsx";
import ReserveBtn from "./ReserveBtn.jsx";
import DatePicker from "react-datepicker";
import Table from "./Table";
import auth from "./firebase.js";

const TableLayout = () => {
  const [isTableReserved, setIsTableReserved] = useState(Array(20).fill(false));
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [userIsSignedIn] = useAuthState(auth);
  const nodeRef = useRef(null);

  const handleSelectTable = (tableNum) => {
    // Toggle the selected state if the same table is clicked again
    setSelectedTable((prevSelectedTable) =>
      prevSelectedTable === tableNum ? null : tableNum
    );
  };

  const handleLayoutClick = (event) => {
    // Check if the click occurred outside of any table
    if (!event.target.closest("#table")) {
      setSelectedTable(null);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 18; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        options.push(time);
      }
    }
    return options;
  };

  // Handle date and time change
  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const checkTableReservation = async (tableNum, dateTime) => {
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
      const response = await fetch(
        `http://localhost:3000/api/reservations?tableNumber=${tableNum}&reservedDate=${formattedDate}&startTime=${formattedTime}&endTime=${formattedEndTime}`
      );

      if (response.ok) {
        const reservationData = await response.json();
        setIsTableReserved((prevState) => {
          const updatedState = [...prevState];
          updatedState[tableNum - 1] = reservationData;
          return updatedState;
        });
      } else {
        throw new Error("Error checking table reservation");
      }
    } catch (error) {
      console.error("Error checking table reservation: ", error);
    }
  };

  const checkAllTablesReservation = async (dateTime) => {
    for (let i = 0; i < 20; i++) {
      await checkTableReservation(i + 1, dateTime);
    }
  };

  useEffect(() => {
    // Set default date and time
    const initialDateTime = new Date();

    // Set date to the latest date
    initialDateTime.setFullYear(new Date().getFullYear());
    initialDateTime.setMonth(new Date().getMonth());
    initialDateTime.setDate(new Date().getDate());

    // Set time to 18:00
    initialDateTime.setHours(18);
    initialDateTime.setMinutes(0);
    setSelectedDateTime(initialDateTime);

    checkAllTablesReservation(initialDateTime);
  }, []);

  useEffect(() => {
    checkAllTablesReservation(selectedDateTime);
  }, [selectedDateTime]);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      ref={ref}
      className="flex items-center justify-center mt-2 w-full px-3.5 py-2 cursor-default border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm transition-all"
      onClick={(e) => {
        onClick(e);
        e.preventDefault();
      }}
    >
      {value}
    </button>
  ));

  return (
    <div className="flex mt-12">
      <div className="border-r-2" onClick={handleLayoutClick}>
        <div className="flex mt-4">
          <Table
            tableNum={1}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[0]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={2}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[1]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={3}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[2]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={4}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[3]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={5}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[4]}
          />
        </div>
        <div className="flex mt-20">
          <Table
            tableNum={6}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[5]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={7}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[6]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={8}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[7]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={9}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[8]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={10}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[9]}
          />
        </div>
        <div className="border-t-2 ml-4 mr-4"></div>
        <div className="flex">
          <Table
            tableNum={11}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[10]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={12}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[11]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={13}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[12]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={14}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[13]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={15}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[14]}
          />
        </div>
        <div className="flex mt-20 mb-4">
          <Table
            tableNum={16}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[15]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={17}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[16]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={18}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[17]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={19}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[18]}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={20}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            isTableReserved={isTableReserved[19]}
          />
        </div>
      </div>
      <div className="2xl:min-w-96 xl:min-w-80 lg:min-w-72 md:min-w-64 sm:min-w-60 m-4 ">
        <div className="flex flex-col items-center justify-center pb-6 border-b-2">
          <label
            htmlFor="date"
            className="flex items-center justify-center block text-sm font-medium leading-6 text-gray-900"
          >
            Date & Time:
          </label>
          <DatePicker
            id="Date"
            selected={selectedDateTime}
            closeOnScroll={true}
            minDate={new Date()}
            onChange={handleDateTimeChange}
            dateFormat="yyyy-MM-dd | h:mm aa"
            timeFormat="h:mm aa"
            timeIntervals={30}
            showTimeSelect
            locale={enGB}
            includeTimes={generateTimeOptions()}
            customInput={<CustomInput />}
          />
        </div>
        <CSSTransition
          in={selectedTable !== null}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <div className="mt-6" ref={nodeRef}>
            {selectedTable && (
              <>
                <PackageType selectedTable={selectedTable} />
                <PaymentType />
                <ReserveBtn
                  selectedTable={selectedTable}
                  selectedDateTime={selectedDateTime}
                  checkAllTablesReservation={checkAllTablesReservation}
                />
              </>
            )}
          </div>
        </CSSTransition>
        {!selectedTable && (
          <CSSTransition
            in={selectedTable == null}
            timeout={300}
            classNames="fade"
          >
            <div className="flex items-center justify-center mt-6 text-base font-semibold leading-7 text-gray-900">
              {userIsSignedIn
                ? "Please select a table to reserve."
                : "Please sign in and select a table to reserve."}
            </div>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default TableLayout;
