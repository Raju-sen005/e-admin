import React, { useEffect, useState } from "react";
import axios from "axios";

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/enquiries")
      .then(res => setEnquiries(res.data))
      .catch(err => console.error("Failed to fetch enquiries", err));
  }, []);

  return (
    <div className="container-fluid sb2">
      <div className="row">
        {/* Sidebar */}
        <div className="sb2-1">
          <div className="sb2-13">
            <ul className="collapsible" data-collapsible="accordion">
              <li><a href="/dashboard"><i className="fa fa-bar-chart"></i> Dashboard</a></li>
              <li><a href="/users"><i className="fa fa-user"></i> Users</a></li>
              <li><a href="/products"><i className="fa fa-rss"></i> Product</a></li>
              <li><a href="/blogs"><i className="fa fa-rss"></i> Blog</a></li>
              <li><a href="/gallery"><i className="fa fa-rss"></i> Gallery</a></li>
              <li><a href="/orders"><i className="fa fa-rss"></i> Orders</a></li>
              <li><a href="/enquiries" className="menu-active"><i className="fa fa-rss"></i> Enquiries</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="sb2-2">
          <div className="sb2-2-2">
            <ul>
              <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
              <li className="active-bre"><a href="#">Enquiries</a></li>
            </ul>
          </div>

          <div className="sb2-2-3">
            <div className="row">
              <div className="col-md-12">
                <div className="box-inn-sp">
                  <div className="inn-title">
                    <h4>Orders</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>

                  <div className="tab-inn">
                    <div className="table-responsive table-desi">
                      <table className="highlight">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Phone Number</th>
                            <th>Message</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No enquiries found.</td></tr>
                          ) : (
                            enquiries.map((enq, index) => (
                              <tr key={index}>
                                <td>{enq.name}</td>
                                <td>{enq.email}</td>
                                <td>{enq.subject}</td>
                                <td>{enq.phone}</td>
                                <td>{enq.message}</td>
                              </tr>
                            ))
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

export default EnquiriesPage;
