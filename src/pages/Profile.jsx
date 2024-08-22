import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Profile = () => {
  const [data, setData] = React.useState(null);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-gray-500">
            Profile details are {data ? "" : "not"} available here.
          </p>
        </div>
        <div>
          {!data ? (
            <Link to={"/add-slider"}>
              <button className="bg-[#F71869] text-white px-4 py-2 rounded-md">
                Update Profile
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {data ? <></> : <Loader />}
    </div>
  );
};

export default Profile;
