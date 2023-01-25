import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Signin />; 
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/home" element={<Private Item={Home} />}></Route>
            <Route exact path="/" element={<Signin />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/*" element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
