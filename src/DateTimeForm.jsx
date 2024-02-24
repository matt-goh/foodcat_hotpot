import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

const DateTimeForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

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
    <div>
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
  );
};

export default DateTimeForm;
