import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const SuperAdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [superAdminName, setSuperAdminName] = useState("");
  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const token = localStorage.getItem("superadmin_token");
    if (token) {
      const superAdmin = JSON.parse(localStorage.getItem("superadmin_user"));
      if (superAdmin && superAdmin.Name) {
        setSuperAdminName(superAdmin.Name);
      } else {
        setSuperAdminName("Super Admin");
      }
    }
  });

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <Link to="/">
            <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
              SuperAdmin
            </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link to="/all-users" className="hover:text-blue-600">
              All Users
            </Link>
            <Link to="/all-admins" className="hover:text-blue-600">
              All Amdins
            </Link>
            <Link to="/all-deliveries" className="hover:text-blue-600">
              All Deliveries
            </Link>
            <Link to="/edit-user-display" className="hover:text-blue-600">
              Edit User Display
            </Link>
            <Link to="/total-orders" className="hover:text-blue-600">
              Order History
            </Link>
            <Link to="/settings" className="hover:text-blue-600">
              Settings
            </Link>
          </nav>

            {superAdminName && (
              <>
          {/* Profile */}
          <div className="hidden md:flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/300"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700 text-sm">{superAdminName}</span>

            <button
              onClick={() => {
                localStorage.removeItem("superadmin_token");
                localStorage.removeItem("superadmin_user");
                window.location.href = "/login";
              }}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
            >
              Logout
            </button>
          </div>
          </>
              )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-2 space-y-2 text-gray-700 font-medium">
              <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <Link to="/all-users" className="hover:text-blue-600">
              All Users
            </Link>
            <Link to="/all-admins" className="hover:text-blue-600">
              All Amdins
            </Link>
            <Link to="/all-deliveries" className="hover:text-blue-600">
              All Deliveries
            </Link>
            <Link to="/edit-user-display" className="hover:text-blue-600">
              Edit User Display
            </Link>
            <Link to="/total-orders" className="hover:text-blue-600">
              Order History
            </Link>
            <Link to="/settings" className="hover:text-blue-600">
              Settings
            </Link>
            <div className="flex items-center space-x-2 mt-2">
              <img
                src="https://i.pravatar.cc/300"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span>{superAdminName}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("superadmin_token");
                  localStorage.removeItem("superadmin_user");
                  window.location.href = "/login";
                }}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SuperAdminHeader;
