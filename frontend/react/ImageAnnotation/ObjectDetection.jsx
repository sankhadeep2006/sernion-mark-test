import React from "react";

// NOTE: This is a UI-only conversion. Drawing and annotation logic should be implemented with useRef/useEffect and canvas for a full-featured tool.
const ObjectDetection = () => {
  return (
    <div className="bg-slate-50 font-sans text-gray-900 min-h-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#2563eb" d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
            <circle cx="8" cy="8" r="2.25" fill="#fff"/>
            <path fill="#93c5fd" d="M3 18l6-6 3 3 3-4 6 7v1H3z"/>
          </svg>
          <div>
            <h1 className="text-sm font-bold">Image.png</h1>
            <div className="text-xs text-gray-500">Object Detection</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50">
            <a href="/frontend/Datasets.html">← Back to project</a>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
            💾 Export
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="grid grid-cols-1 xl:grid-cols-4 gap-4 p-4 h-screen">
        {/* Left Section */}
        <section className="xl:col-span-3 bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 w-full max-w-4xl h-80 md:h-96 lg:h-[460px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-blue-600 hover:bg-blue-50">
            <div className="flex flex-col gap-3 items-center w-full h-full">
              <div className="text-gray-500 text-center p-5 text-base font-medium">Click to select, or drop an image</div>
            </div>
            <input type="file" accept="image/*" className="absolute w-px h-px opacity-0 pointer-events-none" />
          </div>
          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">✏️ Draw</button>
            <button className="bg-red-50 text-red-800 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">🗑️ Clear</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors opacity-50 cursor-not-allowed" disabled>↶ Undo</button>
          </div>
        </section>
        {/* Right Sidebar */}
        <aside className="bg-white border border-gray-200 rounded-xl p-4 overflow-y-auto">
          {/* Drawing Tools */}
          <div className="mb-1">
            <h3 className="text-lg font-bold mb-3">Drawing Tools</h3>
            <div className="space-y-3">
              {/* Brush Size Control */}
              <div className="border border-gray-200 rounded-lg bg-white p-3 shadow-sm">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Brush Size: <span>5</span>px</span>
                </div>
                <input type="range" min="1" max="20" defaultValue="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1px</span>
                  <span>20px</span>
                </div>
              </div>
              {/* Color Palette */}
              <div className="border border-gray-200 rounded-lg bg-white p-3 shadow-sm">
                <label className="block text-sm font-semibold mb-2">Brush Color</label>
                <div className="grid grid-cols-4 gap-2">
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#ef4444'}} title="Red"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#3b82f6'}} title="Blue"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#10b981'}} title="Green"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#f59e0b'}} title="Yellow"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#8b5cf6'}} title="Purple"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#ec4899'}} title="Pink"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#000000'}} title="Black"></button>
                  <button className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: '#ffffff'}} title="White"></button>
                </div>
              </div>
            </div>
          </div>
          {/* Object Classes */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Object Classes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-red-500">Person</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Select</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-blue-600">Vehicle</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Select</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-green-600">Animal</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Select</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-amber-500">Object</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Select</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-violet-600">Building</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Select</button>
              </div>
            </div>
          </div>
          {/* Detection Controls */}
          <div>
            <h3 className="text-lg font-bold mb-3">Detection Controls</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-green-600">Start Detection</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Enable</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-blue-600">Auto Detect</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Enable</button>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-bold text-sm text-red-500">Delete Mode</span>
                <button className="border border-gray-300 rounded-md px-2 py-1 bg-white text-xs font-semibold">Enable</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ObjectDetection;
