import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/api';

const OrderList = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
   
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/order-list/${userId}`);
                
                setOrders(response.data);
            } catch (err) {
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);

    

    return (
        <section className="max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
                </button>
            </div>

            {loading ? (
                <div className="text-center text-xl text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 text-xl">{error}</div>
            ) : (
                <>
                    {orders.length > 0 ? (
                        <>
                            <h4 className="text-2xl font-bold text-gray-800 mb-4">Ordered Items</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Address</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-600">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50 transition duration-300">
                                                <td className="px-6 py-4 border-b">{order.date}</td>
                                                <td className="px-6 py-4 border-b">{order.deliveryDetails.address}</td>
                                                <td className="px-6 py-4 border-b">
                                                    {order.total }
                                                </td>
                                                <td className="px-6 py-4 border-b">
                                                    {order.status3 ? (
                                                        order.status3
                                                    ) : order.cancel ? (
                                                        'Canceled'
                                                    ) : order.status2 ? (
                                                        order.status2
                                                    ) : (
                                                        order.status
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 border-b">
                                                    <Link
                                                        to={`ordered-products/${order._id}`}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                                    >
                                                        View Products
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <h5 className="text-center text-xl text-gray-600">This account have not any orders</h5>
                    )}
                </>
            )}
        </section>
    );
};

export default OrderList;
