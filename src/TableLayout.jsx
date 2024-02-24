import Table from "./Table";
import { useState } from "react";

const TableLayout = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectTable = (tableNum) => {
    // Toggle the selected state if the same table is clicked again
    setSelectedTable((prevSelectedTable) =>
      prevSelectedTable === tableNum ? null : tableNum
    );
  };

  return (
    <div className="border-r-2">
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
  );
};

export default TableLayout;
