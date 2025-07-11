import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Activity, Users, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../Urls/Urls';

const AnalyticsDashboard = ({ totalUsers, totalOrders, totalOrderedProducts, conversionRate }) => {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [userActivityData, setUserActivityData] = useState([])


  useEffect(() => {
    const fetchUserActivity = () => {
      axios.get(`${BASE_URL}/get-user-activity`, { withCredentials: true }).then((response) => {
        console.log('user activity', response);
        setUserActivityData(response.data.data)

      })
    }
    fetchUserActivity()
  }, [])

  // Sample analytics data
  const salesMetrics = {
    totalUsers,
    totalOrders,
    totalOrderedProducts,
    conversionRate
  };



  const userMetrics = {
    totalUsers,
    totalOrders,
    totalOrderedProducts,
    conversionRate
  };


  const sampleUserActivityData = [
    { name: 'Mon', active: 100, new: 340, returning: 3 },
    { name: 'Tue', active: 1350, new: 280, returning: 2 },
    { name: 'Wed', active: 140, new: 170, returning: 5 },
    { name: 'Thu', active: 1600, new: 920, returning: 9 },
    { name: 'Fri', active: 1500, new: 290, returning: 1 },
    { name: 'Sat', active: 1200, new: 250, returning: 12 },
    { name: 'Sun', active: 1100, new: 220, returning: 5 },
  ];


  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <Users className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{userMetrics.totalUsers}</p>
            <span className="text-green-500 text-sm">↑ 12.5% vs last period</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <ShoppingBag className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{userMetrics.totalOrders}</p>
            <span className="text-green-500 text-sm">↑ 8.2% vs last period</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Products Ordered </h3>
              <Users className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{userMetrics.totalOrderedProducts}</p>
            <span className="text-green-500 text-sm">↑ 15.3% vs last period</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Conversion Rate</h3>
              <Activity className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{userMetrics.conversionRate}%</p>
            <span className="text-red-500 text-sm">↓ 2.1% vs last period</span>
          </div>
        </div>


        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">

          <div className="flex justify-end items-center"> {/* Added justify-end to align right */}
            <select
              className="border rounded-lg px-3 py-1"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleUserActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="new" stroke="#10B981" />
                  <Line type="monotone" dataKey="returning" stroke="#8B5CF6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>




        {/* User Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Users</span>
                <span className="font-semibold">{userMetrics.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>New Users</span>
                <span className="font-semibold">{userMetrics.newUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Returning Users</span>
                <span className="font-semibold">{userMetrics.returningUsers}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Revenue </span>
                <span className="font-semibold">${salesMetrics.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Order Value</span>
                <span className="font-semibold">${salesMetrics.averageOrderValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Conversion Rate</span>
                <span className="font-semibold">{salesMetrics.conversionRate}%</span>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;