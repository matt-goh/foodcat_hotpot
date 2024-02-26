import Table from "./Table";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import DateTimeForm from "./DateTimeForm.jsx";
import PackageType from "./PackageType.jsx";
import PaymentType from "./PaymentType.jsx";
import ReserveBtn from "./ReserveBtn.jsx";

const TableLayout = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const nodeRef = useRef(null);
  // const [isSignedIn, setIsSignedIn] = useState(false);

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

  return (
    <div className="flex mt-12">
      <div className="border-r-2" onClick={handleLayoutClick}>
        <div className="flex mt-4">
          <Table
            tableNum={1}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={2}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={3}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={4}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={5}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
        </div>
        <div className="flex mt-20">
          <Table
            tableNum={6}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={7}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={8}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={9}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={10}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
        </div>
        <div className="border-t-2 ml-4 mr-4"></div>
        <div className="flex">
          <Table
            tableNum={11}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={12}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={13}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={14}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={15}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
        </div>
        <div className="flex mt-20 mb-4">
          <Table
            tableNum={16}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={17}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={18}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={19}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
          <div className="border-r-2"></div>
          <Table
            tableNum={20}
            selectedTable={selectedTable}
            onSelectTable={handleSelectTable}
          />
        </div>
      </div>
      <div className="w-4/6 m-4">
        <div className="flex items-center justify-center pb-6 border-b-2">
          <DateTimeForm />
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
                <ReserveBtn/>
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
              Please select a table to reserve.
            </div>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default TableLayout;
