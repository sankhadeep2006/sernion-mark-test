import React, { useRef, useState, useEffect } from "react";

const SpeakerIdentification = () => {
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
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{fileName}</h1>
              <p className="text-sm text-gray-500">Audio Identification Annotation</p>
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
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
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
          </div>
        </div>
        {/* Right Panel - Annotation Tools */}
        <div className="xl:col-span-1 bg-gray-50 border-l border-gray-200">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Annotation Tools</h2>
            </div>
            {/* ...existing code for speaker management and annotation form... */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Speaker Management</h3>
              <div className="mb-4">
                <div className="flex items-center mb-2 justify-between border-2 border-blue-500 rounded-lg p-3">
                  <label className="block text-sm font-medium text-black-700 mb-2">Speakers</label>
                  <button className="ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800">+</button>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded">Speaker 1</span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">Unknown</span>
                    </div>
                  </div>
                  <button className="text-base font-medium w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">Selected</button>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="block text-sm font-medium text-black-700 mb-2">Voice Characteristics</h4>
                <div className="border-2 border-blue-500 rounded-lg p-3">
                  <form className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-black-700 mb-2">Gender</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black-700 mb-2">Age</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black-700 mb-2">Accent</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <input type="checkbox" id="emotionalSpeech" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="emotionalSpeech" className="text-xs font-medium text-black-700">Emotional speech</label>
                    </div>
                  </form>
                  <button type="button" className="w-full bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1 mt-4">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Classify Current Segment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerIdentification;
