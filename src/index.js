import React from "react";

import ReactDOM from "react-dom";

import App from "./app/App";

const $app = document.querySelector("#root");

ReactDOM[$app.hasChildNodes() ? "hydrate" : "render"](
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>
    $app,
);
