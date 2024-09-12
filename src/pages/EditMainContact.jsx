import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMainContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [supportNumber, setSpportNumber] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/maincontacts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setSpportNumber(data.supportNumber);
        setOfficeAddress(data.officeAddress);
      });
  }, [id]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSupNumChange = (e) => {
    setSpportNumber(e.target.value);
  };
  const handleOfficeAddChange = (e) => {
    setOfficeAddress(e.target.value);
  };

  const handleUpdate = async () => {
    const data = {
      email,
      supportNumber,
      officeAddress,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/maincontacts/update/${id}`,
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

      toast.success("Data updated successfully", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to faqs page
      navigate("/main-contact");

      // Reset the form
      setTitleOne("");
      setTitleTwo("");
      setTitleThree("");
      setSubtitle("");
      setVideoLink("");
    } catch (error) {
      console.error("Error updating data", error);
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
          <h1 className="text-xl font-bold">Edit Contact Details</h1>
          <p className="text-sm text-gray-500">
            You can edit contact details from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Email
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter faq email"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              name="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mt-5">
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Support Number
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter support number"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={supportNumber}
              name="supportNumber"
              onChange={handleSupNumChange}
            />
          </div>
          <div className="mt-5">
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Office Address
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter office address"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#199bff] focus:!border-t-border-[#199bff] focus:ring-border-[#199bff]/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={officeAddress}
              name="officeAddress"
              onChange={handleOfficeAddChange}
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

export default EditMainContact;
