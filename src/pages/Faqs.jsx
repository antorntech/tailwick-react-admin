import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Faqs = () => {
  const faqs = [
    {
      id: 1,
      question: "What is the ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 2,
      question: "How do I get ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 3,
      question: "How can we buy and invest in ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 4,
      question: "Where can we buy and sell ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 5,
      question: "Who are the team behind the project?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 6,
      question: "Where can we buy and sell ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
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
  const currentItems = faqs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);

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
              <h1 className="text-xl font-bold">Faqs</h1>
              <p className="text-sm text-gray-500">
                All faqa are {faqs ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/faqs/add-faq"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Faq
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Question
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Answer
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b">
                      <h1 className="text-sm font-bold">{faq.question}</h1>
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-500">
                      {faq.answer.slice(0, 80)}...
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      <div className="flex gap-3">
                        <Link to={`/faqs/edit/${faq.id}`}>
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
              <h1 className="text-xl font-bold">Faqs</h1>
              <p className="text-sm text-gray-500">
                All faqa are {faqs ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/faqs/add-faq"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Faq
                </button>
              </Link>
            </div>
          </div>
          {faqs ? (
            <>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="w-full flex flex-col shadow-md rounded-md p-3"
                  >
                    <h1 className="text-xl font-bold mt-3">{faq.question}</h1>
                    <p className="text-sm text-gray-500">
                      {faq.answer.slice(0, 80)}...
                    </p>
                    <div className="flex gap-3 mt-3">
                      <Link to={`/faqs/edit/${faq.id}`}>
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

export default Faqs;
