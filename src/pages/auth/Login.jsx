import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  // If already logged in, redirect to home
  const token = localStorage.getItem("superadmin_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.Email || !formData.Password) {
        alert("Please fill in all fields");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${BASE_URL}/login`, formData);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("superadmin_token", response.data.token);
        localStorage.setItem(
          "superadmin_user",
          JSON.stringify(response.data.user)
        );
        alert("Login successful");
        window.location.href = "/";
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login as Super Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <Link to="/forgot-password">
            <p className="text-sm text-blue-500 mt-2 hover:text-blue-600 ">
              Forgot your password?
            </p>
          </Link>
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? (
              <span>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
