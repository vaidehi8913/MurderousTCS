import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ClickableKite from "./ClickableKite";
 
var destination = document.querySelector("#container");
 
ReactDOM.render(
    <div>
        <ClickableKite/>
    </div>,
    destination
);