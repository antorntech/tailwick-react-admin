import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Profile = () => {
  const data = {
    name: "John Doe",
    designation: "Software Engineer",
    email: "admin@gmail.com",
    phone: "1234567890",
    address: "123 Main St, Anytown USA",
    avatar: "/img/avatar.png",
  };
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-gray-500">
            Profile details are {data ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/profile/add-profile"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
      {data ? (
        <>
          <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="w-full md:w-1/3 shadow-md rounded-md p-4 flex flex-col items-center">
              <img src={data.avatar} alt="" />
              <h1 className="text-xl font-bold">{data.name}</h1>
              <p className="text-sm text-gray-500">{data.designation}</p>
            </div>
            <div className="w-full md:w-2/3 shadow-md rounded-md p-4">
              <h1 className="text-xl font-bold mb-4">Contact Details</h1>
              <p className="text-gray-500 text-md">
                <span className="font-bold text-black">Email:</span>{" "}
                {data.email}
              </p>
              <hr className="my-2" />
              <p className="text-gray-500 text-md">
                <span className="font-bold text-black">Phone:</span>{" "}
                {data.phone}
              </p>
              <hr className="my-2" />
              <p className="text-gray-500 text-md">
                <span className="font-bold text-black">Address:</span>{" "}
                {data.address}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
