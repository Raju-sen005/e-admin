import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const { id } = useParams(); // null in Add mode
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    shippingReturns: "",
    styleWith: "",
    reviews: "",
    actualPrice: "",
    discountPrice: ""
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Failed to fetch product:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${id}`, product);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", product);
        alert("Product created successfully!");
      }

      navigate("/product-all");
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="container mt-5" style={{ position: "relative", top: "50px", left: "150px" }}>
      {/* Breadcrumb */}
      <div className="sb2-2-2">
        <ul>
          <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
          <li className="active-bre"><span>{isEdit ? "Edit Product" : "Add Product"}</span></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <h3>{isEdit ? "Edit Product" : "Add New Product"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
              accept="image/*"
            />
            {product.image && (
              <img
                src={product.image}
                alt="Preview"
                style={{ height: "80px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Shipping & Returns</label>
            <textarea
              name="shippingReturns"
              className="form-control"
              rows={3}
              value={product.shippingReturns}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Style With</label>
            <textarea
              name="styleWith"
              className="form-control"
              rows={3}
              value={product.styleWith}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Reviews</label>
            <textarea
              name="reviews"
              className="form-control"
              rows={3}
              value={product.reviews}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Actual Price</label>
              <input
                type="number"
                name="actualPrice"
                className="form-control"
                value={product.actualPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                className="form-control"
                value={product.discountPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
