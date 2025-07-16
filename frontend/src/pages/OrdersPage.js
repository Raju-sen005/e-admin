import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => {
        console.log("Orders response:", res.data); // 👈 CHECK THIS
        setOrders(res.data);
      })
      .catch(err => console.error("Order fetch error", err));

  }, []);

  return (
    <div className="container-fluid sb2">
      <div className="row">
        <div className="sb2-1">
          {/* Sidebar */}
          <div className="sb2-13">
            <ul className="collapsible" data-collapsible="accordion">
              <li><a href="/dashboard"><i className="fa fa-bar-chart"></i> Dashboard</a></li>
              <li><a href="/users"><i className="fa fa-user"></i> Users</a></li>
              <li><a href="/products"><i className="fa fa-rss"></i> Products</a></li>
              <li><a href="/blogs"><i className="fa fa-rss"></i> Blog</a></li>
              <li><a href="/gallery"><i className="fa fa-rss"></i> Gallery</a></li>
              <li><a href="/orders" className="menu-active"><i className="fa fa-rss"></i> Orders</a></li>
              <li><a href="/enquiries"><i className="fa fa-rss"></i> Enquires</a></li>
            </ul>
          </div>
        </div>

        <div className="sb2-2">
          <div className="sb2-2-2">
            <ul>
              <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
              <li className="active-bre"><a href="#"> Orders</a></li>
            </ul>
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
                            <tr key={order._id || index}>
                              <td>{index + 1}</td>
                                <td>{order["product-name"] || "N/A"}</td>
                              <td>
                                {order.date
                                  ? new Date(order.date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                  })
                                  : 'N/A'}
                              </td>
                              <td>{order.city || "N/A"}</td>
                              <td>
                                <span className={`label ${order.status === "Success"
                                    ? "label-success"
                                    : order.status === "Reject"
                                      ? "label-danger"
                                      : "label-warning"
                                  }`}>
                                  {order.status || "Pending"}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && (
                            <tr>
                              <td colSpan="5">No orders found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
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

export default OrdersPage;
