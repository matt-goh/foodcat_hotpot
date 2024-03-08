import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { enGB } from "date-fns/locale";
import PackageType from "./PackageType.jsx";
import PaymentType from "./PaymentType.jsx";
import ReserveBtn from "./ReserveBtn.jsx";
import DatePicker from "react-datepicker";
import Table from "./Table";
import auth from "./firebase.js";

const TableLayout = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [userIsSignedIn] = useAuthState(auth);
  const nodeRef = useRef(null);
  const username = useSelector((state) => state.user.username);

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
    for (let hour = 18; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        options.push(time);
      }
    }
    return options;
  };

  useEffect(() => {
    // Set default date and time
    const initialDateTime = new Date();
    initialDateTime.setHours(18);
    initialDateTime.setMinutes(0);
    setSelectedDateTime(initialDateTime);
  }, []);

  // Handle date and time change
  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

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
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={2}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={3}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={4}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={5}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
        </div>
        <div className="flex mt-20">
          <Table
            tableNum={6}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={7}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={8}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={9}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={10}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
        </div>
        <div className="border-t-2 ml-4 mr-4"></div>
        <div className="flex">
          <Table
            tableNum={11}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={12}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={13}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={14}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={15}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
        </div>
        <div className="flex mt-20 mb-4">
          <Table
            tableNum={16}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={17}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={18}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={19}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={20}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
            selectedDateTime={selectedDateTime}
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
                  username={username}
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
