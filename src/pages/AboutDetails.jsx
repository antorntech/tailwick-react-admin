import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";

const AboutDetails = () => {
  // State variables
  const [aboutDetails, setAboutDetails] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Fetch slider data from the server
  const fetchAboutDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/aboutdetails");
      const data = await response.json();
      setAboutDetails(data);
    } catch (error) {
      toast.error("Error fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutDetails();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected slider ID
  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/aboutdetails/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("AboutDetails deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchAboutDetails(); // Refresh slider list
        } else {
          toast.error("Failed to delete data");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the data");
      }
    }
  };

  // Toggle between table and grid layout
  const toggleLayout = () => setIsTableLayout(!isTableLayout);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">About Details</h1>
          <p className="text-sm text-gray-500">
            {aboutDetails.length > 0
              ? "AboutDetails are available"
              : "No aboutDetails available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          {aboutDetails.length < 1 ? (
            <Link to="/about-details/add-about-details">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                Add About Details
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* AboutDetails List */}
      {aboutDetails.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Banner
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
                  {aboutDetails.map((slider) => (
                    <tr key={slider._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        <img
                          src={`http://localhost:8000/${slider.banner}`}
                          alt={slider.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{slider.title}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {slider.details.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-2">
                          <Link
                            to={`/about-details/edit-about-details/${slider._id}`}
                          >
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          <button
                            onClick={() => openDeleteConfirmModal(slider._id)}
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
              {aboutDetails.map((slider) => (
                <div
                  key={slider._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  {/* AboutDetails Image */}
                  <img
                    src={`http://localhost:8000/${slider.banner}`}
                    alt={slider.title}
                    className="w-full h-full md:h-[250px] object-cover rounded"
                  />
                  {/* AboutDetails Details */}
                  <h1 className="text-xl font-bold mt-3">{slider.title}</h1>
                  <p className="text-sm text-gray-500">
                    {slider.details.slice(0, 80)}...
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Edit AboutDetails */}
                    <Link to={`/aboutDetails/edit-slider/${slider._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete AboutDetails */}
                    <button
                      onClick={() => openDeleteConfirmModal(slider._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        message="Are you sure you want to delete this slider? This action cannot be undone."
      />
    </div>
  );
};

export default AboutDetails;
