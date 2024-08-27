import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Slider from "../pages/Slider";
import Software from "../pages/Software";
import Training from "../pages/Training";
import Services from "../pages/Services";
import MainAbout from "../pages/MainAbout";
import HomeAbout from "../pages/HomeAbout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddBlog from "../pages/AddBlog";
import AddSlider from "../pages/AddSlider";
import AddTraining from "../pages/AddTraining";

const AppRoutes = () => {
  const user = localStorage.getItem("email");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/slider/add-slider" element={<AddSlider />} />
          <Route path="/main-about" element={<MainAbout />} />
          <Route path="/home-about" element={<HomeAbout />} />
          <Route path="/services" element={<Services />} />
          <Route path="/software" element={<Software />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/add-training" element={<AddTraining />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add-blog" element={<AddBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
