import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { Loading } from "../../components/Loading";

const OrderedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ordered-products/${orderId}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch ordered products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderId]);

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Ordered Products
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-undo-2"
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
         <Loading/>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-16 bg-white rounded-lg shadow">
                No products found for this order.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col border border-gray-200"
                >
                  <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-md mb-4 bg-gray-50">
                    <img
                      src={product.product.thumbnailImage}
                      alt={product.product.Name}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <h5 className="text-base font-medium text-gray-800 truncate mb-1">
                    {product.product.Name}
                  </h5>
                  <p className="text-sm text-gray-500 mb-2">
                    Category:{" "}
                    <span className="text-gray-700 font-medium">
                      {product.product.Category}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm line-through text-gray-400">
                      ₹{product.product.SellingPrice}
                    </span>
                    <span className="text-base font-semibold text-green-600">
                      ₹{product.product.Price}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      Qty: {product.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderedProducts;
