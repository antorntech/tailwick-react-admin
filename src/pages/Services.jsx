import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Services = () => {
  const [data, setData] = React.useState(null);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Services</h1>
          <p className="text-sm text-gray-500">
            All services are {data ? "" : "not"} available here.
          </p>
        </div>
        <div>
          {!data ? (
            <Link to={"/add-service"}>
              <button className="bg-[#F71869] text-white px-4 py-2 rounded-md">
                Add Service
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {data ? <></> : <Loader />}
    </div>
  );
};

export default Services;
