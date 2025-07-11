import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/api";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
  });

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name || !formData.Email) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/create-admin`, formData);
      if (response.status === 201) {
        setFormData({ Name: "", Email: "" });
        alert(response.data.message || "Admin created successfully");
      } else {
        alert("Failed to create admin");
      }
    } catch (error) {
      alert("Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Create Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Password will be auto-generated
          </p>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
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
                Creating...
              </span>
            ) : (
              "Create Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
