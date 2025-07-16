// src/pages/AllGallery.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/gallery").then((res) => {
      console.log(res.data);
      setGalleryItems(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setGalleryItems(galleryItems.filter((item) => item._id !== id));
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
  };

  return (
    <div className="container mt-4" style={{ position: "relative", top: "50px", left: "150px" }}>
      <h2>All Gallery Posts</h2>
      <p>Manage your gallery images and descriptions here.</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : "https://via.placeholder.com/100x100?text=No+Image"}
                  alt="Gallery"
                  width="100"
                  onError={handleImageError}
                />
              </td>

              <td>
                <Link
                  to={`/edit-gallery/${item._id}`}
                  className="btn btn-sm btn-warning"
                >
                  <i className="fa fa-pencil-square-o"></i>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGallery;
