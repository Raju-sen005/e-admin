import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ViewUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Error fetching user:", err);
        alert("Failed to load user");
      });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="sb2-2">
      <div className="sb2-2-2">
        <ul>
          <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
          <li className="active-bre"><Link to="#">User View</Link></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h4>View User Details</h4>
                <p>Fetched from backend using user ID</p>
              </div>
              <div className="tab-inn">
                <form>
                  <div className="row">
                    <div className="input-field col s6">
                      <input type="text" value={user.firstName || ""} readOnly />
                      <label className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input type="text" value={user.lastName || ""} readOnly />
                      <label className="active">Last Name</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input type="password" value="********" readOnly />
                      <label className="active">Password</label>
                    </div>
                    <div className="input-field col s6">
                      <input type="password" value="********" readOnly />
                      <label className="active">Confirm Password</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input type="email" value={user.email || ""} readOnly />
                      <label className="active">Email</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Link to="/users" className="waves-effect waves-light btn-large">Back</Link>
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

export default ViewUser;
