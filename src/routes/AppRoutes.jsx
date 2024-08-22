import React from "react";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Slider from "../pages/Slider";
import Software from "../pages/Software";
import Training from "../pages/Training";
import Services from "../pages/Services";
import MainAbout from "../pages/MainAbout";
import HomeAbout from "../pages/HomeAbout";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/main-about" element={<MainAbout />} />
        <Route path="/home-about" element={<HomeAbout />} />
        <Route path="/services" element={<Services />} />
        <Route path="/software" element={<Software />} />
        <Route path="/training" element={<Training />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
