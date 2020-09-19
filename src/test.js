import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const Test = () => {
  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Router>
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>in home</h2>
    </>
  );
};

const About = () => {
  return (
    <>
      <h2>in about</h2>
    </>
  );
};
