import React from "react";
import "./App.css";
import "./styles/index.css";
import LoginForm from "./LoginForm.jsx";
import TableLayout from "./TableLayout.jsx";

function App() {
  return (
    <>
      <header className="flex justify-around shadow">
        <div className="flex items-center">
          <a href="/index.html" className="block w-1/12">
            <img
              className="w-full h-full"
              src="src\assets\cathotpot.jpg"
              alt="FoodCat Hotpot"
            />
          </a>
          <h1 className="ml-4 text-2xl font-bold leading-9 tracking-tight">
            FoodCat Hotpot
          </h1>
        </div>
        <LoginForm />
      </header>
      <TableLayout />
    </>
  );
}

export default App;
