import React from "react";
import "./App.css";
import "./styles/index.css";
import UserArea from "./UserArea.jsx";
import TableLayout from "./TableLayout.jsx";

function App() {
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
        <UserArea />
      </header>
      <TableLayout />
    </>
  );
}

export default App;
