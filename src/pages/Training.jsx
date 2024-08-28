import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Training = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [layout, setLayout] = useState(true);

  const handleLayout = () => setLayout(!layout);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const trainings = [
    {
      id: 1,
      title: "Responsive Website Development",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training1.jpg",
    },
    {
      id: 2,
      title: "Mobile App Development with Flutter",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training2.jpg",
    },
    {
      id: 3,
      title: "Cloud Computing Consultancy",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training3.jpg",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trainings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(trainings.length / itemsPerPage);

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
    <div>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Training</h1>
          <p className="text-sm text-gray-500">
            All training are {trainings ? "" : "not"} available here.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={handleLayout}
          >
            Change Layout
          </button>
          <Link to={"/training/add-training"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Training
            </button>
          </Link>
        </div>
      </div>
      {trainings ? (
        <>
          {layout ? (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
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
                  {currentItems.map((training) => (
                    <tr key={training.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{training.title}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {training.details.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-3">
                          <Link to={`/training/edit/${training.id}`}>
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
          ) : (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentItems.map((training) => (
                <div
                  key={training.id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  <img
                    src={training.banner}
                    alt={training.title}
                    className="w-full h-full md:h-[250px]"
                  />
                  <h1 className="text-xl font-bold mt-3">{training.title}</h1>
                  <p className="text-sm text-gray-500">
                    {training.details.slice(0, 80)}...
                  </p>
                  <div className="flex gap-3 mt-3">
                    <Link to={`/training/edit/${training.id}`}>
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
          )}
          <DeleteConfirmModal open={open} handleOpen={handleOpen} />

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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Training;
