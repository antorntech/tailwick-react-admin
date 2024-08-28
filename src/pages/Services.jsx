import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Skill Development Training",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/7.jpg",
    },
    {
      id: 2,
      title: "Internet of Things",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/8.jpg",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/9.jpg",
    },
    {
      id: 4,
      title: "Research & Development",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/10.jpg",
    },
    {
      id: 5,
      title: "Blockchain Application",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/11.jpg",
    },
    {
      id: 6,
      title: "Software Development",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      banner: "/img/services/12.jpg",
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [layout, setLayout] = useState(true);

  const handleLayout = () => setLayout(!layout);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {layout ? (
        <div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Services</h1>
              <p className="text-sm text-gray-500">
                All services are {services ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/services/add-service"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Service
                </button>
              </Link>
            </div>
          </div>

          {currentItems ? (
            <>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                        Image
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                        Details
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b">
                          <img
                            src={service.banner}
                            alt={service.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 border-b">
                          <h1 className="text-sm font-bold">{service.title}</h1>
                        </td>
                        <td className="hidden md:block px-6 py-4 border-b text-sm text-gray-500">
                          {service.details.slice(0, 80)}...
                        </td>
                        <td className="px-6 py-4 border-b text-sm">
                          <div className="flex gap-3">
                            <Link to={`/service/edit/${service.id}`}>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <DeleteConfirmModal open={open} handleOpen={handleOpen} />
            </>
          ) : (
            <Loader />
          )}

          {/* Enhanced Pagination */}
          <div className="flex justify-center mt-5">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i class="fa-solid fa-angle-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Services</h1>
              <p className="text-sm text-gray-500">
                All services are {services ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/services/add-service"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Service
                </button>
              </Link>
            </div>
          </div>
          {services ? (
            <>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="w-full flex flex-col shadow-md rounded-md p-3"
                  >
                    <img
                      src={service.banner}
                      alt={service.title}
                      className="w-full h-full md:h-[250px]"
                    />
                    <h1 className="text-xl font-bold mt-3">{service.title}</h1>
                    <p className="text-sm text-gray-500">
                      {service.details.slice(0, 80)}...
                    </p>
                    <div className="flex gap-3 mt-3">
                      <Link to={`/service/edit/${service.id}`}>
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
      )}
    </>
  );
};

export default Services;
