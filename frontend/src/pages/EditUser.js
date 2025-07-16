import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        const { firstName, lastName, email } = res.data;
        setFormData(prev => ({ ...prev, firstName, lastName, email }));
      })
      .catch(err => {
        alert("Failed to load user data");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };

    axios.put(`http://localhost:5000/api/users/${id}`, updateData)
      .then(() => {
        alert("User updated successfully");
        navigate("/users");
      })
      .catch(err => {
        alert("Failed to update user");
        console.error(err);
      });
  };

  return (
    <div className="sb2-2">
      <div className="sb2-2-2">
        <ul>
          <li><a href="#"><i className="fa fa-home"></i> Home</a></li>
          <li className="active-bre"><a href="#">User Edit</a></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h4>Edit User Details</h4>
                <p>You can edit user info here.</p>
              </div>
              <div className="tab-inn">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <label className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                      <label className="active">Last Name</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label className="active">Password</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <label className="active">Confirm Password</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="active">Email</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button type="submit" className="waves-effect waves-light btn-large">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
