import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sb2-1">
            {/* <!--== USER INFO ==--> */}
            <div className="sb2-12">

            </div>
            {/* <!--== LEFT MENU ==--> */}
            <div className="sb2-13">
                <ul className="collapsible" data-collapsible="accordion">
                    <li><Link to="/" className="menu-active"><i className="fa fa-bar-chart" aria-hidden="true"></i> Dashboard</Link>
                    </li>
                    <li><Link to="/user-all" className="collapsible-header"><i className="fa fa-user" aria-hidden="true"></i> Users</Link>
                    </li>

                    <li><Link to="/#" className="collapsible-header"><i className="fa fa-rss" aria-hidden="true"></i>Product</Link>
                        <div className="collapsible-body left-sub-menu">
                            <ul>
                                <li><Link to="/product-all">All Product</Link>
                                </li>
                                <li><Link to="/product-edit">Add Product</Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li><Link to="#" className="collapsible-header"><i className="fa fa-rss" aria-hidden="true"></i> Blog</Link>
                        <div className="collapsible-body left-sub-menu">
                            <ul>
                                <li><Link to="/blog-all">All Blogs</Link>
                                </li>
                                <li><Link to="/blog-add">Add Blog</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="#" className="collapsible-header"><i className="fa fa-rss" aria-hidden="true"></i>Gallery</Link>
                        <div className="collapsible-body left-sub-menu">
                            <ul>
                                <li><Link to="/gallery">All Gallery</Link>
                                </li>
                                <li><Link to="/gallery-add">Add Gallery</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/orders" className="collapsible-header"><i className="fa fa-rss" aria-hidden="true"></i>Orders</Link>
                    </li>
                    <li><Link to="/enquires" className="collapsible-header"><i className="fa fa-rss" aria-hidden="true"></i>Enquires</Link>
                    </li>
                </ul>
            </div>
        </div>


    );
};

export default Sidebar;
