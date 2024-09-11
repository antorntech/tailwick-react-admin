// HomeInfo.js
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

const HomeInfo = () => {
  // State variables
  const [homeInfos, setHomeInfos] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Fetch homeInfo data from the server
  const fetchHomeInfos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/homeInfos");
      const data = await response.json();
      setHomeInfos(data);
    } catch (error) {
      toast.error("Error fetching homeInfos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeInfos();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected homeInfo ID
  const openDeleteConfirmModal = (homeInfoId) => {
    setSelectedItemId(homeInfoId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/homeInfos/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("HomeInfo deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchHomeInfos(); // Refresh homeInfo list
        } else {
          toast.error("Failed to delete homeInfo");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the homeInfo");
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
          <h1 className="text-xl font-bold">HomeInfos</h1>
          <p className="text-sm text-gray-500">
            {homeInfos.length > 0
              ? "HomeInfos are available"
              : "No HomeInfo available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          {homeInfos.length < 1 ? (
            <Link to="/add-home-info">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                Add HomeInfo
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* HomeInfos List */}
      {homeInfos.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {/* Table Headers */}
                    {["Heading", "Sub Heading", "Content", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {homeInfos.map((homeInfo) => (
                    <tr key={homeInfo._id} className="hover:bg-gray-100">
                      {/* HomeInfo Data */}

                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">
                          {homeInfo.heading}
                        </h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {homeInfo.subheading}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {homeInfo.content.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {/* Popover for Category Actions */}
                          <Popover placement="bottom-end">
                            <PopoverHandler>
                              <button className="text-cyan-700 border-2 border-cyan-700 px-2 py-1 rounded-md text-sm hover:bg-cyan-700 hover:text-white transition-all duration-500">
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            </PopoverHandler>
                            <PopoverContent className="bg-gray-200 shadow-lg border-2 border-gray-300">
                              <Link
                                to={`/home-info/add-info-category/${homeInfo._id}`}
                              >
                                <button className="w-full flex items-center justify-center gap-1 text-green-700 border-2 border-green-700 px-2 py-1 rounded-md text-sm hover:bg-green-700 hover:text-white transition-all duration-500">
                                  Add Category
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </Link>
                              <hr className="py-1" />
                              <Link
                                to={`/home-info/view-info-category/${homeInfo._id}`}
                              >
                                <button className="w-full flex items-center justify-center gap-1 text-orange-500 border-2 border-orange-500 px-2 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white transition-all duration-500">
                                  View Category
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                              </Link>
                            </PopoverContent>
                          </Popover>
                          {/* Edit HomeInfo */}
                          <Link
                            to={`/home-info/edit-home-info/${homeInfo._id}`}
                          >
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          {/* Delete HomeInfo */}
                          <button
                            onClick={() => openDeleteConfirmModal(homeInfo._id)}
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
              {homeInfos.map((homeInfo) => (
                <div
                  key={homeInfo._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  {/* HomeInfo Details */}
                  <h1 className="text-xl font-bold mt-3">{homeInfo.heading}</h1>
                  <p className="text-sm text-gray-500">
                    {homeInfo.content.slice(0, 80)}...
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Popover for Category Actions */}
                    <Popover placement="bottom">
                      <PopoverHandler>
                        <button className="text-cyan-700 border-2 border-cyan-700 px-2 py-1 rounded-md text-sm hover:bg-cyan-700 hover:text-white transition-all duration-500">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-200 shadow-lg border-2 border-gray-300">
                        <Link
                          to={`/home-info/add-info-category/${homeInfo._id}`}
                        >
                          <button className="w-full flex items-center justify-center gap-1 text-green-700 border-2 border-green-700 px-2 py-1 rounded-md text-sm hover:bg-green-700 hover:text-white transition-all duration-500">
                            Add Category
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </Link>
                        <hr className="py-1" />
                        <Link
                          to={`/home-info/view-info-category/${homeInfo._id}`}
                        >
                          <button className="w-full flex items-center justify-center gap-1 text-orange-500 border-2 border-orange-500 px-2 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white transition-all duration-500">
                            View Category
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </Link>
                      </PopoverContent>
                    </Popover>
                    {/* Edit HomeInfo */}
                    <Link to={`/homeInfos/edit-homeInfo/${homeInfo._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete HomeInfo */}
                    <button
                      onClick={() => openDeleteConfirmModal(homeInfo._id)}
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
        message="Are you sure you want to delete this homeInfo? This action cannot be undone."
      />
    </div>
  );
};

export default HomeInfo;
