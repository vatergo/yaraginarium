import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

ReactDOM.render(
  <Router basename={"/"}>
    <Layout />
  </Router>,
  document.getElementById("mount-point")
);
