import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const handleDeleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this user?");
      if (!confirm) return;

      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or sessionStorage if you're using that

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("Fetched Users:", res.data); // 🔍 Check yaha pe
        setUsers(res.data);
      })
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/orders")
      .then(res => {
        console.log("Orders response:", res.data); // 👈 CHECK THIS
        setOrders(res.data);
      })
      .catch(err => console.error("Order fetch error", err));

    axios.get("http://localhost:5000/api/blogs", config)
      .then(res => setBlogs(res.data))
      .catch(err => console.log("Blog Error", err));

    axios.get("http://localhost:5000/api/enquiries", config)
      .then(res => setEnquiries(res.data))
      .catch(err => console.log("Enquiry Error", err));
  }, []);



  return (
    <div className="sb2-2">

      {/* Breadcrumb */}
      <div className="sb2-2-2">
        <ul>
          <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
          <li className="active-bre"><Link to="#"> Dashboard</Link></li>
        </ul>
      </div>

      {/* Dashboard Counts */}
      <div className="ad-v2-hom-info">
        <div className="ad-v2-hom-info-inn">
          <ul>
            <li>
              <div className="ad-hom-box ad-hom-box-1">
                <span className="ad-hom-col-com ad-hom-col-1"><i className="fa fa-bar-chart"></i></span>
                <div className="ad-hom-view-com">
                  <p><i className="fa fa-arrow-up up"></i>Total Orders</p>
                  <h3>{orders.length}</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-hom-box ad-hom-box-2">
                <span className="ad-hom-col-com ad-hom-col-2"><i className="fa fa-usd"></i></span>
                <div className="ad-hom-view-com">
                  <p><i className="fa fa-arrow-up up"></i>Total Blogs</p>
                  <h3>{blogs.length}</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-hom-box ad-hom-box-3">
                <span className="ad-hom-col-com ad-hom-col-3"><i className="fa fa-address-card-o"></i></span>
                <div className="ad-hom-view-com">
                  <p><i className="fa fa-arrow-up up"></i> Users</p>
                  <h3>{users.length}</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-hom-box ad-hom-box-4">
                <span className="ad-hom-col-com ad-hom-col-4"><i className="fa fa-envelope-open-o"></i></span>
                <div className="ad-hom-view-com">
                  <p><i className="fa fa-arrow-up up"></i> Enquiry</p>
                  <h3>{enquiries.length}</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Users Table */}
      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h4>Total User</h4>
                <p>User list fetched from backend</p>
              </div>
              <div className="tab-inn">
                <div className="table-responsive table-desi">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>
                            <span className="list-enq-name">
                              {user.firstName} {user.lastName}
                            </span>
                          </td>

                          <td>{user.email}</td>
                          <td><Link to={`/user-view/${user._id}`}><i className="fa fa-eye"></i></Link></td>
                          <td><Link to={`/user-edit/${user._id}`}><i className="fa fa-pencil-square-o"></i></Link></td>
                          <td><Link to="#" onClick={() => handleDeleteUser(user._id)}><i className="fa fa-trash-o"></i></Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h4>Orders</h4>
                <p>Order details from backend</p>
              </div>
              <div className="tab-inn">
                <div className="table-responsive table-desi">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>City</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{order["product-name"] || "N/A"}</td>
                          <td>
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit"
                            })}
                          </td>
                          <td>{order.city || "N/A"}</td>
                          <td>
                            <span
                              className={`label ${order.status === "Success"
                                  ? "label-success"
                                  : order.status === "Reject"
                                    ? "label-danger"
                                    : "label-warning"
                                }`}
                            >
                              {order.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && <p>No orders found.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
