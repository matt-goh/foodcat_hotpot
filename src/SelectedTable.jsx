const SelectedTable = ({ selectedTable }) => {
  const seatsNum = (selectedTable) => {
    if (selectedTable >= 6 && selectedTable <= 15) {
      return "2-4";
    }
    return "6-8";
  };
  return (
    <label
      htmlFor="date"
      className="flex items-center justify-center rounded-md bg-yellow-50 px-4 py-1.5 font-medium text-orange ring-1 shadow-sm ring-inset ring-orange-300"
    >
      {`Table ${selectedTable} | ${seatsNum(selectedTable)} people`}
    </label>
  );
};

export default SelectedTable;
