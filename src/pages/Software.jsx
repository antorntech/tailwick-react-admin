import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Software = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const softwares = [
    {
      id: 1,
      title: "University Project Management System",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/13.jpg",
    },
    {
      id: 2,
      title: "Hotel Project Management System",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/14.jpg",
    },
    {
      id: 3,
      title: "Payroll Project Management System",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/15.jpg",
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Software</h1>
          <p className="text-sm text-gray-500">
            All software are {softwares ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/software/add-software"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
              Add Software
            </button>
          </Link>
        </div>
      </div>
      {softwares ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {softwares.map((software) => (
              <div
                key={software.id}
                className="w-full flex flex-col shadow-md rounded-md p-3"
              >
                <img
                  src={software.banner}
                  alt={software.title}
                  className="w-full h-full md:h-[250px]"
                />
                <h1 className="text-xl font-bold mt-3">{software.title}</h1>
                <p className="text-sm text-gray-500">
                  {software.details.slice(0, 80)}...
                </p>
                <div className="flex gap-3 mt-3">
                  <Link to={`/software/edit/${software.id}`}>
                    <button className="bg-orange-800 text-white px-4 py-1 rounded-md text-sm">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={handleOpen}
                    className="bg-red-800 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <DeleteConfirmModal open={open} handleOpen={handleOpen} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Software;
