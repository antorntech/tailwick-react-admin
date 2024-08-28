import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Slider = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [layout, setLayout] = React.useState(true);

  const handleLayout = () => setLayout(!layout);

  const sliders = [
    {
      id: 1,
      title: "Innovative Cloud Solutions",
      details:
        "Transform your business with cutting-edge cloud technology. Our scalable solutions offer seamless integration, enhanced security, and the flexibility to adapt to your growing needs. Experience the future of cloud computing today.",
      banner: "/img/1.jpg",
    },
    {
      id: 2,
      title: "Next-Gen AI Development",
      details:
        "Unlock the power of artificial intelligence with our advanced AI solutions. From machine learning to natural language processing, our expertise in AI technologies helps you gain valuable insights and drive innovation in your industry.",
      banner: "/img/2.jpg",
    },
    {
      id: 3,
      title: "Robust Cybersecurity Services",
      details:
        "Protect your digital assets with our comprehensive cybersecurity services. We provide state-of-the-art solutions to safeguard your business from cyber threats, ensuring your data remains secure and your operations run smoothly.",
      banner: "/img/3.jpg",
    },
  ];
  return (
    <>
      {layout ? (
        <div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Slider</h1>
              <p className="text-sm text-gray-500">
                All sliders are {sliders ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/slider/add-slider"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Slider
                </button>
              </Link>
            </div>
          </div>

          {sliders ? (
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
                      Details
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sliders.map((slider) => (
                    <tr key={slider.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        <img
                          src={slider.banner}
                          alt={slider.title}
                          className="w-32 h-20 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{slider.title}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {slider.details.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <DeleteConfirmModal open={open} handleOpen={handleOpen} />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold">Slider</h1>
              <p className="text-sm text-gray-500">
                All sliders are {sliders ? "" : "not"} available here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg-[#2e961a] text-white px-4 py-2 rounded-md mt-2 md:mt-0"
                onClick={handleLayout}
              >
                Change Layout
              </button>
              <Link to={"/slider/add-slider"}>
                <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
                  Add Slider
                </button>
              </Link>
            </div>
          </div>
          {sliders ? (
            <>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sliders.map((slider) => (
                  <div
                    key={slider.id}
                    className="w-full flex flex-col shadow-md rounded-md p-3"
                  >
                    <img
                      src={slider.banner}
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
      )}
    </>
  );
};

export default Slider;
