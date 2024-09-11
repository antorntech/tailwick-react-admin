import { Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHomeInfoCategory = () => {
  const { id, categoryId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/530x300"
  );
  const [infoCategory, setInfoCategory] = useState({
    title: "",
    link: "",
    banner: "",
  });
  const [fileKey, setFileKey] = useState(Date.now());
  const [uploadProgress, setUploadProgress] = useState(0);
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  console.log(infoCategory);

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/v1/homeinfos/${id}/categories/${categoryId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setInfoCategory(data.infoCategories);
        console.log(data.infoCategories);
        setImagePreview(
          `http://localhost:8000/${data?.infoCategories?.banner}`
        );
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 50MB limit.");
      setFileKey(Date.now());
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append("title", infoCategory.title);
    formData.append("link", infoCategory.link);

    // Append image if provided
    if (image) formData.append("banner", image);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/homeinfos/${id}/categories/${categoryId}`,
        {
          method: "PUT",
          body: formData, // FormData automatically sets the appropriate headers
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success("Category updated successfully!", {});
        navigate(`/home-info/view-info-category/${id}`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const clearPreview = () => {
    setImage(null);
    setImagePreview("https://placehold.co/530x300");
    setFileKey(Date.now());
    setUploadProgress(0);
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
          <h1 className="text-xl font-bold">Add Home Info Category</h1>
          <p className="text-sm text-gray-500">
            You can add home info category details from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Title
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter category title"
              value={infoCategory?.title}
              name="title"
              onChange={handleChange}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Link
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter category link"
              value={infoCategory?.link}
              name="link"
              onChange={handleChange}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="w-full md:w-[45%]">
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Banner
            </Typography>
            <input key={fileKey} type="file" onChange={handleImageChange} />
            {uploadProgress > 0 && (
              <div className="mt-3">
                <progress value={uploadProgress} max="100">
                  {uploadProgress}%
                </progress>
              </div>
            )}
          </div>
          <button
            onClick={handleUpdateCategory}
            className="mt-5 bg-[#199bff] text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
        <div className="relative w-full md:w-1/2 h-[300px] mt-5 md:mt-0 md:ml-5 border-[1px] border-gray-400 rounded-md">
          <button
            className="bg-red-800 text-white w-8 h-8 rounded-full absolute top-2 right-2"
            onClick={clearPreview}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <img
            src={imagePreview}
            alt="Selected"
            className="max-w-full h-full md:w-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EditHomeInfoCategory;
