import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [twoStepEnabled, setTwoStepEnabled] = useState(false);

    const handleTwoStepToggle = () => {
        setTwoStepEnabled((prev) => !prev);
    };

    const goToForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Account Settings
            </h2>

            {/* Change Password */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Change Password
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Protect your account by changing your password regularly.
                </p>
                <button
                    onClick={goToForgotPassword}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Change Password
                </button>
            </div>

            {/* 2-Step Verification */}
            <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                    2-Step Verification
                </h3>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={twoStepEnabled}
                        onChange={handleTwoStepToggle}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-3 text-gray-700">
                        Enable 2-Step Verification
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account by requiring a verification code during login.
                </p>
            </div>
        </div>
    );
};

export default Settings;
