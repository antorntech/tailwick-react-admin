import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titleOne, setTitleOne] = useState("");
  const [titleTwo, setTitleTwo] = useState("");
  const [titleThree, setTitleThree] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/promotions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitleOne(data.titleOne);
        setTitleTwo(data.titleTwo);
        setTitleThree(data.titleThree);
        setSubtitle(data.subtitle);
        setVideoLink(data.videoLink);
      });
  }, [id]);

  const handleTitleOneChange = (e) => {
    setTitleOne(e.target.value);
  };

  const handleTitleTwoChange = (e) => {
    setTitleTwo(e.target.value);
  };

  const handleTitleThreeChange = (e) => {
    setTitleThree(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleVideoLinkChange = (e) => {
    const url = e.target.value;
    setVideoLink(url);

    if (!url.startsWith("http")) {
      setError("Invalid URL.");
    } else {
      setError(""); // Clear error on valid input
    }
  };

  const handleUpdate = async () => {
    const data = {
      titleOne: titleOne,
      titleTwo: titleTwo,
      titleThree: titleThree,
      subtitle: subtitle,
      videoLink: videoLink,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/promotions/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(data), // Send the data as JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();

      toast.success("Promotion updated successfully", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to promotions page
      navigate("/promotion");

      // Reset the form
      setTitleOne("");
      setTitleTwo("");
      setTitleThree("");
      setSubtitle("");
      setVideoLink("");
    } catch (error) {
      console.error("Error updating promotion", error);
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
          <h1 className="text-xl font-bold">Edit Promotion</h1>
          <p className="text-sm text-gray-500">
            You can edit promotion details from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Title One
            </Typography>
            <Input
              type="text"
              size="lg"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={titleOne}
              name="titleOne"
              onChange={handleTitleOneChange}
              placeholder="Enter title one"
            />
          </div>

          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Title Two
            </Typography>
            <Input
              type="text"
              value={titleTwo}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleTitleTwoChange}
              placeholder="Enter title two"
            />
          </div>

          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Title Three
            </Typography>
            <Input
              type="text"
              value={titleThree}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleTitleThreeChange}
              placeholder="Enter title three"
            />
          </div>

          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Subtitle
            </Typography>
            <Input
              type="text"
              value={subtitle}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleSubtitleChange}
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Video Link
            </Typography>
            <Input
              type="text"
              value={videoLink}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleVideoLinkChange}
              placeholder="Enter video link"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleUpdate}
            className="mt-5 bg-[#199bff] text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPromotion;
