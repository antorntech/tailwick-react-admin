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

const ViewModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const fetchModules = async () => {
    try {
      fetch(`http://localhost:8000/api/v1/trainings/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json", // Accepting JSON response
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const moduleList = data?.module;
          setTitle(data?.title);
          setModules(moduleList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  useEffect(() => {
    fetchModules();
  }, [id]);

  const handleOpen = () => setOpen(!open);

  const openDeleteConfirmModal = (moduleId) => {
    setSelectedModuleId(moduleId);
    console.log(moduleId);
    handleOpen();
  };

  const deleteModule = (moduleId) => {
    fetch(`http://localhost:8000/api/v1/trainings/${id}/module/${moduleId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    handleOpen(); // Close dialog after deletion
  };

  const handleDelete = () => {
    if (selectedModuleId !== null) {
      deleteModule(selectedModuleId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/trainings")}
            className="flex items-center justify-center gap-1 text-black border-2 border-black px-2 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            <i className="fa-solid fa-hand-point-left"></i>
          </button>
          <div>
            <h1 className="text-xl font-bold">
              Module list of "<span className="text-blue-500">{title}</span>".
            </h1>
            <p className="text-sm text-gray-500">
              modules are {modules?.length > 0 ? "" : "not"} available here.
            </p>
          </div>
        </div>
        <div>
          <Link to={`/trainings/add-module/${id}`}>
            <button className="w-[130px] flex items-center justify-center gap-1 text-white border-2 border-green-700 px-2 py-2 rounded-md text-sm bg-green-700 hover:bg-green-500 hover:border-green-500 transition-all duration-500">
              Add Module
              <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
        </div>
      </div>
      {modules?.length > 0 ? (
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  Module Title
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  Module Sub Title
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  Module List
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">
                    <h1 className="text-sm font-bold">{module.title}</h1>
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-500">
                    {module.subTitle}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-500">
                    <Popover placement="bottom-end">
                      <PopoverHandler>
                        <button className="text-cyan-700 border-2 border-cyan-700 px-2 py-1 rounded-md text-sm hover:bg-cyan-700 hover:text-white transition-all duration-500">
                          View List ({module.lists.length})
                          <i className="fa-solid fa-eye ml-1"></i>
                        </button>
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-200 shadow-lg border-2 border-gray-300">
                        {module.lists.map((list, index) => (
                          <li
                            key={index}
                            className="list-disc list-inside text-sm text-gray-800"
                          >
                            {list}
                          </li>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <Link to={`/trainings/edit-module/${id}/${module._id}`}>
                        <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteConfirmModal(module._id)}
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

export default ViewModule;
