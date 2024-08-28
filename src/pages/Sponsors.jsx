import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import Loader from "../loader/Loader";

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      name: "Sponsor 1",
      logo: "/img/sponsors/sponsor-1.png",
    },
    {
      id: 2,
      name: "Sponsor 2",
      logo: "/img/sponsors/sponsor-2.png",
    },
    {
      id: 3,
      name: "Sponsor 3",
      logo: "/img/sponsors/sponsor-3.png",
    },
    {
      id: 4,
      name: "Sponsor 4",
      logo: "/img/sponsors/sponsor-4.png",
    },
    {
      id: 5,
      name: "Sponsor 5",
      logo: "/img/sponsors/sponsor-5.png",
    },
    {
      id: 6,
      name: "Sponsor 6",
      logo: "/img/sponsors/sponsor-6.png",
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
  const currentItems = sponsors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sponsors.length / itemsPerPage);

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
          {/* Table UI */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Sponsors</h1>
              <p className="text-sm text-gray-500">
                All sponsors are {sponsors ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/sponsors/add-sponsor"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Sponsor
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Logo
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((sponsor) => (
                  <tr key={sponsor.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b text-sm">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-[50px] h-[50px]"
                      />
                    </td>
                    <td className="px-6 py-4 border-b">
                      <h1 className="text-sm font-bold">{sponsor.name}</h1>
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      <div className="flex gap-3">
                        <Link to={`/sponsors/edit/${sponsor.id}`}>
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
          {/* Pagination */}
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
              <i className="fa-solid fa-angle-left"></i>
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
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Sponsors</h1>
              <p className="text-sm text-gray-500">
                All sponsors are {sponsors ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/sponsors/add-sponsor"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Sponsor
                </button>
              </Link>
            </div>
          </div>
          {sponsors ? (
            <>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {currentItems.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="w-full flex flex-col shadow-md rounded-md p-3"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-[100px] h-[100px] mx-auto"
                    />
                    <div className="flex justify-center gap-3 mt-3">
                      <Link to={`/sponsors/edit/${sponsor.id}`}>
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

export default Sponsors;
