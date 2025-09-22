import React, { useEffect, useRef, useState } from "react";

const DatasetUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [guidelines, setGuidelines] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  useEffect(() => {
    setCharCount(guidelines.length);
  }, [guidelines]);

  // Simulate upload progress
  useEffect(() => {
    let interval;
    if (uploading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setUploading(false), 1000);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [uploading]);

  const handleFiles = (files) => {
    if (!files.length) return;
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    setUploading(true);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const validateForm = () => selectedFiles.length > 0;

  const handleNext = () => {
    if (!validateForm()) {
      alert("Please upload dataset files to continue.");
      return;
    }
    localStorage.setItem("uploadedFiles", selectedFiles.length);
    localStorage.setItem("annotationGuidelines", guidelines);
    window.location.href = "Team.html";
  };

  // Annotation display from localStorage/query param
  const [selectedAnnotation, setSelectedAnnotation] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const annotation = params.get("annotation") || localStorage.getItem("selectedAnnotation");
    const dataType = localStorage.getItem("selectedDataType");
    if (annotation) {
      setSelectedAnnotation(
        `Selected: ${dataType ? dataType.charAt(0).toUpperCase() + dataType.slice(1) : ""} - ${annotation}`
      );
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center py-6 border-b">
        <a
          href="/frontend/annotation.html"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="text-3xl text-black mr-4"
          aria-label="Go back"
        >
          &larr;
        </a>
        <h1 className="text-2xl font-bold">Create new project</h1>
      </div>

      {/* Progress Steps */}
      <div className="progress-container relative py-4">
        <div className="progress-line absolute h-0.5 bg-gray-200 left-5 right-5 top-3.5" />
        <div className="progress-active absolute h-0.5 bg-black left-5" style={{ width: "calc(66.66% - 20px)", top: 14 }} />
        <div className="step-circles relative flex justify-between z-10">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">1</div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">2</div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">3</div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">4</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <div className="bg-white border border-gray-200 rounded-none sm:rounded-lg shadow-sm sm:shadow-md p-4 sm:p-5 lg:p-6 mb-4 -mx-3 sm:mx-0">
          <div className="mb-4 sm:mb-5">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">Dataset Upload</h2>
            <p className="text-sm text-gray-600">Upload your dataset for annotation</p>
          </div>

          {/* Selected Annotation Display */}
          {selectedAnnotation && (
            <div className="mb-3 sm:mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg font-medium text-sm text-blue-800">
              {selectedAnnotation}
            </div>
          )}

          {/* Dataset Upload Section */}
          <div className="mb-4 sm:mb-5">
            <label className="block font-semibold text-sm sm:text-base mb-2 text-gray-900">
              Dataset Upload <span className="text-red-500 ml-1">*</span>
            </label>
            <div
              id="uploadBox"
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:h-40 text-center hover:border-gray-400 cursor-pointer transition-all duration-300 group"
              onClick={handleBrowse}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-sm sm:text-base text-gray-800">Upload your dataset</div>
                  <div className="text-gray-600 text-xs sm:text-sm max-w-xs mx-auto">
                    <span className="block sm:inline">Drop files here or </span>
                    <span className="text-black font-medium underline">click to browse</span>
                  </div>
                  <div className="text-xs text-gray-500">Supports ZIP, folders, and individual files</div>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                className="hidden"
                onChange={handleInputChange}
              />
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Uploading files...</span>
                  <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* File List */}
            {selectedFiles.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-800 mb-2">Selected Files:</div>
                <div className="space-y-1 max-h-24 overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-blue-600">{file.name.split('.').pop().toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-800 truncate">{file.name}</div>
                          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
                        type="button"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guidelines Section */}
          <div className="space-y-3">
            <div>
              <label htmlFor="guidelines" className="block font-semibold text-sm sm:text-base mb-2 text-gray-900">
                Annotation Guidelines
              </label>
              <textarea
                id="guidelines"
                placeholder="Provide detailed instructions for annotators..."
                className="w-full border border-gray-300 rounded-md p-3 min-h-[80px] sm:min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y text-sm transition-all duration-200"
                rows={4}
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                maxLength={1000}
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-500 text-xs">Clear guidelines help ensure consistent annotations.</p>
                <span className={`text-xs ${charCount > 1000 ? "text-red-500" : "text-gray-400"}`}>{charCount}/1000 characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="footer-area flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 px-0 sm:px-0">
        <a
          href="../annotation.html"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-center transition-colors duration-200 border border-gray-300"
        >
          Previous
        </a>
        <button
          id="nextBtn"
          className="w-full sm:w-auto px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg text-center transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!validateForm()}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DatasetUpload;
