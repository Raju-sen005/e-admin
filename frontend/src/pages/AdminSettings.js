// src/pages/AdminSettings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    email: "",
    alternateEmail: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Fetch current admin settings (optional)
    axios.get("http://localhost:5000/api/admin/settings").then((res) => {
      const { email, alternateEmail } = res.data;
      setFormData((prev) => ({ ...prev, email, alternateEmail }));
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/admin/settings", formData);
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update settings");
    }
  };

  return (
    <div className="container-fluid sb2">
      <div className="row">
        <div className="sb2-2">
          <div className="sb2-2-2">
            <ul>
              <li>
                <a href="/">
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </a>
              </li>
              <li className="active-bre">
                <a href="#">Admin Settings</a>
              </li>
            </ul>
          </div>
          <div className="sb2-2-3">
            <div className="row">
              <div className="col-md-12">
                <div className="box-inn-sp">
                  <div className="inn-title">
                    <h4>Setting</h4>
                    <p>Manage your admin credentials and email</p>
                  </div>
                  <div className="tab-inn">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="input-field col s6">
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="validate"
                          />
                          <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s6">
                          <input
                            id="alternateEmail"
                            type="email"
                            value={formData.alternateEmail}
                            onChange={handleChange}
                            className="validate"
                          />
                          <label htmlFor="alternateEmail">Alternate Email</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s6">
                          <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="validate"
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col s6">
                          <input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="validate"
                          />
                          <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            type="submit"
                            className="waves-effect waves-light btn-large"
                            value="Update Settings"
                          />
                        </div>
                      </div>
                    </form>
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

export default AdminSettings;
