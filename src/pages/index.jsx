import React from "react";
import { UserPlus, Truck, Gift, Store } from "lucide-react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Super Admin Panel
        </h1>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Manage Merchant Request Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center space-x-4 mb-4">
          <Store className="text-purple-600" size={32} />
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Merchant Requests
          </h2>
        </div>
        <p className="text-gray-600">
          Review and approve new merchant registration requests.
        </p>
        <Link to="/merchant-requests">
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            View Requests
          </button>
        </Link>
      </div>

      {/* Admin Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center space-x-4 mb-4">
          <UserPlus className="text-blue-600" size={32} />
          <h2 className="text-xl font-semibold text-gray-800">Create Admin</h2>
        </div>
        <p className="text-gray-600">
          Add and manage administrator accounts with full access rights.
        </p>
        <Link to="/create-admin">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Add Admin
          </button>
        </Link>
      </div>

      {/* Delivery Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center space-x-4 mb-4">
          <Truck className="text-green-600" size={32} />
          <h2 className="text-xl font-semibold text-gray-800">Create Delivery</h2>
        </div>
        <p className="text-gray-600">
          Assign delivery personnel with roles and access limits.
        </p>
        <Link to="/create-delivery">
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Add Delivery
          </button>
        </Link>
      </div>

      {/* Coupon Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center space-x-4 mb-4">
          <Gift className="text-yellow-600" size={32} />
          <h2 className="text-xl font-semibold text-gray-800">View Coupons</h2>
        </div>
        <p className="text-gray-600">View and manage discount coupons.</p>
        <Link to="/all-coupons">
          <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
            View
          </button>
        </Link>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Index;
