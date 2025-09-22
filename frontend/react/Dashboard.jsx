import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="font-bold text-lg">Dashboard</h2>
          </div>
          <nav>
            <ul className="space-y-4">
              <li className="flex items-center text-black font-medium">
                {/* Home Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <a href="Projects.html">Projects</a>
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <a href="Datasets.html">Datasets</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header with Profile Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center">
              <a href="create.html" className="bg-black text-white px-4 py-2 rounded flex items-center text-sm mr-4 hover:bg-gray-900 transition-colors">
                <span className="mr-2">+</span> New Project
              </a>
              {/* Profile Section */}
              <div className="profile-dropdown relative inline-block">
                <button className="flex items-center focus:outline-none" aria-haspopup="true" aria-expanded="false" id="profileDropdownBtn" aria-label="User profile dropdown">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700" id="userAvatarSmall">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </button>
                {/* Dropdown content would go here */}
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Welcome back! Here's an overview of your annotation projects.</p>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Projects</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-green-600">+0 from last week</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Tasks</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-green-600">+0 today</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-green-600">+0% this month</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Team members</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-600">0 active now</p>
            </div>
          </div>
          {/* Recent Projects */}
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Recent Projects</h3>
            <div className="py-12 text-center text-gray-400">
              <p>No recent projects to display</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        <a href="#" className="flex flex-col items-center text-black" aria-current="page">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-xs">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span className="text-xs">Projects</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Datasets</span>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
