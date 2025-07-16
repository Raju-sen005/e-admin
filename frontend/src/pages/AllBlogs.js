import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      console.log("Blogs response:", res.data); // 👈
      setBlogs(res.data);
    } catch (error) {
      alert("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs(); // Refresh list
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  return (
    <div className="container-fluid sb2">
      <div className="row">
        {/* Sidebar (optional) */}
        <div className="sb2-1">
          <div className="sb2-13">
            <ul className="collapsible" data-collapsible="accordion">
              <li><a href="/dashboard"><i className="fa fa-bar-chart"></i> Dashboard</a></li>
              <li><a href="/users"><i className="fa fa-user"></i> Users</a></li>
              <li><a href="/products"><i className="fa fa-rss"></i> Products</a></li>
              <li><a href="/blogs" className="menu-active"><i className="fa fa-rss"></i> Blogs</a></li>
              <li><a href="/gallery"><i className="fa fa-rss"></i> Gallery</a></li>
              <li><a href="/orders"><i className="fa fa-rss"></i> Orders</a></li>
              <li><a href="/enquiries"><i className="fa fa-rss"></i> Enquiries</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="sb2-2">
          <div className="sb2-2-2">
            <ul>
              <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
              <li className="active-bre"><a href="#">All Blogs</a></li>
            </ul>
          </div>

          <div className="sb2-2-3">
            <div className="row">
              <div className="col-md-12">
                <div className="box-inn-sp">
                  <div className="inn-title d-flex justify-content-between align-items-center">
                    <h4>All Blog Posts</h4>
                  </div>

                  <p>Manage your blog content here.</p>

                  <div className="tab-inn">
                    <div className="table-responsive table-desi">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Categories</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center">No blogs found.</td>
                            </tr>
                          ) : (
                            blogs.map((blog, index) => (
                              <tr key={blog._id}>
                                <td>{index + 1}</td>
                                <td>{blog.title}</td>
                                <td>{blog.category}</td>
                                <td>
                                  {blog.date
                                    ? new Date(blog.date).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit'
                                    })
                                    : 'N/A'}
                                </td>
                                <td>
                                  <Link to={`/edit-blog/${blog._id}`} className="text-primary">
                                    <i className="fa fa-pencil-square-o"></i>
                                  </Link>
                                </td>
                                <td>

                                  <i 
                                    onClick={() => handleDelete(blog._id)} className="fa fa-trash-o"></i>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
