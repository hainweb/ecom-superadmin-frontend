import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Activity,
  Users,
  ShoppingBag,
  ShoppingBasket,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

// Custom Legend Component
const renderCustomLegend = () => {
  return (
    <div className="flex justify-center space-x-6 mt-4">
      <div className="flex items-center">
        <span
          className="w-3 h-3 inline-block mr-1 rounded-full"
          style={{ backgroundColor: '#3B82F6' }}
        />
        <span>Active</span>
      </div>
      <div className="flex items-center">
        <span
          className="w-3 h-3 inline-block mr-1 rounded-full"
          style={{ backgroundColor: '#10B981' }}
        />
        <span>New</span>
      </div>
      <div className="flex items-center">
        <span
          className="w-3 h-3 inline-block mr-1 rounded-full"
          style={{ backgroundColor: '#8B5CF6' }}
        />
        <span>Returning</span>
      </div>
    </div>
  );
};

const AnalyticsDashboard = ({ dataLoading,
  totalUsers,
  totalOrders,
  totalOrderedProducts,
  totalRevenue,
  averageOrderValue,
  conversionRate,

  setCurrentPage
}) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [userActivityData, setUserActivityData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchUserActivity = () => {
      setLoading(true);
      axios
        .get(`${BASE_URL}/get-user-activity`, { withCredentials: true })
        .then((response) => {
          console.log('user activity', response);
          setUserActivityData(response.data.data);
          setDateRange(response.data.dateRange);
        })
        .catch((error) => {
          console.error('Error fetching user activity:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUserActivity();
  }, []);

  // Helper function to format a Date as yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Function to change the date range based on arrow click
  const changeDateRange = (direction) => {
    // Ensure we have a valid dateRange from API
    if (!dateRange.start || !dateRange.end) return;

    const currentStart = new Date(dateRange.start);
    const currentEnd = new Date(dateRange.end);
    let newStart, newEnd;

    // Change date range by 7 days (you can adjust this as needed)
    const dayShift = 7 * 24 * 60 * 60 * 1000;
    if (direction === 'prev') {
      newStart = new Date(currentStart.getTime() - dayShift);
      newEnd = new Date(currentEnd.getTime() - dayShift);
    } else if (direction === 'next') {
      newStart = new Date(currentStart.getTime() + dayShift);
      newEnd = new Date(currentEnd.getTime() + dayShift);
    }

    const newStartStr = formatDate(newStart);
    const newEndStr = formatDate(newEnd);

    // Optionally, you can update the state optimistically here:
    // setDateRange({ start: newStartStr, end: newEndStr });

    // Fetch data for the new date range
    setLoading(true);
    axios
      .get(`${BASE_URL}/get-user-activity`, {
        params: { start: newStartStr, end: newEndStr },
        withCredentials: true
      })
      .then((response) => {
        setUserActivityData(response.data.data);
        // Update the date range based on the API response
        setDateRange(response.data.dateRange);
      })
      .catch((error) => {
        console.error('Error fetching user activity for new date range:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // If no data is available from API, use sample data.
  const sampleUserActivityData = [
    { name: 'Mon', active: 100, new: 340, returning: 3 },
    { name: 'Tue', active: 1350, new: 280, returning: 2 },
    { name: 'Wed', active: 140, new: 170, returning: 5 },
    { name: 'Thu', active: 1600, new: 920, returning: 9 },
    { name: 'Fri', active: 1500, new: 290, returning: 1 },
    { name: 'Sat', active: 1200, new: 250, returning: 12 },
    { name: 'Sun', active: 1100, new: 220, returning: 5 }
  ];

  // Use API data if available; otherwise, fallback to sample data.
  const chartData =
    userActivityData && userActivityData.length
      ? userActivityData
      : sampleUserActivityData;

  // Calculate totals for active, new, and returning users from the chart data
  const totalActiveUsers = chartData.reduce((sum, day) => sum + day.active, 0);
  const totalNewUsers = chartData.reduce((sum, day) => sum + day.new, 0);
  const totalReturningUsers = chartData.reduce(
    (sum, day) => sum + day.returning,
    0
  );

  // Sample metrics (you might want to pass more detailed values as props)
  const salesMetrics = {
    totalUsers,
    totalOrders,
    totalOrderedProducts,
    conversionRate,
    totalRevenue,
    averageOrderValue,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation can be added here */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {dataLoading ? (
    // Render 4 skeleton cards
    Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-300 rounded w-20 h-4" />
          <div className="bg-gray-300 rounded w-6 h-6" />
        </div>
        <div className="bg-gray-300 rounded w-full h-8" />
        <div className="mt-4 bg-gray-300 rounded w-1/2 h-4" />
      </div>
    ))
  ) : (
    // Render actual cards when loading is false
    <>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <Users className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{salesMetrics.totalUsers}</p>
            <span className="text-green-500 text-sm">
              ↑ 12.5% vs last period
            </span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <ShoppingBag className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{salesMetrics.totalOrders}</p>
            <span className="text-green-500 text-sm">
              ↑ 8.2% vs last period
            </span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Total Products Ordered</h3>
              <ShoppingBasket className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">
              {salesMetrics.totalOrderedProducts}
            </p>
            <span className="text-green-500 text-sm">
              ↑ 15.3% vs last period
            </span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">Conversion Rate</h3>
              <Activity className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{salesMetrics.conversionRate}%</p>
            <span className="text-red-500 text-sm">
              ↓ 2.1% vs last period
            </span>
          </div>
</>
  )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">

          <div className="bg-white rounded-lg shadow p-6 relative">
            {/* Date Range with Arrow Buttons */}
            <div className="flex justify-center items-center mb-2">
              <button
                onClick={() => changeDateRange('prev')}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <ArrowLeft size={20} />
              </button>
              <p className="mx-4">
                {dateRange.start} to {dateRange.end}
              </p>
              <button
                onClick={() => changeDateRange('next')}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <p className="text-gray-700 font-semibold">Loading...</p>
              </div>
            )}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    content={renderCustomLegend}
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 5, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 5, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={2200}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="returning"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 5, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={2400}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Totals and Sales Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Updated User Totals Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">User Activity Totals</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Users</span>
                <span className="font-semibold">{totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Users from {dateRange.start} to {dateRange.end} </span>
                <span className="font-semibold">{totalActiveUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span> New Users from {dateRange.start} to {dateRange.end} </span>
                <span className="font-semibold">{totalNewUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span> Returning Users from {dateRange.start} to {dateRange.end} </span>
                <span className="font-semibold">{totalReturningUsers}</span>
              </div>
            </div>
          </div>

          {/* Sales Performance Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Revenue</span>
                <span className="font-semibold">₹{salesMetrics.totalRevenue || '0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Order Value</span>
                <span className="font-semibold">₹{salesMetrics.averageOrderValue || '0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Conversion Rate</span>
                <span className="font-semibold">{salesMetrics.conversionRate}%</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setCurrentPage('revenue')}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  More details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
