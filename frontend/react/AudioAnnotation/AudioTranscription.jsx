import React, { useRef, useState, useEffect } from "react";

const AudioTranscription = () => {
  const [fileName, setFileName] = useState("Audio.mp3");
  const waveformRef = useRef();

  useEffect(() => {
    // Placeholder for WaveSurfer initialization
  }, []);

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-black-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{fileName}</h1>
              <p className="text-sm text-gray-500">Audio Transcription Annotation</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/frontend/Datasets.html" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span>Back to project</span>
            </a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
              </svg>
              <span>Save Annotation</span>
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-0">
        {/* Left Panel - Audio Player */}
        <div className="xl:col-span-3 p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Controls Row */}
            <div className="p-6 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* File Upload */}
                <div className="flex-shrink-0">
                  <label className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                    </svg>
                    Select Audio File
                    <input type="file" accept="audio/*" className="hidden" />
                  </label>
                </div>
                {/* ...existing code for playback controls, time, speed... */}
                <div className="flex items-center space-x-3">
                  <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-black-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
                    <span className="text-xs">-10s</span>
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
                    <span className="text-xs">+10s</span>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <div className="text-lg font-mono font-medium text-gray-900">0:00 / 0:00</div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Speed</label>
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white">
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1" selected>1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Waveform Container */}
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-yellow-400 via-red-500 via-pink-500 via-purple-500 to-blue-500 rounded-2xl p-6 shadow-inner">
                <div ref={waveformRef} className="min-h-[160px] rounded-xl bg-black bg-opacity-10"></div>
                <div className="flex justify-between items-center mt-4 text-white text-sm font-mono">
                  <span>00:00:000</span>
                  <span>/ 00:00:000</span>
                </div>
              </div>
            </div>
            {/* Transcription Section */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center justify-center bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-black">
                      <rect x="4" y="8" width="24" height="14" rx="2" fill="currentColor" />
                      <rect x="7" y="12" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="11" y="12" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="15" y="12" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="19" y="12" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="23" y="12" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="7" y="16" width="18" height="2" rx="1" fill="white" />
                      <rect x="11" y="20" width="10" height="2" rx="1" fill="white" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Transcription</h3>
                </div>
                <div className="bg-white border border-gray-300 rounded p-4 min-h-[100px] mb-3">
                  <div className="text-gray-500 text-sm">Click "Add Segment" to start transcribing...</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 flex items-center space-x-1">
                    <span className="text-lg leading-none">+</span>
                    <span>Add Segment</span>
                  </button>
                  <button className="px-3 py-1 text-sm border border-blue-300 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span>Auto Segment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Panel - Annotation Tools */}
        <div className="xl:col-span-1 bg-gray-50 border-l border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Annotation Tools</h2>
            </div>
            {/* ...existing code for transcription controls... */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Transcription Controls</h3>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-black-700 mb-1">Current Segment</label>
                <div className="relative">
                  <textarea rows={4} className="w-full border border-gray-300 rounded px-2 py-1 pr-10 pb-6 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Type transcription here..."></textarea>
                  <svg className="w-4 h-4 text-gray-400 absolute right-3 bottom-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-black-700 mb-1">Start Time</label>
                <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent" value="00:00.000" readOnly />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-black-700 mb-1">End Time</label>
                <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent" value="00:00.000" readOnly />
              </div>
              <div className="space-y-2">
                <button className="w-full  bg-purple-100 text-black-700 px-3 py-2 rounded text-xs font-medium hover:bg-purple-200 transition-colors flex items-center justify-center space-x-1 border border-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-black">
                    <rect width="20" height="20" x="2" y="2" rx="2" fill="currentColor" />
                    <rect width="8" height="6" x="8" y="14" rx="1" fill="white" />
                    <rect width="6" height="4" x="9" y="4" rx="1" fill="white" />
                    <circle cx="13" cy="17" r="1" fill="black" />
                  </svg>
                  <span className="text-sm font-semibold">Save Segment</span>
                </button>
                <button className="w-full bg-gray-100 text-black-700 px-3 py-2 rounded text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 border border-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-black">
                    <rect x="6" y="9" width="12" height="11" rx="2" fill="currentColor" />
                    <rect x="9" y="12" width="2" height="6" rx="1" fill="white" />
                    <rect x="13" y="12" width="2" height="6" rx="1" fill="white" />
                    <rect x="4" y="6" width="16" height="3" rx="1" fill="currentColor" />
                  </svg>
                  <span className="text-sm font-semibold">Delete Segment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranscription;
