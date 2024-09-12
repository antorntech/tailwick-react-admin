import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";

const MainContact = () => {
  // State variables
  const [mainContacts, setMainContacts] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Fetch maincontact data from the server
  const fetchMainContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/maincontacts");
      const data = await response.json();
      setMainContacts(data);
    } catch (error) {
      toast.error("Error fetching main contacts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMainContacts();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected maincontact ID
  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/mainContacts/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Data deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchMainContacts(); // Refresh maincontact list
        } else {
          toast.error("Failed to delete maincontact");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the maincontact");
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
          <h1 className="text-xl font-bold">Contact Details</h1>
          <p className="text-sm text-gray-500">
            {mainContacts.length > 0
              ? "Contact details available"
              : "No contact details available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          {mainContacts.length < 1 ? (
            <Link to="/main-contact/add-maincontact">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                Add Details
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* MainContacts List */}
      {mainContacts.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Support Number
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Office Address
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mainContacts.map((maincontact) => (
                    <tr key={maincontact.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b text-gray-500">
                        {maincontact?.email}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {maincontact?.supportNumber}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {maincontact?.officeAddress}
                      </td>

                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-2">
                          <Link
                            to={`/main-contact/edit-maincontact/${maincontact._id}`}
                          >
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i class="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              openDeleteConfirmModal(maincontact._id)
                            }
                            className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                          >
                            <i class="fa-regular fa-trash-can"></i>
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
              {mainContacts.map((maincontact) => (
                <div
                  key={maincontact._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  <p className="text-sm">
                    <strong>Email:</strong> {maincontact.email}
                  </p>
                  <p className="text-sm">
                    <strong>Support Number:</strong> {maincontact.supportNumber}
                  </p>
                  <p className="text-sm">
                    <strong>Office Address:</strong>
                    {maincontact.officeAddress}
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Edit MainContact */}
                    <Link
                      to={`/main-contact/edit-maincontact/${maincontact._id}`}
                    >
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete MainContact */}
                    <button
                      onClick={() => openDeleteConfirmModal(maincontact._id)}
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
        message="Are you sure you want to delete this maincontact? This action cannot be undone."
      />
    </div>
  );
};

export default MainContact;
