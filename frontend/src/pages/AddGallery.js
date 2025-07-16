// src/pages/AddOrEditGallery.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddOrEditGallery = () => {
  const { id } = useParams(); // agar id hai toh edit mode
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 🟡 Fetch existing item for editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/gallery/${id}`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPreview(res.data.imageUrl);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (id) {
        // PUT → Edit mode
        await axios.put(`http://localhost:5000/api/gallery/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Gallery item updated!");
      } else {
        // POST → Add mode
        await axios.post(`http://localhost:5000/api/gallery`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Gallery item added!");
      }
      navigate("/gallery");
    } catch (err) {
      console.error("Error saving gallery item:", err);
      alert("Failed to save gallery item.");
    }
  };

  return (
    <div className="container mt-4" style={{ position: "relative", top: "50px", left: "150px" }}>
      <h2>{id ? "Edit" : "Add"} Gallery Item</h2>
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
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img
              src={`http://localhost:5000${preview}`}
              alt="preview"
              style={{ marginTop: "10px", height: "100px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Gallery Description</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"} Gallery
        </button>
      </form>
    </div>
  );
};

export default AddOrEditGallery;
