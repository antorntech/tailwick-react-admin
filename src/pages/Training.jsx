import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Training = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const trainings = [
    {
      id: 1,
      title: "Responsive Website Development",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training1.jpg",
    },
    {
      id: 2,
      title: "Mobile App Development with Flutter",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training2.jpg",
    },
    {
      id: 3,
      title: "Cloud Computing Consultancy",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/training",
      banner: "/img/training3.jpg",
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Training</h1>
          <p className="text-sm text-gray-500">
            All training are {trainings ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/training/add-training"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
              Add Training
            </button>
          </Link>
        </div>
      </div>
      {trainings ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainings.map((training) => (
              <div
                key={training.id}
                className="w-full flex flex-col shadow-md rounded-md p-3"
              >
                <img
                  src={training.banner}
                  alt={training.title}
                  className="w-full h-full md:h-[250px]"
                />
                <h1 className="text-xl font-bold mt-3">{training.title}</h1>
                <p className="text-sm text-gray-500">
                  {training.details.slice(0, 80)}...
                </p>
                <div className="flex gap-3 mt-3">
                  <Link to={`/training/edit/${training.id}`}>
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

export default Training;
