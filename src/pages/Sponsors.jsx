import React from "react";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { Link } from "react-router-dom";

const Sponsors = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const sponsors = [
    {
      id: 1,
      name: "Sponsor 1",
      logo: "/img/sponsors/sponsor-1.png",
    },
    {
      id: 2,
      name: "Sponsor 2",
      logo: "/img/sponsors/sponsor-2.png",
    },
    {
      id: 3,
      name: "Sponsor 3",
      logo: "/img/sponsors/sponsor-3.png",
    },
    {
      id: 4,
      name: "Sponsor 4",
      logo: "/img/sponsors/sponsor-4.png",
    },
    {
      id: 5,
      name: "Sponsor 5",
      logo: "/img/sponsors/sponsor-5.png",
    },
    {
      id: 6,
      name: "Sponsor 6",
      logo: "/img/sponsors/sponsor-6.png",
    },
  ];
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Sponsors</h1>
          <p className="text-sm text-gray-500">
            All sponsor are {sponsors ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/sponsors/add-sponsor"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Sponsor
            </button>
          </Link>
        </div>
      </div>
      {sponsors ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="w-full flex flex-col shadow-md rounded-md p-3"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-[100px] h-[100px] mx-auto"
                />
                <div className="flex justify-center gap-3 mt-3">
                  <Link to={`/sponsors/edit/${sponsor.id}`}>
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

export default Sponsors;
