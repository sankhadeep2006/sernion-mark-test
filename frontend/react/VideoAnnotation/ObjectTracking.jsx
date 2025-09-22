import React, { useRef, useState, useEffect } from "react";

// NOTE: This component uses Tailwind CSS and Bootstrap Icons. Ensure both are available globally in your React app.

const objectTypes = [
  { name: "Person", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
  )},
  { name: "Vehicle", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
  )},
  { name: "Animal", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 9.5C4.5 8.67 3.83 8 3 8S1.5 8.67 1.5 9.5 2.17 11 3 11s1.5-.67 1.5-1.5zM21 8c-.83 0-1.5.67-1.5 1.5S20.17 11 21 11s1.5-.67 1.5-1.5S21.83 8 21 8zM6 9.5C6 8.67 5.33 8 4.5 8S3 8.67 3 9.5 3.67 11 4.5 11 6 10.33 6 9.5zM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11 10 10.33 10 9.5 9.33 8 8.5 8zm7 0c-.83 0-1.5.67-1.5 1.5S14.67 11 15.5 11 17 10.33 17 9.5 16.33 8 15.5 8zM20.5 8c-.83 0-1.5.67-1.5 1.5S19.67 11 20.5 11 22 10.33 22 9.5 21.33 8 20.5 8zM12 14c-2.67 0-5.33 1.33-8 4 2.67-2.67 5.33-4 8-4s5.33 1.33 8 4c-2.67-2.67-5.33-4-8-4z"/></svg>
  )},
  { name: "Object", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg>
  )},
];

