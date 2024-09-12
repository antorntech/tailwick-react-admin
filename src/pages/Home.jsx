import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCustomerSay from "../components/HomeCustomerSay";
import { Avatar } from "@material-tailwind/react";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/blogs/recent")
      .then((response) => response.json())
      .then((data) => setLatestBlogs(data));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
      <div className="w-full lg:w-[70%]">
        <div>
          <div className="relative custom-shadow2">
            <img
              src="/img/admin-banner.jpg"
              alt=""
              className="rounded-md w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 bg-green-200 w-full h-full custom-blur rounded-md">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-5xl font-bold text-white">
                  Hi <span className="text-[#199bff]">Admin !</span>
                </h1>
                <p className="text-sm md:text-lg text-white text-center">
                  Welcome to Intelligent Systems & Solutions Limited
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <HomeCustomerSay />
        </div>
      </div>
      <div className="w-full lg:w-[30%] bg-white custom-shadow2 rounded-md flex flex-col items-center p-5">
        <div>
          <div className="w-[90px] h-[90px] rounded-full bg-[#050828] flex items-center justify-center">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="xl"
            />
            {/* <h1 className="text-4xl font-semibold text-white">AD</h1> */}
          </div>
          <div className="w-full text-center mt-1">
            <h2 className="text-xl font-bold">Mr. Admin</h2>
            <p className="text-sm text-gray-500">Admin, ISSL</p>
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Latest Blogs</p>
            <p className="text-sm text-[#199bff] hover:text-[#050828] transition-all duration-500">
              <Link to={"/blogs"}>View All</Link>
            </p>
          </div>
          {latestBlogs.map((blog) => (
            <div key={blog.id} className="w-full mt-5">
              <Link to={blog.link}>
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="w-[30%]">
                    <img
                      src={`http://localhost:8000/${blog.banner}`}
                      alt=""
                      className="w-full h-16 rounded-md"
                    />
                  </div>
                  <div className="w-[70%]">
                    <p className="text-sm font-bold">{blog.title}</p>
                    <p className="text-sm text-gray-500">
                      {blog.details.slice(0, 25)}...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
