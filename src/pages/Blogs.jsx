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
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
    {
      id: 2,
      title: "This is Blog Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
    {
      id: 3,
      title: "This is Blog Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod.",
      link: "/blogs",
      banner: "/img/blog-banner.jpg",
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Blogs</h1>
          <p className="text-sm text-gray-500">
            All blogs are {allBlogs ? "" : "not"} available here.
          </p>
        </div>
        <div>
          <Link to={"/blogs/add-blog"}>
            <button className="bg-[#199bff] text-white px-4 py-2 rounded-md">
              Add Blog
            </button>
          </Link>
        </div>
      </div>
      {allBlogs ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-5">
            {allBlogs.map((blog) => (
              <div key={blog.id} className="w-full rounded-md">
                <div className="custom-shadow2 flex flex-col items-center justify-center rounded-md">
                  <div className="">
                    <img
                      src={blog.banner}
                      alt=""
                      className="w-full h-full object-cover rounded-tr-md rounded-tl-md"
                    />
                  </div>
                  <div className="w-full p-1">
                    <div className="w-full h-full flex flex-col justify-center py-2 px-1">
                      <h1 className="text-lg font-bold text-black">
                        {blog.title}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {blog.description.slice(0, 20)}...
                      </p>
                    </div>
                    <div className="flex gap-2 pb-3 px-1">
                      <button className="bg-orange-800 text-white px-4 py-1 rounded-md text-sm">
                        Edit
                      </button>
                      <button
                        onClick={handleOpen}
                        className="bg-red-800 text-white px-4 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
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
