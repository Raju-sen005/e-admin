import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import BlogAdd from "./pages/BlogAdd";
import AllBlogs from "./pages/AllBlogs";
import EditBlog from "./pages/EditBlog";
import AllGallery from "./pages/AllGallery";
import EditGallery from "./pages/EditGallery";
import AddGallery from "./pages/AddGallery";
import AdminSettings from "./pages/AdminSettings";
import OrdersPage from "./pages/OrdersPage";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";
import EnquiriesPage from "./pages/EnquiriesPage";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";

// ✅ Custom layout wrapper
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("adminToken");
  const hideForPaths = ["/", "/admin-login"]; // yahan layout hide hoga

  const shouldHideLayout = !isLoggedIn || hideForPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {!shouldHideLayout && (
        <div className="container-fluid sb2">
          <div className="row">
            <Sidebar />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* 👇 Login route */}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ✅ Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/user-all" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/product-all" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="/product-edit/:id" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />
          <Route path="/product-edit" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />
          <Route path="/product-view/:id" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />
          <Route path="/blog-add" element={<PrivateRoute><BlogAdd /></PrivateRoute>} />
          <Route path="/blog-all" element={<PrivateRoute><AllBlogs /></PrivateRoute>} />
          <Route path="/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
          <Route path="/gallery" element={<PrivateRoute><AllGallery /></PrivateRoute>} />
          <Route path="/add-gallery" element={<PrivateRoute><EditGallery /></PrivateRoute>} />
          <Route path="/gallery-add" element={<PrivateRoute><AddGallery /></PrivateRoute>} />
          <Route path="/edit-gallery/:id" element={<PrivateRoute><AddGallery /></PrivateRoute>} />
          <Route path="/admin-settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
          <Route path="/user-edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
          <Route path="/user-view/:id" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
          <Route path="/enquires" element={<PrivateRoute><EnquiriesPage /></PrivateRoute>} />
          <Route path="/setting" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
