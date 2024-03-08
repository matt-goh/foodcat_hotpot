import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";
import store from "./store";
import App from "./App.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
