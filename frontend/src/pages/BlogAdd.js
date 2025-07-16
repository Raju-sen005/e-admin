import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BlogAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    banner: "",
    description: "",
    categories: [],
    subCategories: [],
    author: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, banner: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, [e.target.name]: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs", formData);
      alert("Blog posted successfully");
      setFormData({ title: "", banner: "", description: "", categories: [], subCategories: [], author: "" });
    } catch (err) {
      alert("Error posting blog");
    }
  };

  const categoriesList = ["Hotels", "Educations", "Medical", "Health", "Fitness", "Tution", "Software", "Wedding", "Party", "Spa/Club"];

  return (
    <div className="container mt-5" style={{ position: "relative", top: "50px", left: "150px" }}>
      <h3>Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Post Title</label>
          <input type="text" name="title" value={formData.title} className="form-control" onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label>Banner Image</label>
          <input type="file" name="banner" className="form-control" onChange={handleInputChange} />
          {formData.banner && <img src={formData.banner} alt="preview" style={{ height: 100, marginTop: 10 }} />}
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleInputChange}></textarea>
        </div>

        <div className="mb-3">
          <label>Categories</label>
          <select name="categories" className="form-select" multiple onChange={handleMultiSelect}>
            {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label>Sub Categories</label>
          <select name="subCategories" className="form-select" multiple onChange={handleMultiSelect}>
            {categoriesList.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label>Author Name</label>
          <input type="text" name="author" className="form-control" value={formData.author} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default BlogAdd;
