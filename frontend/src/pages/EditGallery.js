// src/pages/EditGallery.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/gallery/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(() => alert("Failed to fetch gallery data"));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.put(`http://localhost:5000/api/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/gallery");
    } catch (err) {
      alert("Failed to update gallery item");
    }
  };

  return (
    <div className="container mt-4" style={{ position: "relative", top: "50px", left: "150px" }}>
      <h2>Edit Gallery</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Post Name</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Gallery Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditGallery;
