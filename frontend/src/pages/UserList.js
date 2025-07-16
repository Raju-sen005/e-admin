// client/src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("Fetched Users:", res.data); // 🔍 Check yaha pe
        setUsers(res.data);
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="sb2-2">
      <div className="sb2-2-2">
        <ul>
          <li><a href="#"><i className="fa fa-home"></i> Home</a></li>
          <li className="active-bre"><a href="#">Users</a></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h4>Total Users</h4>
                <p>Users fetched from the backend.</p>
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
                      {users.map(user => (
                        <tr key={user._id}>
                          <td>
                            <span className="list-enq-name">
                              {user.firstName} {user.lastName}
                            </span>
                          </td>

                          <td>{user.email}</td>
                          <td><a href={`/user-view/${user._id}`}><i className="fa fa-eye"></i></a></td>
                          <td><a href={`/user-edit/${user._id}`}><i className="fa fa-pencil-square-o"></i></a></td>
                          <td><a href="#" onClick={() => handleDelete(user._id)}><i className="fa fa-trash-o"></i></a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && <p>No users found.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function handleDelete(id) {
    if (window.confirm("Delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(() => setUsers(prev => prev.filter(u => u._id !== id)))
        .catch(err => alert("Failed to delete user"));
    }
  }
};

export default UserList;
