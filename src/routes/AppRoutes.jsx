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
import AddSoftware from "../pages/AddSoftware";
import HomeContact from "../pages/HomeContact";
import MainContact from "../pages/MainContact";
import Sponsors from "../pages/Sponsors";
import AddSponsor from "../pages/AddSponsor";
import AddService from "../pages/AddService";
import Faqs from "../pages/Faqs";
import AddFaq from "../pages/AddFaq";

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
          <Route path="/main-contact" element={<MainContact />} />
          <Route path="/home-contact" element={<HomeContact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/add-service" element={<AddService />} />
          <Route path="/software" element={<Software />} />
          <Route path="/software/add-software" element={<AddSoftware />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/sponsors/add-sponsor" element={<AddSponsor />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/add-training" element={<AddTraining />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add-blog" element={<AddBlog />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/faqs/add-faq" element={<AddFaq />} />
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
