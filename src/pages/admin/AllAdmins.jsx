import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";

function AllAdmin() {
  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-all-admins`);

        const data = await response.data;
        console.log("data is ", data);

        setAllAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-admin/${adminId}`
      );
      if (response.status === 200) {
        setAllAdmins(allAdmins.filter((admin) => admin._id !== adminId));
        alert("Admin deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin");
    }
  };

  const handleBlock = async (adminId) => {
    if (!window.confirm("Are you sure you want to block this admin?")) {
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/block-admin/${adminId}`);
      if (response.status === 200) {
        setAllAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId ? { ...admin, isBlock: true } : admin
          )
        );
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin");
    }
  };

  const handleUnBlock = async (adminId) => {
    if (!window.confirm("Are you sure you want to unblock this admin?")) {
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/unblock-admin/${adminId}`);
      if (response.status === 200) {
        setAllAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId ? { ...admin, isBlock: false } : admin
          )
        );
      }
    } catch (error) {
      console.error("Error unblock admin:", error);
      alert("Failed to unblock admin");
    }
  };

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Admins</h2>
        </div>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table
            className="min-w-full divide-y divide-gray-200"
            id="allUsersTable"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  All Admins
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {allAdmins.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Admins Found
                  </td>
                </tr>
              ) : (
                allAdmins.map((admin, index) => (
                  <tr key={admin._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.Name}
                      {admin.isBlock && (
                        <span className="inline-block px-3 py-2 bg-red-200 text-red-700 rounded text-xs font-semibold mr-2">
                          Blocked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {admin.Email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/allUsers-Orders/${admin._id}`}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold transition"
                      >
                        View Added Products
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      {admin.isBlock ? (
                        <>
                          <button
                            className="inline-block px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 text-xs font-semibold transition"
                            onClick={() => handleUnBlock(admin._id)}
                          >
                            Unblock
                          </button>
                        </>
                      ) : (
                        <button
                          className="inline-block px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold transition"
                          onClick={() => handleBlock(admin._id)}
                        >
                          Block
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AllAdmin;
