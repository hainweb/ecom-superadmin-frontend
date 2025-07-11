import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api/api';

const UsersList = () => { 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/all-users`);
                console.log(response.data); 
                if (Array.isArray(response.data)) {
                    setUsers(response.data); 
                } else {
                    setError('Data is not in the expected format');
                }
            } catch (err) {
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime())
            ? "December 18, 2024 at 7:08:20 AM" // Fallback date
            : date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
    };




    return (
        <section className="min-h-screen bg-gray-100 p-5">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="text-lg font-semibold text-blue-600">Loading...</div>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-full">
                    <div className="text-lg font-semibold text-red-600">{error}</div>
                </div>
            ) : (
                <div className="container mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <div className="max-h-[700px] sm:max-h-[600px] overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-blue-500 text-white sticky top-0">
                                <tr>
                                    <th className="py-3 px-4">No</th>
                                    <th className="py-3 px-4">Users</th>
                                    <th className="py-3 px-4">Mobile</th>
                                    <th className="py-3 px-4">No of Orders</th>
                                    <th className="py-3 px-4">Orders</th>
                                    <th className="py-3 px-4">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                                                } hover:bg-gray-200`}
                                        >
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">{user.Name}</td>
                                            <td className="py-3 px-4">{user.Mobile}</td>
                                            <td className="py-3 px-4">{user.orderCount}</td>
                                            <td className="py-3 px-4">
                                                <Link
                                                    to={`/order-list/${user._id}`}
                                                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                                >
                                                    View Orders
                                                </Link>

                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm text-gray-600">
                                                    Joined: {formatDate(user.CreatedAt)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Last Active: {formatDate(user.LastActive)}
                                                </p>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-3 px-4 text-center">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UsersList;
