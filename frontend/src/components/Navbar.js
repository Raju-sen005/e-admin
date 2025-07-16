import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="container-fluid sb1">
            <div className="row">
                {/* <!--== LOGO ==--> */}
                <div className="col-md-8 col-sm-8 col-xs-6 sb1-1">
                    <Link to="#" className="btn-close-menu"><i className="fa fa-times" aria-hidden="true"></i></Link>
                    <Link to="#" className="atab-menu"><i className="fa fa-bars tab-menu" aria-hidden="true"></i></Link>
                    <Link to="/" className="logo"><img src="images/logo1.png" alt="" />
                    </Link>
                </div>

                {/* <!--== MY ACCCOUNT ==--> */}
                <div className="col-md-4 col-sm-4 col-xs-6 text-end">
                    {/* <!-- Dropdown Trigger --> */}
                    <Link className='waves-effect dropdown-button top-user-pro' href='#' data-activates='top-menu'><img src="images/user/6.png" alt="" />My Account <i className="fa fa-angle-down" aria-hidden="true"></i>

                    </Link>

                    {/* <!-- Dropdown Structure --> */}
                    <ul id='top-menu' className='dropdown-content top-menu-sty'>
                        <li><Link to="/setting" className="waves-effect"><i className="fa fa-cogs" aria-hidden="true"></i>Admin Setting</Link>
                        </li>
                        <li className="divider"></li>
                        <li><Link to="/" className="ho-dr-con-last waves-effect"><i className="fa fa-sign-in" aria-hidden="true"></i> Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
