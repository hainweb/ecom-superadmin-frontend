import SuperAdminHeader from "./components/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./pages";
import CreateAdmin from "./pages/admin/CreateAdmin";
import CreateDelivery from "./pages/delivery/CreateDelivery";
import AllAdmin from "./pages/admin/AllAdmins";
import AllDeliveries from "./pages/delivery/AllDeliveries";
import UsersList from "./pages/users/UsersList";
import OrderList from "./pages/users/OrderList";
import OrderedProducts from "./pages/users/OrderedProducts";
import Main from "./pages/Dashboard/Dashboard";
import ViewProducts from "./pages/products/ViewProduct";
import ProductDisplay from "./pages/products/Product";
import Sidebar from "./pages/UserDisplay/Sidebar";
import AddCategories from "./pages/UserDisplay/AddCategories";
import OrdersTable from "./pages/TotalOrders/Orders";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Settings from "./pages/settings/Settings";
import AllCoupons from "./pages/coupons/AllCoupons";

function App() {
  return (
    <div className="App">
      <Router>
        <SuperAdminHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create-admin"
            element={
              <ProtectedRoute>
                <CreateAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-delivery"
            element={
              <ProtectedRoute>
                <CreateDelivery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-admins"
            element={
              <ProtectedRoute>
                <AllAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-deliveries"
            element={
              <ProtectedRoute>
                <AllDeliveries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-coupons"
            element={
              <ProtectedRoute>
                <AllCoupons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-list/:userId"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-list/:userId/ordered-products/:orderId"
            element={
              <ProtectedRoute>
                <OrderedProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ViewProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDisplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user-display"
            element={
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-categories"
            element={
              <ProtectedRoute>
                <AddCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/total-orders"
            element={
              <ProtectedRoute>
                <OrdersTable />
              </ProtectedRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
