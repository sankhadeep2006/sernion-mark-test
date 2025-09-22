import React from "react";

// NOTE: This is a UI-only conversion. Full annotation logic and file handling should be implemented with useState/useEffect for a complete tool.
const EntityRecognition = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
          <div>
            <div className="text-2xl font-semibold text-gray-800">Text.txt</div>
            <div className="text-gray-500 text-sm mt-1">Named Entity Recognition</div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg cursor-pointer text-base flex items-center gap-2 hover:bg-gray-100 transition-colors">← Back to project</button>
          <button className="px-4 py-2 border border-gray-900 bg-gray-900 text-white rounded-lg cursor-pointer text-base flex items-center gap-2 hover:bg-gray-700 transition-colors">🔒 Save Annotation</button>
        </div>
      </div>
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[500px] w-full">
        {/* Text Area Left */}
        <div className="flex-1 bg-white border border-gray-300 rounded-xl p-8 relative min-h-[600px] flex flex-col justify-center items-center">
          {/* Upload Area */}
          <div className="upload-area border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center hover:border-blue-400 hover:bg-blue-50 w-full h-[400px] lg:h-[480px] cursor-pointer transition-all duration-200">
            <div className="text-6xl mb-4 text-gray-300">📄</div>
            <div className="text-lg text-gray-500 mb-3">Text Document Upload</div>
            <p className="text-gray-400 text-sm text-center">
              Click here to upload a text file<br />
              <span className="text-xs text-gray-300">Supported formats: .txt, .doc, .docx</span>
            </p>
          </div>
          {/* Text Content Area */}
          <textarea className="text-content hidden w-full h-[400px] lg:h-[480px] border border-gray-300 rounded-lg p-4 outline-none text-base leading-relaxed resize-y mt-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Your text content will appear here..."></textarea>
        </div>
        {/* Sidebar Right */}
        <div className="w-full lg:w-[410px] lg:min-w-[410px] lg:max-w-[410px] flex-shrink-0">
          {/* Annotation Tools Frame */}
          <div className="shadow-lg bg-blue-50 border border-blue-100 rounded-2xl p-7 mb-4 sticky top-5">
            <div className="w-full">
              <div className="flex items-center gap-3 pb-4 border-b border-blue-100 mb-4">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path>
                  <circle cx="8" cy="9" r="1"></circle>
                  <circle cx="12" cy="9" r="1"></circle>
                  <circle cx="16" cy="9" r="1"></circle>
                </svg>
                <span className="font-semibold text-gray-800 text-lg">Annotation Tools</span>
              </div>
              <div className="mt-3">
                <div className="text-base font-semibold text-gray-700 mb-3">Identify Entities</div>
                <button className="w-full py-3 px-5 mb-3 bg-white text-gray-700 border-2 border-gray-300 text-base rounded-lg hover:bg-gray-50 transition-all duration-200">Person</button>
                <button className="w-full py-3 px-5 mb-3 bg-white text-gray-700 border-2 border-gray-300 text-base rounded-lg hover:bg-gray-50 transition-all duration-200">Organization</button>
                <button className="w-full py-3 px-5 mb-3 bg-white text-gray-700 border-2 border-gray-300 text-base rounded-lg hover:bg-gray-50 transition-all duration-200">Other</button>
                <div className="border-t border-blue-100 pt-4 mt-4 space-y-3">
                  <button className="w-full py-3 px-5 bg-gray-900 text-white border-2 border-gray-900 text-base rounded-lg hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Save Annotation</button>
                  <button className="w-full py-3 px-5 bg-gray-900 text-white border-2 border-gray-900 text-base rounded-lg hover:bg-gray-700 transition-all duration-200">Next Text</button>
                </div>
              </div>
            </div>
          </div>
          {/* Shortcuts Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-4 sticky top-[480px]">
            <div className="text-lg font-semibold text-gray-700 mb-3">Keyboard Shortcuts</div>
            <div className="space-y-2">
              <div className="shortcut-item flex items-center gap-3 cursor-pointer select-none p-2 rounded hover:bg-gray-100 transition-colors">
                <div className="shortcut-key bg-gray-200 px-3 py-1 rounded text-sm font-bold min-w-[32px] text-center">1</div>
                <span className="text-sm">Person</span>
              </div>
              <div className="shortcut-item flex items-center gap-3 cursor-pointer select-none p-2 rounded hover:bg-gray-100 transition-colors">
                <div className="shortcut-key bg-gray-200 px-3 py-1 rounded text-sm font-bold min-w-[32px] text-center">2</div>
                <span className="text-sm">Organization</span>
              </div>
              <div className="shortcut-item flex items-center gap-3 cursor-pointer select-none p-2 rounded hover:bg-gray-100 transition-colors">
                <div className="shortcut-key bg-gray-200 px-3 py-1 rounded text-sm font-bold min-w-[32px] text-center">3</div>
                <span className="text-sm">Other</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityRecognition;
