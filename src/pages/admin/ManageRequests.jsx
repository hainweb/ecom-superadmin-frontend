import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Store,
  Mail,
  Phone,
  Calendar,
  FileText,
  Building,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const ManageRequests = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchMerchantRequests();
  }, []);

  const fetchMerchantRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/get-merchant-requests`);
      setMerchants(response.data);
    } catch (error) {
      console.error("Error fetching merchant requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (merchant) => {
    setSelectedMerchant(merchant);
    setShowConfirmation(true);
  };

  const handleConfirmApprove = async () => {
    if (!selectedMerchant) return;

    try {
      setProcessingId(selectedMerchant._id);
      const response = await axios.post(`${BASE_URL}/approve-merchant`, {
        merchantId: selectedMerchant._id,
      });

      if (response.data.status) {
        setMerchants(merchants.filter((m) => m._id !== selectedMerchant._id));
        setShowConfirmation(false);
        setSelectedMerchant(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error approving merchant:", error);
      alert("Failed to approve merchant. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setSelectedMerchant(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading merchant requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Merchant Approval Requests
          </h1>
          <p className="text-gray-600">
            Review and approve pending merchant registrations
          </p>
        </div>

        {merchants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Pending Requests
            </h3>
            <p className="text-gray-500">
              All merchant requests have been processed
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {merchants.map((merchant) => (
              <div
                key={merchant._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {merchant.Name || "N/A"}
                      </h3>
                      {merchant.BusinessName && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {merchant.BusinessName}
                        </p>
                      )}
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded">
                      Pending
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {merchant.Email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{merchant.Email}</span>
                      </div>
                    )}

                    {merchant.Mobile && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{merchant.Mobile}</span>
                      </div>
                    )}

                    {merchant.BusinessType && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Store className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{merchant.BusinessType}</span>
                      </div>
                    )}

                    {merchant.GSTNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          GST: {merchant.GSTNumber}
                        </span>
                      </div>
                    )}

                    {merchant.createdDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>Applied: {formatDate(merchant.createdDate)}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleApproveClick(merchant)}
                    disabled={processingId === merchant._id}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingId === merchant._id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Approve Merchant
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirmation && selectedMerchant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 rounded-full p-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Confirm Approval
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to approve{" "}
              <strong>{selectedMerchant.Name}</strong>
              {selectedMerchant.BusinessName &&
                ` (${selectedMerchant.BusinessName})`}
              ? This will grant them access to the merchant platform.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelConfirmation}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApprove}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