function formatTime(seconds) {
  if (!isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const ObjectTracking = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Video.mp4");
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedObject, setSelectedObject] = useState(null);

  // Progress bar refs
  const timelineRef = useRef(null);
  const timelineProgressRef = useRef(null);
  const progressLineRef = useRef(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  // Play/pause logic
  const handlePlayPause = () => {
    if (!videoUrl) return;
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  // Seek logic
  const handleSeek = (seconds) => {
    if (!videoUrl) return;
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  // Speed change
  const handleSpeedChange = (e) => {
    setPlaybackRate(parseFloat(e.target.value));
  };

  // Timeline click (seek)
  const handleTimelineClick = (e) => {
    if (!duration) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const timeInSeconds = percentage * duration;
    videoRef.current.currentTime = timeInSeconds;
  };

  // Save annotation
  const handleSave = () => {
    const annotations = {
      videoFile: fileName,
      duration: duration || 0,
      selectedObject: selectedObject,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video-annotations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Tracking controls
  const handleTrackingAction = (action) => {
    if (!selectedObject && action !== "delete-track") {
      alert("Please select an object type first");
      return;
    }
    switch (action) {
      case "start-tracking":
        alert(`Starting tracking for ${selectedObject}`);
        break;
      case "interpolate-frames":
        alert(`Interpolating frames for ${selectedObject}`);
        break;
      case "delete-track":
        alert("Deleting current track");
        break;
      default:
        break;
    }
  };

  // Update video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [playbackRate]);

  // Update progress bar
  useEffect(() => {
    if (!duration) return;
    if (timelineProgressRef.current) {
      timelineProgressRef.current.style.width = `${(currentTime / duration) * 100}%`;
    }
    if (progressLineRef.current) {
      progressLineRef.current.style.left = `${(currentTime / duration) * 100}%`;
    }
  }, [currentTime, duration]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white">
              <i className="bi bi-play-fill text-sm"></i>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{fileName}</h1>
              <p className="text-xs text-gray-500">Action Recognition</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium">
            <i className="bi bi-arrow-left"></i>
            <a href="/frontend/Datasets.html">Back to project</a>
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium">
            <i className="bi bi-save"></i>
            Save Annotation
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="flex-1 bg-white p-6 flex flex-col">
          {/* Upload Section */}
          <div className="mb-6">
            <label htmlFor="fileInput" className="inline-flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-pointer">
              <i className="bi bi-file-earmark-play"></i>
              Select Audio File
              <input
                id="fileInput"
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Video Container */}
          <div
            id="videoContainer"
            className="w-full h-96 md:h-[500px] bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden cursor-pointer"
            onClick={() => {
              if (!videoUrl) fileInputRef.current.click();
            }}
          >
            <video
              ref={videoRef}
              controls
              className={`w-full h-full object-contain ${videoUrl ? "" : "hidden"}`}
              src={videoUrl}
            />
            {!videoUrl && (
              <div className="text-gray-400 text-lg">Uploaded Video</div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-6 mb-6 px-4">
            <button
              id="playPauseBtn"
              className="w-12 h-12 border border-gray-300 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 text-gray-700"
              onClick={handlePlayPause}
            >
              <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"} text-xl`}></i>
            </button>
            <div className="flex items-center gap-3">
              <button
                id="seekBackBtn"
                className="w-10 h-10 border border-gray-300 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 text-gray-700"
                onClick={() => handleSeek(-10)}
              >
                <i className="bi bi-skip-start-fill"></i>
              </button>
              <span className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs text-gray-600">-10s</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="seekForwardBtn"
                className="w-10 h-10 border border-gray-300 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 text-gray-700"
                onClick={() => handleSeek(10)}
              >
                <i className="bi bi-skip-end-fill"></i>
              </button>
              <span className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs text-gray-600">+10s</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs text-gray-600">Speed</span>
              <select
                id="speedSelect"
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={playbackRate}
                onChange={handleSpeedChange}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <div className="relative">
              <div
                id="timeline"
                ref={timelineRef}
                className="w-full h-6 bg-gray-200 rounded-full cursor-pointer overflow-hidden relative"
                onClick={handleTimelineClick}
                style={{ position: "relative" }}
              >
                <div
                  id="timelineProgress"
                  ref={timelineProgressRef}
                  className="timeline-progress absolute top-0 left-0 w-0"
                  style={{ background: "#3b82f6", height: "100%", borderRadius: "9999px", transition: "width 0.1s ease" }}
                ></div>
                <div
                  id="progressLine"
                  ref={progressLineRef}
                  className="progress-line"
                  style={{ left: `${(currentTime / (duration || 1)) * 100}%`, background: "white", width: 2, height: "100%", position: "absolute", top: 0, boxShadow: "0 0 4px rgba(0,0,0,0.3)", zIndex: 10, transition: "left 0.1s ease" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <span id="currentTime">{formatTime(currentTime)}</span>
              <span id="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Annotation Tools */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="bg-gray-200 px-5 py-4 border-b border-gray-300">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <i className="bi bi-tools"></i>
              Annotation Tools
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Object Types Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Object Types</h3>
              <div id="objectList" className="space-y-0">
                {objectTypes.map((object) => (
                  <div
                    key={object.name}
                    className={`object-item flex items-center justify-between p-3 border border-gray-300 cursor-pointer first:rounded-t-md last:rounded-b-md -mb-px ${selectedObject === object.name ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
                    onClick={() => setSelectedObject(object.name)}
                  >
                    <div className="flex items-center gap-3">
                      {React.cloneElement(object.icon, {
                        className: `w-5 h-5 ${selectedObject === object.name ? "text-white" : "text-gray-700"}`,
                      })}
                      <span className="font-medium">{object.name}</span>
                    </div>
                    <i className={`bi bi-check-circle-fill text-green-600 ${selectedObject === object.name ? "" : "hidden"} check-icon`}></i>
                  </div>
                ))}
              </div>
            </div>
            {/* Tracking Controls Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tracking Controls</h3>
              <div className="space-y-0">
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 border border-gray-300 bg-white first:rounded-t-md last:rounded-b-md -mb-px"
                  onClick={() => handleTrackingAction("start-tracking")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
                  <span className="font-medium">Start Tracking</span>
                </button>
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 border border-gray-300 bg-white first:rounded-t-md last:rounded-b-md -mb-px"
                  onClick={() => handleTrackingAction("interpolate-frames")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
                  <span className="font-medium">Interpolate Frames</span>
                </button>
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 border border-gray-300 bg-white first:rounded-t-md last:rounded-b-md"
                  onClick={() => handleTrackingAction("delete-track")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  <span className="font-medium">Delete Track</span>
                </button>
              </div>
            </div>
            {/* Instructions Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Instructions</h3>
              <div className="mb-4">
                <ol className="text-xs text-gray-600 leading-relaxed pl-4 space-y-1">
                  <li>1. Select an Object type</li>
                  <li>2. Draw bounding box on video</li>
                  <li>3. Use controls to track through frames</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectTracking;
