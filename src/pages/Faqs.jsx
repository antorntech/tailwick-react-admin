import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Faqs = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const faqs = [
    {
      id: 1,
      question: "What is the ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 2,
      question: "How do I get ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 3,
      question: "How can we buy and invest in ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 4,
      question: "Where can we buy and sell ISSL?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
    {
      id: 5,
      question: "Who are the team behind the project?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusm tempor incididunt ut labore et dolore magna aliqua. enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
  ];

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Faqs</h1>
          <p className="text-sm text-gray-500">
            All faqa are {faqs ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/faqs/add-faq"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Faq
            </button>
          </Link>
        </div>
      </div>
      {faqs ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="w-full flex flex-col shadow-md rounded-md p-3"
              >
                <h1 className="text-xl font-bold mt-3">{faq.question}</h1>
                <p className="text-sm text-gray-500">
                  {faq.answer.slice(0, 80)}...
                </p>
                <div className="flex gap-3 mt-3">
                  <Link to={`/faqs/edit/${faq.id}`}>
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

export default Faqs;
