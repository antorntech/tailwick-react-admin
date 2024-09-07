import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

const Blogs = () => {
  // State variables
  const [blogs, setBlogs] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch blog data from the server
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Error fetching blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected blog ID
  const openDeleteConfirmModal = (blogId) => {
    setSelectedBlogId(blogId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedBlogId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/blogs/delete/${selectedBlogId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Blog deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchBlogs(); // Refresh blog list
        } else {
          toast.error("Failed to delete blog");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the blog");
      }
    }
  };

  // Toggle between table and grid layout
  const toggleLayout = () => setIsTableLayout(!isTableLayout);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Blogs</h1>
          <p className="text-sm text-gray-500">
            {blogs.length > 0 ? "Blogs are available" : "No blogs available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          <Link to="/blogs/add-blog">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Blog
            </button>
          </Link>
        </div>
      </div>

      {/* Blogs List */}
      {blogs.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {/* Table Headers */}
                    {[
                      "Banner",
                      "Title",
                      "Details",
                      "Author",
                      "Date",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-100">
                      {/* Blog Data */}
                      <td className="px-6 py-4 border-b">
                        <img
                          src={`http://localhost:8000/${blog.banner}`}
                          alt={blog.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{blog.title}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {blog.details.slice(0, 80)}...
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {blog.date}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {/* Edit Blog */}
                          <Link to={`/blogs/edit-blog/${blog._id}`}>
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          {/* Delete Blog */}
                          <button
                            onClick={() => openDeleteConfirmModal(blog._id)}
                            className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Grid Layout
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentItems.map((blog) => (
                <div
                  key={blog._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  {/* Blog Image */}
                  <img
                    src={`http://localhost:8000/${blog.banner}`}
                    alt={blog.title}
                    className="w-full h-full md:h-[250px] object-cover rounded"
                  />
                  {/* Blog Details */}
                  <h1 className="text-xl font-bold mt-3">{blog.title}</h1>
                  <p className="text-sm text-gray-500">
                    {blog.details.slice(0, 80)}...
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Edit Blog */}
                    <Link to={`/blogs/edit-blog/${blog._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete Blog */}
                    <button
                      onClick={() => openDeleteConfirmModal(blog._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-5">
            {/* Previous Page Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={openDeleteModal}
        handleOpen={toggleDeleteModal}
        onDelete={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default Blogs;
