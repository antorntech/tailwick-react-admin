import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const EditHomeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/homeInfos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.heading);
        setSubHeading(data.subheading);
        setContent(data.content);
      });
  }, [id]);

  const handleUpdate = async () => {
    const data = {
      heading,
      subheading,
      content,
    };

    try {
      // Make a POST request to the Express.js server
      const response = await fetch(
        `http://localhost:8000/api/v1/homeinfos/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send the FormData containing all fields and files
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json(); // Parse the server response

      // Show success toast
      toast.success("Upload successful", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Reset the form after successful upload
      setHeading("");
      setSubHeading("");
      setContent("");

      // Navigate to the trainings page
      navigate("/home-info");
    } catch (error) {
      console.error("Error uploading file", error);

      // Show error toast
      toast.error("Error uploading file", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Reset the form in case of error
      setHeading("");
      setSubHeading("");
      setContent("");
    }
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleSubHeadingChange = (e) => {
    setSubHeading(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
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
          <h1 className="text-xl font-bold">Add HomeInfo</h1>
          <p className="text-sm text-gray-500">
            You can add homeinfo content from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Heading
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter homeinfo heading"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={heading}
              name="heading"
              onChange={handleHeadingChange}
            />
          </div>
          <div className="mt-2">
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Sub Heading
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter homeinfo sub heading"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={subheading}
              name="subheading"
              onChange={handleSubHeadingChange}
            />
          </div>
          <div className="mt-2">
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Content
            </Typography>
            <Textarea
              value={content}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleContentChange}
              rows={5}
              placeholder="Enter homeinfo content"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="mt-5 bg-[#199bff] text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHomeInfo;
