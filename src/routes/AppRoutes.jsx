import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import HomeAbout from "../pages/HomeAbout";
import MainAbout from "../pages/MainAbout";
import Services from "../pages/Services";
import Training from "../pages/Training";
import Blogs from "../pages/Blogs";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main-about" element={<MainAbout />} />
        <Route path="/home-about" element={<HomeAbout />} />
        <Route path="/services" element={<Services />} />
        <Route path="/training" element={<Training />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
