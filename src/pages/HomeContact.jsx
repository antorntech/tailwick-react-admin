import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const HomeContact = () => {
  const [data, setData] = React.useState(null);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Home Contact</h1>
          <p className="text-sm text-gray-500">
            All home contact are {data ? "" : "not"} available here.
          </p>
        </div>
        <div>
          {!data ? (
            <Link to={"/contact/add-home-contact"}>
              <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
                Add Details
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {data ? <></> : <Loader />}
    </div>
  );
};

export default HomeContact;
