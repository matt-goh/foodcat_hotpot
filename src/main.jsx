import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";
import store from "./store";
import App from "./App.jsx";
import "./styles/index.css";

// Function to check if the device is a mobile
const isMobileDevice = () => {
  return window.innerWidth <= 930;
};

// Render either the app or the message based on screen width px
const renderApp = () => {
  if (isMobileDevice()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          className="w-24 mb-4"
          src="src/assets/cathotpot.jpg"
          alt="FoodCat Hotpot"
        />
        <h1 className="text-2xl font-bold leading-9 text-center">
          <p>This website was designed only for desktop screens.</p>
          <p>Please open it on your PC or laptop.</p>
        </h1>
      </div>
    );
  } else {
    return (
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(renderApp());
