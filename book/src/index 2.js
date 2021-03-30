import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import Main from "Main";
// import Chapter from "Chapter";
 
// import chapter1Content from "chapter-jsons/chapter1.json";
// import chapter2Content from "chapter-jsons/chapter2.json";

var destination = document.querySelector("#container");
 
ReactDOM.render(
    <div>
        <Main/>
    </div>,
    destination
);