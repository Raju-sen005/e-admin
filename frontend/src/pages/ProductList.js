import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./product.css"; // optional styling

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="sb2-2">
      <div className="sb2-2-2">
        <ul>
          <li><Link to="#"><i className="fa fa-home"></i> Home</Link></li>
          <li className="active-bre"><Link to="#">Product</Link></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h3>Products</h3>
              </div>
              <div className="tab-inn">
                <div className="table-responsive table-desi">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product img</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td><img src={product.image} className="product-icn" alt="" /></td>
                          <td><span className="list-enq-name">{product.name}</span></td>
                          <td className="wc-50">{product.description}</td>
                          <td><Link to={`/product-view/${product._id}`}><i className="fa fa-eye"></i></Link></td>
                          <td><Link to={`/product-edit/${product._id}`}><i className="fa fa-pencil-square-o"></i></Link></td>
                          <td><Link to="#" onClick={() => handleDelete(product._id)}><i className="fa fa-trash-o"></i></Link></td>
                        </tr>
                      ))}
                      {products.length === 0 && <tr><td colSpan="6">No products found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProductList;
