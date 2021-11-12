import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "antd/dist/antd.css";
import "./assets/css/_main.scss";
import Store from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
