import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    author: "",
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlogData(res.data);
    } catch (err) {
      alert("Failed to load blog");
    }
  };

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, blogData);
      alert("Blog updated successfully");
      navigate("/blogs");
    } catch (err) {
      alert("Failed to update blog");
    }
  };

  return (
    <div className="container mt-4" style={{  position: "relative", top: "50px" ,left: "200px"}}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Post Name</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={blogData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Blog Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="5"
            value={blogData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={blogData.author}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
