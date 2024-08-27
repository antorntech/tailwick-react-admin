import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Slider = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const sliders = [
    {
      id: 1,
      title: "Innovative Cloud Solutions",
      details:
        "Transform your business with cutting-edge cloud technology. Our scalable solutions offer seamless integration, enhanced security, and the flexibility to adapt to your growing needs. Experience the future of cloud computing today.",
      image: "/img/1.jpg",
    },
    {
      id: 2,
      title: "Next-Gen AI Development",
      details:
        "Unlock the power of artificial intelligence with our advanced AI solutions. From machine learning to natural language processing, our expertise in AI technologies helps you gain valuable insights and drive innovation in your industry.",
      image: "/img/2.jpg",
    },
    {
      id: 3,
      title: "Robust Cybersecurity Services",
      details:
        "Protect your digital assets with our comprehensive cybersecurity services. We provide state-of-the-art solutions to safeguard your business from cyber threats, ensuring your data remains secure and your operations run smoothly.",
      image: "/img/3.jpg",
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Slider</h1>
          <p className="text-sm text-gray-500">
            All slider are {sliders ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/slider/add-slider"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
              Add Slider
            </button>
          </Link>
        </div>
      </div>
      {sliders ? (
        <>
          <div className="mt-5 flex flex-col md:flex-row gap-5">
            {sliders.map((slider) => (
              <div
                key={slider.id}
                className="w-full md:w-1/3 flex flex-col shadow-md rounded-md p-3"
              >
                <img
                  src={slider.image}
                  alt={slider.title}
                  className="w-full h-full md:h-[250px]"
                />
                <h1 className="text-xl font-bold mt-3">{slider.title}</h1>
                <p className="text-sm text-gray-500">
                  {slider.details.slice(0, 80)}...
                </p>
                <div className="flex gap-3 mt-3">
                  <Link to={`/slider/edit/${slider.id}`}>
                    <button className="bg-orange-800 text-white px-4 py-1 rounded-md text-sm">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={handleOpen}
                    className="bg-red-800 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <DeleteConfirmModal open={open} handleOpen={handleOpen} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Slider;
