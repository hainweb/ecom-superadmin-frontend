import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";

function AllDeliveries() {
  const [allDelivery, setAllDelivery] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-all-deliveries`);
        setAllDelivery(response.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  const handleDelete = async (deliveryId) => {
    if (!window.confirm("Are you sure you want to delete this delivery?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-delivery/${deliveryId}`
      );
      if (response.status === 200) {
        setAllDelivery(
          allDelivery.filter((delivery) => delivery._id !== deliveryId)
        );
        alert("Delivery deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting delivery:", error);
      alert("Failed to delete delivery");
    }
  };


   const handleBlock = async (deliveryId) => {
      if (!window.confirm("Are you sure you want to block this delivery?")) {
        return;
      }
  
      try {
        const response = await axios.put(`${BASE_URL}/block-delivery/${deliveryId}`);
        if (response.status === 200) {
          setAllDelivery((prevDelivery) =>
            prevDelivery.map((delivery) =>
              delivery._id === deliveryId ? { ...delivery, isBlock: true } : delivery
            )
          );
        }
      } catch (error) {
        console.error("Error blocking delivery:", error);
        alert("Failed to block delivery");
      }
    };

   const handleUnBlock = async (deliveryId) => {
      if (!window.confirm("Are you sure you want to Unblock this delivery?")) {
        return;
      }
   
      try {
        const response = await axios.put(`${BASE_URL}/unblock-delivery/${deliveryId}`);
        if (response.status === 200) {
          setAllDelivery((prevDelivery) =>
            prevDelivery.map((delivery) =>
              delivery._id === deliveryId ? { ...delivery, isBlock: false } : delivery
            )
          );
        }
      } catch (error) {
        console.error("Error unblocking delivery:", error);
        alert("Failed to unblock delivery");
      }
    };

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Delivery</h2>
        </div>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
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
              {allDelivery.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 text-sm"
                  >
                    No Delivery Records Found
                  </td>
                </tr>
              ) : (
                allDelivery.map((delivery, index) => (
                  <tr
                    key={delivery._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {delivery.Name} {delivery.isBlock && (
                        <span className="inline-block px-3 py-2 bg-red-200 text-red-700 rounded text-xs font-semibold mr-2">
                          Blocked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {delivery.Email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        to={`/admin/allUsers-Orders/${delivery._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold"
                      >
                        View Delivery Products
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm flex flex-wrap gap-2">
                      {delivery.isBlock?
                      
                      <button
                        className="inline-block px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 text-xs font-semibold transition"
                        onClick={() => handleUnBlock(delivery._id)}
                      >
                        Unblock
                      </button>
                      :
                      <button
                        className="inline-block px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold transition"
                        onClick={() => handleBlock(delivery._id)}
                      >
                        Block
                      </button>
                    }
                      <button
                        onClick={() => handleDelete(delivery._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
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

export default AllDeliveries;
