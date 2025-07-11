import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/api";

const CreateDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.Name || !formData.Email) {
        alert("Please fill in all fields");
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/create-delivery`,
        formData
      );
      if (response.status === 201) {
        setFormData({ Name: "", Email: "" });
        alert(response.data.message || "Delivery created successfully");
      } else {
        alert("Failed to create delivery");
      }
    } catch (error) {
      console.error("Error creating delivery:", error);
      alert("Failed to create delivery");
      return;
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Create Delivery
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
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Password will be auto-generated
          </p>
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
                Creating...
              </span>
            ) : (
              "Create Delivery"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDelivery;
