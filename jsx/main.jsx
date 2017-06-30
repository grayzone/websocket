import React from "react";
import ReactDOM from "react-dom";
import Template from "./lib/template";
import Welcome from "./lib/welcome";
import WebSocketPage from "./lib/websocket";

var TemplateDIV = document.getElementById("template");
if (TemplateDIV != null) {
  ReactDOM.render(<Template />, TemplateDIV);
}

var WelcomeDIV = document.getElementById("welcome");
if (WelcomeDIV != null) {
  ReactDOM.render(<Welcome />, WelcomeDIV);
}

var WebSocketDIV = document.getElementById("websocket");
if (WebSocketDIV != null) {
  console.log("show web socket page.");
  ReactDOM.render(<WebSocketPage />, WebSocketDIV);
}
