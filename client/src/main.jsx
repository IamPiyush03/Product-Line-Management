import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";  // ✅ Corrected import
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" />  {/* ✅ Corrected component */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
