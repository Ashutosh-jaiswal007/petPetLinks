import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import HooksTimeline from "./components/home.js";
import { Singlepost } from "./components/singlepost.js";
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import Userlogin from "./components/hookslogin.js";
import { Register } from "./components/register.js";

export const RootComponent = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Userlogin} />
        <Route path="/home" component={HooksTimeline} />
        <Route path="/singlepost:userid" component={Singlepost} />
      </Router>
      <Footer />
    </>
  );
};
