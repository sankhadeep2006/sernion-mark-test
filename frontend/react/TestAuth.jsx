import React, { useState } from "react";

const TestAuth = () => {
  // For demo, only static UI is ported. Real API logic would use hooks and context.
  const [backendStatus, setBackendStatus] = useState("Checking...");
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
              <span className="text-4xl">🔐</span>
              Sernion Mark Authentication Test
            </h1>
          </div>
          <div className="p-8">
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-800">Backend Status:</span>
                <span className="text-blue-600 font-medium">{backendStatus}</span>
              </div>
            </div>
            {/* ...existing code for test sections... */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* API Connection Test */}
              <div className="test-section bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  API Connection Test
                </h2>
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                  Test Backend Connection
                </button>
                <div className="mt-4"></div>
              </div>
              {/* ...other test sections... */}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Navigation</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="signup.html" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              <span className="text-lg">📝</span>
              Sign Up Page
            </a>
            <a href="login.html" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              <span className="text-lg">🔑</span>
              Login Page
            </a>
            <a href="dashboard.html" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
              <span className="text-lg">📊</span>
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
