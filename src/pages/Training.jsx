// Training.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

const Training = () => {
  // State variables
  const [trainings, setTrainings] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch training data from the server
  const fetchTrainings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/trainings");
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      toast.error("Error fetching trainings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected training ID
  const openDeleteConfirmModal = (trainingId) => {
    setSelectedTrainingId(trainingId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedTrainingId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/trainings/delete/${selectedTrainingId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Training deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchTrainings(); // Refresh training list
        } else {
          toast.error("Failed to delete training");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the training");
      }
    }
  };

  // Toggle between table and grid layout
  const toggleLayout = () => setIsTableLayout(!isTableLayout);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trainings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trainings.length / itemsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Trainings</h1>
          <p className="text-sm text-gray-500">
            {trainings.length > 0
              ? "Trainings are available"
              : "No trainings available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          <Link to="/trainings/add-training">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Training
            </button>
          </Link>
        </div>
      </div>

      {/* Trainings List */}
      {trainings.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {/* Table Headers */}
                    {[
                      "Banner",
                      "Title",
                      "Details",
                      "Author",
                      "Date",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((training) => (
                    <tr key={training._id} className="hover:bg-gray-100">
                      {/* Training Data */}
                      <td className="px-6 py-4 border-b">
                        <img
                          src={`http://localhost:8000/${training.banner}`}
                          alt={training.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{training.title}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {training.details.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {training.author}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {training.date}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {/* Popover for Module Actions */}
                          <Popover placement="bottom-end">
                            <PopoverHandler>
                              <button className="text-cyan-700 border-2 border-cyan-700 px-2 py-1 rounded-md text-sm hover:bg-cyan-700 hover:text-white transition-all duration-500">
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            </PopoverHandler>
                            <PopoverContent className="bg-gray-200 shadow-lg border-2 border-gray-300">
                              <Link
                                to={`/trainings/add-module/${training._id}`}
                              >
                                <button className="w-full flex items-center justify-center gap-1 text-green-700 border-2 border-green-700 px-2 py-1 rounded-md text-sm hover:bg-green-700 hover:text-white transition-all duration-500">
                                  Add Module
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </Link>
                              <hr className="py-1" />
                              <Link
                                to={`/trainings/view-module/${training._id}`}
                              >
                                <button className="w-full flex items-center justify-center gap-1 text-orange-500 border-2 border-orange-500 px-2 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white transition-all duration-500">
                                  View Module
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                              </Link>
                            </PopoverContent>
                          </Popover>
                          {/* Edit Training */}
                          <Link to={`/trainings/edit-training/${training._id}`}>
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          {/* Delete Training */}
                          <button
                            onClick={() => openDeleteConfirmModal(training._id)}
                            className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Grid Layout
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentItems.map((training) => (
                <div
                  key={training._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  {/* Training Image */}
                  <img
                    src={`http://localhost:8000/${training.banner}`}
                    alt={training.title}
                    className="w-full h-full md:h-[250px] object-cover rounded"
                  />
                  {/* Training Details */}
                  <h1 className="text-xl font-bold mt-3">{training.title}</h1>
                  <p className="text-sm text-gray-500">
                    {training.details.slice(0, 80)}...
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Popover for Module Actions */}
                    <Popover placement="bottom">
                      <PopoverHandler>
                        <button className="text-cyan-700 border-2 border-cyan-700 px-2 py-1 rounded-md text-sm hover:bg-cyan-700 hover:text-white transition-all duration-500">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-200 shadow-lg border-2 border-gray-300">
                        <Link to={`/trainings/add-module/${training._id}`}>
                          <button className="w-full flex items-center justify-center gap-1 text-green-700 border-2 border-green-700 px-2 py-1 rounded-md text-sm hover:bg-green-700 hover:text-white transition-all duration-500">
                            Add Module
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </Link>
                        <hr className="py-1" />
                        <Link to={`/trainings/view-module/${training._id}`}>
                          <button className="w-full flex items-center justify-center gap-1 text-orange-500 border-2 border-orange-500 px-2 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white transition-all duration-500">
                            View Module
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </Link>
                      </PopoverContent>
                    </Popover>
                    {/* Edit Training */}
                    <Link to={`/trainings/edit-training/${training._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete Training */}
                    <button
                      onClick={() => openDeleteConfirmModal(training._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-5">
            {/* Previous Page Button */}
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

            {/* Page Numbers */}
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

            {/* Next Page Button */}
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
        </>
      ) : (
        <Loader />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={openDeleteModal}
        handleOpen={toggleDeleteModal}
        onDelete={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this training? This action cannot be undone."
      />
    </div>
  );
};

export default Training;
