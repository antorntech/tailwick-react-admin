import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

const Blogs = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const allBlogs = [
    {
      id: 1,
      title: "This is Blog Title",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
    {
      id: 2,
      title: "This is Blog Title",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
    {
      id: 3,
      title: "This is Blog Title",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
  ];
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Blogs</h1>
          <p className="text-sm text-gray-500">
            All blogs are {allBlogs ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/blogs/add-blog"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Blog
            </button>
          </Link>
        </div>
      </div>
      {allBlogs ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allBlogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full flex flex-col shadow-md rounded-md p-3"
              >
                <img
                  src={blog.banner}
                  alt={blog.title}
                  className="w-full h-full md:h-[250px]"
                />
                <h1 className="text-xl font-bold mt-3">{blog.title}</h1>
                <p className="text-sm text-gray-500">
                  {blog.details.slice(0, 80)}...
                </p>
                <div className="flex gap-3 mt-3">
                  <Link to={`/blog/edit/${blog.id}`}>
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

export default Blogs;
