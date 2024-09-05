import { Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for managing form data
  const [module, setModule] = useState({
    title: "",
    subTitle: "",
    lists: [],
  });

  // State for managing new list item input
  const [newListItem, setNewListItem] = useState("");

  // Handle changes in title input
  const handleTitleChange = (e) => {
    setModule((prevModule) => ({
      ...prevModule,
      title: e.target.value,
    }));
  };

  // Handle changes in subtitle input
  const handleSubTitleChange = (e) => {
    setModule((prevModule) => ({
      ...prevModule,
      subTitle: e.target.value,
    }));
  };

  // Handle changes in list item input
  const handleListItemChange = (e) => {
    setNewListItem(e.target.value);
  };

  // Add a new list item to the module
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

  // Handle removal of a list item
  const removeListItem = (index) => {
    setModule((prevModule) => ({
      ...prevModule,
      lists: prevModule.lists.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission to add new module
  const handleAddModule = async () => {
    if (module.title && module.subTitle && module.lists.length) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/trainings/${id}/add-module`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: module.title,
              subTitle: module.subTitle,
              lists: JSON.stringify(module.lists), // Send lists as a JSON string
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success("Module added successfully!");
          navigate(`/trainings/view-module/${id}`); // Navigate to another page
        } else {
          toast.error(result.message || "Failed to add module.");
        }
      } catch (error) {
        toast.error("An error occurred while adding the module.");
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
          <h1 className="text-xl font-bold">Add Module</h1>
          <p className="text-sm text-gray-500">
            You can add a new module from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:w-1/2 flex flex-col">
        <Typography variant="h6" color="gray" className="mb-1 font-normal">
          Title
        </Typography>
        <Input
          type="text"
          size="lg"
          placeholder="Enter module title"
          className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={module.title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mt-5 w-full md:w-1/2 flex flex-col">
        <Typography variant="h6" color="gray" className="mb-1 font-normal">
          Sub Title
        </Typography>
        <Input
          type="text"
          size="lg"
          placeholder="Enter module sub title"
          className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={module.subTitle}
          onChange={handleSubTitleChange}
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
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={newListItem}
              onChange={handleListItemChange}
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
        {module.lists?.map((list, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="text"
              size="lg"
              value={list}
              readOnly
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
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
        onClick={handleAddModule}
      >
        Add Module
      </button>
    </div>
  );
};

export default AddModule;
