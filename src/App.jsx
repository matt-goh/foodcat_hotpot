import "react-datepicker/dist/react-datepicker.css";
import React, { Fragment, useState, useRef } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { CSSTransition } from "react-transition-group";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { enGB } from "date-fns/locale";
import ReserveBtn from "./ReserveBtn.jsx";
import DatePicker from "react-datepicker";
import UserArea from "./UserArea.jsx";
import Table from "./Table.jsx";
import auth from "./firebase.js";
import "./styles/index.css";
import "./styles/App.css";

const packages = [
  {
    id: 1,
    package: "Exotic Shorthair",
    avatar: "src/assets/exotic-shorthair-cat.png",
    description: "Wagyu, Seafood, Pork and Chicken",
    adultPrice: 79,
    childPrice: 59,
  },
  {
    id: 2,
    package: "British Shorthair",
    avatar: "src/assets/british-shorthair-cat.png",
    description: "Seafood, Beef, Pork and Chicken",
    adultPrice: 59,
    childPrice: 39,
  },
  {
    id: 3,
    package: "Scottish Fold",
    avatar: "src/assets/scottish-fold-cat.png",
    description: "Seafood, Pork and Chicken",
    adultPrice: 49,
    childPrice: 29,
  },
];

const PaymentTypes = [
  {
    id: 1,
    payment: "Cash",
    avatar: "src/assets/banknote.png",
  },
  {
    id: 2,
    payment: "Online Payment",
    avatar: "src/assets/bank.png",
  },
];

const seatsNum = (selectedTable) => {
  if (selectedTable >= 6 && selectedTable <= 15) {
    return "2-4";
  }
  return "6-8";
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const App = () => {
  const [isTableReserved, setIsTableReserved] = useState(Array(20).fill(false));
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [paymentSelected, setPaymentSelected] = useState(PaymentTypes[0]);
  const [selected, setSelected] = useState(packages[1]);
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
    <>
      <header className="flex justify-around shadow">
        <div className="flex items-center">
          <a href="/index.html" className="block w-1/12">
            <img
              className="w-full h-full block w-1/12"
              src="src\assets\cathotpot.jpg"
              alt="FoodCat Hotpot"
            />
          </a>
          <a href="/index.html">
            <h1 className="ml-4 text-2xl font-bold leading-9 tracking-tight">
              FoodCat Hotpot
            </h1>
          </a>
        </div>
        <UserArea
          checkAllTablesReservation={checkAllTablesReservation}
          selectedDateTime={selectedDateTime}
        />
      </header>
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
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <div className="flex flex-col mt-4 justify-center rounded-md bg-yellow-50 px-4 py-1.5 font-medium text-orange ring-1 shadow-sm ring-inset ring-orange-300">
                          <span className="text-lg flex items-center justify-center py-1">
                            {`Table ${selectedTable} | ${seatsNum(selectedTable)} people`}
                          </span>
                        </div>
                        <Listbox.Label className="block mt-4 text-sm font-medium leading-6 text-gray-900">
                          Package Type:
                        </Listbox.Label>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <img
                                src={selected.avatar}
                                alt=""
                                className="h-5 w-5"
                              />
                              <span className="ml-3 block truncate">
                                {selected.package}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition transform duration-300 ease-out"
                            enterFrom="scale-95 opacity-0"
                            enterTo="scale-100 opacity-100"
                            leave="transition transform duration-200 ease-in"
                            leaveFrom="scale-100 opacity-100"
                            leaveTo="scale-95 opacity-0"
                          >
                            <Listbox.Options className="absolute w-full z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {packages.map((item) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-orange text-white"
                                        : "text-gray-900",
                                      "relative cursor-default select-none py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={item}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <img
                                          src={item.avatar}
                                          alt=""
                                          className="h-5 w-5"
                                        />
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block truncate"
                                          )}
                                        >
                                          {item.package}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-orange",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                          <div className="flex flex-col mt-4 justify-center rounded-md bg-yellow-50 px-4 py-1.5 font-medium text-orange ring-1 shadow-sm ring-inset ring-orange-300">
                            <span className="py-1 border-b-2 border-orange-100">
                              {selected.description}
                              <br></br>
                            </span>
                            RM {selected.adultPrice} - Adult Price (Over 140cm)
                            <br></br>RM {selected.childPrice} - Child Price
                            (120cm - 140cm)
                          </div>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <Listbox
                    value={paymentSelected}
                    onChange={setPaymentSelected}
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block mt-4 text-sm font-medium leading-6 text-gray-900">
                          Payment Type:
                        </Listbox.Label>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <img
                                src={paymentSelected.avatar}
                                alt=""
                                className="h-5 w-5"
                              />
                              <span className="ml-3 block truncate">
                                {paymentSelected.payment}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition transform duration-300 ease-out"
                            enterFrom="scale-95 opacity-0"
                            enterTo="scale-100 opacity-100"
                            leave="transition transform duration-200 ease-in"
                            leaveFrom="scale-100 opacity-100"
                            leaveTo="scale-95 opacity-0"
                          >
                            <Listbox.Options className="absolute w-full z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {PaymentTypes.map((item) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-orange text-white"
                                        : "text-gray-900",
                                      "relative cursor-default select-none py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={item}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <img
                                          src={item.avatar}
                                          alt=""
                                          className="h-5 w-5"
                                        />
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block truncate"
                                          )}
                                        >
                                          {item.payment}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-orange",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <ReserveBtn
                    selectedTable={selectedTable}
                    selectedDateTime={selectedDateTime}
                    selectedPackage={selected.package}
                    selectedPayment={paymentSelected.payment}
                    checkAllTablesReservation={checkAllTablesReservation}
                    resetSelectedTable={setSelectedTable}
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
    </>
  );
};

export default App;
