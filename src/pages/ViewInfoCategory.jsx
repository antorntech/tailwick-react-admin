import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Loader from "../loader/Loader";

const ViewInfoCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [infoCategories, setInfoCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchInfoCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/homeinfos/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setInfoCategories(data?.infoCategories);
    } catch (error) {
      console.error("Error fetching infoCategories:", error);
    }
  };

  useEffect(() => {
    fetchInfoCategories();
  }, [id]);

  const handleOpen = () => setOpen(!open);

  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    handleOpen();
  };

  const deleteModule = async (selectedItemId) => {
    try {
      // Send the DELETE request to the correct endpoint with the IDs
      const response = await fetch(
        `http://localhost:8000/api/v1/homeinfos/${id}/categories/${selectedItemId}`, // 'id' should be 'homeInfoId'
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(data);

      fetchInfoCategories(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }

    handleOpen(); // Close dialog after deletion
  };

  const handleDelete = () => {
    if (selectedItemId !== null) {
      deleteModule(selectedItemId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home-info")}
            className="flex items-center justify-center gap-1 text-black border-2 border-black px-2 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            <i className="fa-solid fa-hand-point-left"></i>
          </button>
          <div>
            <h1 className="text-xl font-bold">All Categories</h1>
            <p className="text-sm text-gray-500">
              InfoCategories are {infoCategories?.length > 0 ? "" : "not"}{" "}
              available here.
            </p>
          </div>
        </div>
        <div>
          {infoCategories?.length < 3 ? (
            <Link to={`/home-info/add-info-category/${id}`}>
              <button className="w-[130px] flex items-center justify-center gap-1 text-white border-2 border-green-700 px-2 py-2 rounded-md text-sm bg-green-700 hover:bg-green-500 hover:border-green-500 transition-all duration-500">
                Add Category
                <i className="fa-solid fa-plus"></i>
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {infoCategories?.length > 0 ? (
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {infoCategories.map((infoCategory, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">
                    <img
                      src={`http://localhost:8000/${infoCategory.banner}`}
                      alt={infoCategory.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border-b">
                    <h1 className="text-sm font-bold">{infoCategory.title}</h1>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/home-info/edit-info-category/${id}/${infoCategory._id}`}
                      >
                        <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteConfirmModal(infoCategory._id)}
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
        <Loader />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center gap-1 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 text-red-800"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-xl font-bold text-black">
            Do you want to delete this?
          </h1>
        </div>
        <DialogBody>
          After clicking the confirm button, the data will be deleted
          permanently.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ViewInfoCategory;
