import React, { useState } from "react";

const defaultStates = {
  projectUpdates: false,
  annotationStatus: true,
  mentionsComments: false,
  systemAlerts: false,
};

const Notification = () => {
  const [states, setStates] = useState(() => {
    const saved = localStorage.getItem("notificationTogglesStyled");
    return saved ? JSON.parse(saved) : { ...defaultStates };
  });

  const handleToggle = (id) => {
    const newStates = { ...states, [id]: !states[id] };
    setStates(newStates);
    localStorage.setItem("notificationTogglesStyled", JSON.stringify(newStates));
  };

  return (
    <div className="bg-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-start">
        <div className="px-6 pt-12 pb-6">
          <nav>
            <ul className="space-y-8">
              <li className="flex items-center text-black font-medium space-x-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Dashboard</span>
              </li>
              <li className="flex items-center text-gray-600 space-x-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span>Projects</span>
              </li>
              <li className="flex items-center text-gray-600 space-x-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>Datasets</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col">
        <div className="w-full flex items-center justify-between px-8 pt-12 pb-8 border-b">
          <h1 className="text-3xl font-semibold">Notification</h1>
          <div className="relative">
            <button className="rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-7xl space-y-10 mt-16">
            {/* Toggle: New Project Updates */}
            <div className="flex items-center justify-between border border-black rounded-full px-8 py-5 bg-white shadow" style={{ minWidth: 380 }}>
              <div>
                <span className="font-semibold text-xl md:text-2xl">New Project Updates</span>
                <span className="text-gray-700 text-base md:text-lg ml-1">– Stay informed when someone adds or updates a file in your project</span>
              </div>
              <button
                className={`toggle-btn w-20 h-10 rounded-full flex items-center bg-white relative ${states.projectUpdates ? "on" : ""}`}
                onClick={() => handleToggle("projectUpdates")}
              >
                <span className={`toggle-dot absolute left-1 top-1 w-8 h-8 rounded-full shadow ${states.projectUpdates ? "on" : "off"}`}></span>
              </button>
            </div>
            {/* Toggle: Annotation Status */}
            <div className="flex items-center justify-between border border-black rounded-full px-8 py-5 bg-white shadow" style={{ minWidth: 380 }}>
              <div>
                <span className="font-semibold text-xl md:text-2xl">Annotation Status</span>
                <span className="text-gray-700 text-base md:text-lg ml-1">– Get alerts when your assigned file is marked completed or reviewed.</span>
              </div>
              <button
                className={`toggle-btn w-20 h-10 rounded-full flex items-center bg-white relative ${states.annotationStatus ? "on" : ""}`}
                onClick={() => handleToggle("annotationStatus")}
              >
                <span className={`toggle-dot absolute left-1 top-1 w-8 h-8 rounded-full shadow ${states.annotationStatus ? "on" : "off"}`}></span>
              </button>
            </div>
            {/* Toggle: Mentions & Comments */}
            <div className="flex items-center justify-between border border-black rounded-full px-8 py-5 bg-white shadow" style={{ minWidth: 380 }}>
              <div>
                <span className="font-semibold text-xl md:text-2xl">Mentions & Comments</span>
                <span className="text-gray-700 text-base md:text-lg ml-1">– Receive notifications when someone tags you or leaves a comment.</span>
              </div>
              <button
                className={`toggle-btn w-20 h-10 rounded-full flex items-center bg-white relative ${states.mentionsComments ? "on" : ""}`}
                onClick={() => handleToggle("mentionsComments")}
              >
                <span className={`toggle-dot absolute left-1 top-1 w-8 h-8 rounded-full shadow ${states.mentionsComments ? "on" : "off"}`}></span>
              </button>
            </div>
            {/* Toggle: System Alerts */}
            <div className="flex items-center justify-between border border-black rounded-full px-8 py-5 bg-white shadow" style={{ minWidth: 380 }}>
              <div>
                <span className="font-semibold text-xl md:text-2xl">System Alerts</span>
                <span className="text-gray-700 text-base md:text-lg ml-1">– Important updates like password changes or system maintenance.</span>
              </div>
              <button
                className={`toggle-btn w-20 h-10 rounded-full flex items-center bg-white relative ${states.systemAlerts ? "on" : ""}`}
                onClick={() => handleToggle("systemAlerts")}
              >
                <span className={`toggle-dot absolute left-1 top-1 w-8 h-8 rounded-full shadow ${states.systemAlerts ? "on" : "off"}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
