import { Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditModule = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();

  // State for managing form data
  const [module, setModule] = useState({
    title: "",
    subTitle: "",
    lists: [],
  });

  // State for managing new list item input
  const [newListItem, setNewListItem] = useState("");

  // Fetch module data on component mount
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/trainings/${id}/module/${moduleId}`
        );
        const data = await response.json();
        setModule(data.module);
        console.log(data);
      } catch (error) {
        toast.error("Failed to load module data.");
        console.error("Error:", error);
      }
    };

    fetchModuleData();
  }, [id, moduleId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModule((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };

  // Add a new list item
  const addListItem = () => {
    if (newListItem.trim()) {
      setModule((prevModule) => ({
        ...prevModule,
        lists: [...prevModule.lists, newListItem],
      }));
      setNewListItem(""); // Clear input field
    } else {
      toast.error("List item cannot be empty.");
    }
  };

  // Update an existing list item
  const updateListItem = (index, newValue) => {
    const updatedLists = module.lists.map((item, i) =>
      i === index ? newValue : item
    );
    setModule((prevModule) => ({
      ...prevModule,
      lists: updatedLists,
    }));
  };

  // Remove a list item
  const removeListItem = (index) => {
    setModule((prevModule) => ({
      ...prevModule,
      lists: prevModule.lists.filter((_, i) => i !== index),
    }));
  };

  // Handle module update submission
  const handleUpdateModule = async () => {
    if (module.title && module.subTitle && module.lists.length) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/trainings/${id}/modules/${moduleId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: module.title,
              subTitle: module.subTitle,
              lists: module.lists, // Send lists as JSON
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success("Module updated successfully!");
          navigate(`/trainings/view-module/${id}`);
        } else {
          toast.error(result.message || "Failed to update module.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the module.");
        console.error("Error:", error);
      }
    } else {
      toast.error("Please fill in all fields and add at least one list item.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-1 text-black border-2 border-black px-2 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-500"
        >
          <i className="fa-solid fa-hand-point-left"></i>
        </button>
        <div>
          <h1 className="text-xl font-bold">Edit Module</h1>
          <p className="text-sm text-gray-500">
            You can edit the module from here.
          </p>
        </div>
      </div>

      <div className="mt-5 w-full md:w-1/2 flex flex-col">
        <Typography variant="h6" color="gray" className="mb-1 font-normal">
          Title
        </Typography>
        <Input
          type="text"
          name="title"
          size="lg"
          placeholder="Enter module title"
          value={module.title}
          onChange={handleInputChange}
          className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>

      <div className="mt-5 w-full md:w-1/2 flex flex-col">
        <Typography variant="h6" color="gray" className="mb-1 font-normal">
          Sub Title
        </Typography>
        <Input
          type="text"
          name="subTitle"
          size="lg"
          placeholder="Enter module sub title"
          value={module.subTitle}
          onChange={handleInputChange}
          className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>

      <div className="mt-5 w-full md:w-1/2 flex flex-col">
        <div className="mb-2 flex flex-col justify-between">
          <Typography variant="h6" color="gray" className="mb-1 font-normal">
            Module List
          </Typography>
          <div className="flex items-center">
            <Input
              type="text"
              size="lg"
              placeholder="Enter list item"
              value={newListItem}
              onChange={(e) => setNewListItem(e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <button
              className="ml-2 bg-green-600 px-4 py-2 rounded-md text-white flex items-center gap-2"
              onClick={addListItem}
            >
              Add
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        {module.lists.map((list, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="text"
              size="lg"
              value={list}
              onChange={(e) => updateListItem(index, e.target.value)}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <button
              className="ml-2 bg-red-600 px-4 py-1 rounded-md text-white"
              onClick={() => removeListItem(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-5 bg-blue-600 px-4 py-2 rounded-md text-white"
        onClick={handleUpdateModule}
      >
        Update Module
      </button>
    </div>
  );
};

export default EditModule;
