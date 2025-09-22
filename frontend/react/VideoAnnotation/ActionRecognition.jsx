import React, { useRef, useState, useEffect } from "react";

// NOTE: This component uses Tailwind CSS and Bootstrap Icons. Ensure both are available globally in your React app.

const actionTypes = [
  { name: "Walking", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L9 8.3V13h2V9.6l1.8-.7"/></svg>
  )},
  { name: "Running", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>
  )},
  { name: "Sitting", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm7.25-3c.41 0 .75-.34.75-.75s-.34-.75-.75-.75-.75.34-.75.75.34.75.75.75zm-4.5 0c.41 0 .75-.34.75-.75s-.34-.75-.75-.75-.75.34-.75.75.34.75.75.75z"/><path d="M22.5 9.5c0-.83-.67-1.5-1.5-1.5h-2.4c-.74-1.19-2.04-2-3.6-2h-2c-1.56 0-2.86.81-3.6 2H6.5C5.67 8 5 8.67 5 9.5S5.67 11 6.5 11H8v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8h1.5c.83 0 1.5-.67 1.5-1.5z"/></svg>
  )},
  { name: "Jumping", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 2C8.33 2 9 2.67 9 3.5S8.33 5 7.5 5 6 4.33 6 3.5 6.67 2 7.5 2M16 7.5L14.75 5.25C14.38 4.58 13.63 4.25 12.88 4.25C12.63 4.25 12.38 4.31 12.13 4.44L7.5 6.69V10H9V7.31L10.81 6.56L9.31 11H11.75L12.94 8L14.06 10V15H16V9.5C16 8.67 15.33 8 14.5 8S13 8.67 13 9.5V10.69L11.31 7.81L12.75 7.06C13.19 6.88 13.69 6.88 14.13 7.06L16 7.5Z"/><path d="M12.5 11.5C12.5 10.67 13.17 10 14 10S15.5 10.67 15.5 11.5 14.83 13 14 13 12.5 12.33 12.5 11.5M3 15.5V17.5H21V15.5H3Z"/></svg>
  )},
  { name: "Other", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 10C4.9 10 4 10.9 4 12S4.9 14 6 14 8 13.1 8 12 7.1 10 6 10M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M18 10C16.9 10 16 10.9 16 12S16.9 14 18 14 20 13.1 20 12 19.1 10 18 10Z"/></svg>
  )},
];

function formatTime(seconds) {
  if (!isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const ActionRecognition = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Video.mp4");
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedAction, setSelectedAction] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [pendingStartTime, setPendingStartTime] = useState(null);

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

  // Timeline click (seek or annotation)
  const handleTimelineClick = (e) => {
    if (!duration) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const timeInSeconds = percentage * duration;
    if (!selectedAction) {
      videoRef.current.currentTime = timeInSeconds;
      return;
    }
    if (pendingStartTime === null) {
      setPendingStartTime(timeInSeconds);
    } else {
      const start = Math.min(pendingStartTime, timeInSeconds);
      const end = Math.max(pendingStartTime, timeInSeconds);
      setMarkers((prev) => [...prev, { id: Date.now(), startTime: start, endTime: end, action: selectedAction }]);
      setPendingStartTime(null);
    }
  };

  // Add marker button
  const handleAddMarker = () => {
    if (!selectedAction) return alert("Please select an action type first");
    if (!duration) return alert("Please upload a video first");
    const video = videoRef.current;
    setMarkers((prev) => [
      ...prev,
      {
        id: Date.now(),
        startTime: Math.max(0, video.currentTime - 2),
        endTime: Math.min(duration, video.currentTime + 2),
        action: selectedAction,
      },
    ]);
  };

  // Clear markers
  const handleClearMarkers = () => {
    setMarkers([]);
    setPendingStartTime(null);
  };

  // Save annotation
  const handleSave = () => {
    const annotations = {
      videoFile: fileName,
      duration: duration || 0,
      markers: markers.map((m) => ({
        startTime: m.startTime,
        endTime: m.endTime,
        action: m.action,
        duration: m.endTime - m.startTime,
      })),
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

  // Render timeline markers
  useEffect(() => {
    if (!timelineRef.current) return;
    // Remove old marker elements
    Array.from(timelineRef.current.querySelectorAll(".timeline-segment")).forEach((el) => el.remove());
    // Add new marker elements
    markers.forEach((marker) => {
      if (!duration) return;
      const markerDiv = document.createElement("div");
      markerDiv.className = "timeline-segment";
      markerDiv.style.position = "absolute";
      markerDiv.style.height = "100%";
      markerDiv.style.background = "rgba(255, 165, 0, 0.6)";
      markerDiv.style.borderRight = "2px solid #ff6b35";
      markerDiv.style.zIndex = 5;
      markerDiv.style.left = `${(marker.startTime / duration) * 100}%`;
      markerDiv.style.width = `${((marker.endTime - marker.startTime) / duration) * 100}%`;
      markerDiv.title = `${marker.action}: ${formatTime(marker.startTime)} - ${formatTime(marker.endTime)}`;
      timelineRef.current.appendChild(markerDiv);
    });
  }, [markers, duration]);

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
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50">
            <i className="bi bi-arrow-left"></i>
            <a href="/frontend/Datasets.html">Back to project</a>
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
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
            <label htmlFor="fileInput" className="inline-flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-pointer hover:border-gray-400 hover:bg-gray-100">
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
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Action Types</h3>
              <div id="actionList" className="space-y-0">
                {actionTypes.map((action) => (
                  <div
                    key={action.name}
                    className={`action-item flex items-center justify-between p-3 border border-gray-300 cursor-pointer first:rounded-t-md last:rounded-b-md -mb-px ${selectedAction === action.name ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
                    onClick={() => setSelectedAction(action.name)}
                  >
                    <div className="flex items-center gap-3">
                      {React.cloneElement(action.icon, {
                        className: `w-5 h-5 ${selectedAction === action.name ? "text-white" : "text-gray-700"}`,
                      })}
                      <span className="font-medium">{action.name}</span>
                    </div>
                    <i className={`bi bi-check-circle-fill text-green-600 ${selectedAction === action.name ? "" : "hidden"} check-icon`}></i>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline Markers</h3>
              <div className="mb-4">
                <ol className="text-xs text-gray-600 leading-relaxed pl-4 space-y-1">
                  <li>1.Select an action type</li>
                  <li>2.Click on timeline to mark start</li>
                  <li>3.Click again to mark end</li>
                </ol>
              </div>
              <div className="space-y-3">
                <button
                  id="addMarkerBtn"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50"
                  onClick={handleAddMarker}
                >
                  <i className="bi bi-bookmark-plus"></i>
                  Add Timeline Marker
                </button>
                <button
                  id="clearMarkersBtn"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800"
                  onClick={handleClearMarkers}
                >
                  <i className="bi bi-trash3"></i>
                  Clear All Marker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionRecognition;
