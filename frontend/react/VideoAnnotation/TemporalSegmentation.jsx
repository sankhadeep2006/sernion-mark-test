import React, { useRef, useState, useEffect } from "react";

// NOTE: This component uses Tailwind CSS and Bootstrap Icons. Ensure both are available globally in your React app.

const eventTypes = [
  { name: "Scene Change", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
  )},
  { name: "Dialogue", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-2v-2h2v2zm0-3h-2V9h2v2zm0-3h-2V6h2v2z"/></svg>
  )},
  { name: "Action Sequence", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
  )},
  { name: "Transition", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>
  )},
];

function formatTime(seconds) {
  if (!isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const TemporalSegmentation = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Video.mp4");
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentSegmentStart, setCurrentSegmentStart] = useState(null);

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

  // Event selection
  const handleEventSelect = (eventName) => {
    setSelectedEvent(eventName);
  };

  // Tracking controls
  const handleTrackingAction = (action) => {
    switch (action) {
      case "start-segment":
        if (!selectedEvent) {
          alert("Please select an event type first");
          return;
        }
        if (!duration) {
          alert("Please upload a video first");
          return;
        }
        setCurrentSegmentStart(videoRef.current.currentTime);
        alert(`Started ${selectedEvent} segment at ${formatTime(videoRef.current.currentTime)}`);
        break;
      case "end-segment":
        if (currentSegmentStart === null || !selectedEvent) {
          alert("Please start a segment first");
          return;
        }
        const segmentEnd = videoRef.current.currentTime;
        setEvents((prev) => [
          ...prev,
          {
            type: selectedEvent,
            start: currentSegmentStart,
            end: segmentEnd,
            id: Date.now(),
          },
        ]);
        setCurrentSegmentStart(null);
        alert(`Ended ${selectedEvent} segment at ${formatTime(segmentEnd)}`);
        break;
      case "split-current":
        const splitTime = videoRef.current.currentTime;
        alert(`Split at current time: ${formatTime(splitTime)}`);
        break;
      default:
        break;
    }
  };

  // Save annotation
  const handleSave = () => {
    const annotations = {
      videoFile: fileName,
      duration: duration || 0,
      events: events,
      selectedEvent: selectedEvent,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video-events-annotations.json";
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

  // Update event timeline display
  const renderEventTimeline = () => {
    if (events.length === 0) {
      return <span className="text-gray-600">No event marked</span>;
    }
    return (
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-2 rounded border text-xs">
            <div className="font-medium">{event.type}</div>
            <div className="text-gray-500">{formatTime(event.start)} - {formatTime(event.end)}</div>
          </div>
        ))}
      </div>
    );
  };

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
              <i className="bi bi-x text-lg"></i>
              Annotation Tools
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Event Types Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Events Types</h3>
              <div id="eventList" className="border border-gray-700">
                {eventTypes.map((event) => (
                  <div
                    key={event.name}
                    className={`event-item flex items-center justify-start gap-3 p-3 border-b border-gray-700 bg-white cursor-pointer hover:bg-gray-50 last:border-b-0 ${selectedEvent === event.name ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
                    onClick={() => handleEventSelect(event.name)}
                  >
                    {React.cloneElement(event.icon, {
                      className: `w-5 h-5 ${selectedEvent === event.name ? "text-white" : "text-gray-700"}`,
                    })}
                    <span className="font-medium text-sm">{event.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Tracking Controls Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tracking Controls</h3>
              <div className="border border-gray-700">
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 border-b border-gray-700 bg-white hover:bg-gray-50 last:border-b-0"
                  onClick={() => handleTrackingAction("start-segment")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><polygon fill="white" points="10,8 16,12 10,16"/></svg>
                  <span className="font-medium text-sm">Start Segment</span>
                </button>
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 border-b border-gray-700 bg-white hover:bg-gray-50 last:border-b-0"
                  onClick={() => handleTrackingAction("end-segment")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h4v12H6V6zm8 0h4v12h-4V6z"/></svg>
                  <span className="font-medium text-sm">End Segment</span>
                </button>
                <button
                  className="tracking-btn w-full flex items-center justify-start gap-3 p-3 bg-white hover:bg-gray-50"
                  onClick={() => handleTrackingAction("split-current")}
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  <span className="font-medium text-sm">Split at Current Time</span>
                </button>
              </div>
            </div>
            {/* Event Timeline Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Event Timeline</h3>
              <div id="eventTimeline" className="bg-gray-200 p-4 rounded min-h-[100px] flex items-center justify-center text-sm text-gray-600">
                {renderEventTimeline()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalSegmentation;
