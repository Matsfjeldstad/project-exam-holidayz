import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./utils/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
