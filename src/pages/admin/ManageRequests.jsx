import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Store,
  Mail,
  Phone,
  Calendar,
  FileText,
  Building,
  MapPin,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Merchant Approvals
          </h1>
          <p className="text-slate-600 text-lg">
            Review and approve pending merchant registrations
          </p>
        </div>

        {merchants.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-slate-200">
            <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              No Pending Requests
            </h3>
            <p className="text-slate-500 text-lg">
              All merchant requests have been processed
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {merchants.map((merchant) => (
              <div
                key={merchant._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {merchant.Name || "N/A"}
                      </h3>
                      {merchant.BusinessName && (
                        <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-1">
                          <Building className="w-4 h-4 text-slate-400" />
                          {merchant.BusinessName}
                        </p>
                      )}
                    </div>
                    <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
                      Pending
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {merchant.Email && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{merchant.Email}</span>
                      </div>
                    )}

                    {merchant.Mobile && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{merchant.Mobile}</span>
                      </div>
                    )}

                    {merchant.BusinessType && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Store className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{merchant.BusinessType}</span>
                      </div>
                    )}

                    {merchant.GSTNumber && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <FileText className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">GST: {merchant.GSTNumber}</span>
                      </div>
                    )}

                    {merchant.BusinessAddress && (
                      <div className="flex items-start gap-2.5 text-sm text-slate-700">
                        <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{merchant.BusinessAddress}</span>
                      </div>
                    )}

                    {merchant.createdAt && (
                      <div className="flex items-center gap-2.5 text-sm text-slate-500 pt-2 border-t border-slate-100">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>Applied {formatDate(merchant.createdAt)}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleApproveClick(merchant)}
                    disabled={processingId === merchant._id}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {processingId === merchant._id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 rounded-full p-2.5">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Confirm Approval
              </h3>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to approve{" "}
              <strong className="text-slate-900">{selectedMerchant.Name}</strong>
              {selectedMerchant.BusinessName &&
                ` (${selectedMerchant.BusinessName})`}
              ? This will grant them access to the merchant platform.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleCancelConfirmation}
                className="flex-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApprove}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
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
