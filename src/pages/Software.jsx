import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Software = () => {
  const [data, setData] = React.useState(null);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Software</h1>
          <p className="text-sm text-gray-500">
            All software are {data ? "" : "not"} available here.
          </p>
        </div>
        <div>
          {!data ? (
            <Link to={"/add-software"}>
              <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
                Add Software
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {data ? <></> : <Loader />}
    </div>
  );
};

export default Software;
