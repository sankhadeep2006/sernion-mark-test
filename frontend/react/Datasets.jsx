import React, { useState, useRef, useEffect } from "react";

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [dropdownIdx, setDropdownIdx] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [modal, setModal] = useState({ open: false, action: null });
  const profileBtnRef = useRef();

  // Fetch datasets from backend
  useEffect(() => {
    fetch("/api/v1/datasets/")
      .then(res => res.json())
      .then(data => setDatasets(data))
      .catch(() => setDatasets([]));
  }, []);

  // Filtered datasets
  let filtered = [...datasets];
  if (filter === "completed") filtered = filtered.filter(p => p.status === "Completed");
  else if (filter === "recent") filtered = filtered.slice(0, 3);

  // Card class
  let cardClass = "relative bg-white border border-gray-300 rounded-xl flex flex-col justify-between";
  cardClass += filter === "recent" ? " p-10 min-h-[180px]" : " p-6 min-h-[135px]";

  // Dropdown close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileBtnRef.current && !profileBtnRef.current.contains(e.target)) setProfileDropdown(false);
      setDropdownIdx(null);
    };
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  // Modal content
  let modalTitle = "";
  let showEdit = false, showRename = false, showDelete = false;
  if (modal.action === "edit") {
    modalTitle = "Edit Dataset"; showEdit = true;
  } else if (modal.action === "rename") {
    modalTitle = "Rename Dataset"; showRename = true;
  } else if (modal.action === "delete") {
    modalTitle = "Delete Dataset"; showDelete = true;
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm p-6 flex flex-col">
          <nav>
            <ul className="space-y-6 mt-12" id="sidebarMenu">
              <li className="flex items-center sidebar-item text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <a href="Dashboard.html">Dashboard</a>
              </li>
              <li className="flex items-center sidebar-item text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z"/>
                  <path d="M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
                <a href="Projects.html">Projects</a>
              </li>
              <li data-id="datasets" className="flex items-center sidebar-item active-sidebar cursor-pointer" tabIndex={0} role="button" aria-pressed="true">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Datasets
              </li>
            </ul>
          </nav>
        </div>
        {/* Main content */}
        <main className="flex-1 px-12 py-10 flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Datasets</h1>
            <div className="flex items-center gap-5">
              <a href="/frontend/Dataset_upload.html" className="bg-black text-white py-2 px-5 rounded hover:bg-gray-700">+ Upload New File</a>
              {/* Profile */}
              <div className="relative" ref={profileBtnRef}>
                <button className="flex items-center focus:outline-none" onClick={e => { e.stopPropagation(); setProfileDropdown(v => !v); }}>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 flex items-center gap-3 border-b">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-base">Tridib</div>
                        <div className="text-sm text-gray-500">Tridib123@gmail.com</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Filter and View Buttons */}
          <div className="flex items-center mt-8 mb-6 gap-6">
            <div className="flex gap-2">
              <button
                className={`px-4 py-1 rounded ${filter === "all" ? "bg-gray-300 font-semibold" : "bg-gray-200 font-medium"}`}
                onClick={() => setFilter("all")}
              >All</button>
              <button
                className={`px-4 py-1 rounded ${filter === "recent" ? "bg-gray-300 font-semibold" : "bg-gray-200 font-medium"}`}
                onClick={() => setFilter("recent")}
              >Recent</button>
              <button
                className={`px-4 py-1 rounded ${filter === "completed" ? "bg-gray-300 font-semibold" : "bg-gray-200 font-medium"}`}
                onClick={() => setFilter("completed")}
              >Completed</button>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                className={`px-2 py-1 rounded ${view === "grid" ? "text-black" : "text-gray-400"} bg-gray-200`}
                onClick={() => setView("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button
                className={`px-2 py-1 rounded ${view === "list" ? "text-black" : "text-gray-400"} bg-gray-200`}
                onClick={() => setView("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="4"/>
                  <rect x="3" y="10" width="18" height="4"/>
                  <rect x="3" y="16" width="18" height="4"/>
                </svg>
              </button>
            </div>
          </div>
          {/* Dataset cards */}
          <div
            className={view === "grid" ? "grid grid-cols-3 gap-6 flex-1 overflow-auto" : "flex flex-col gap-4 flex-1 overflow-auto"}
          >
            {filtered.map((p, i) => (
              <div key={p.id || i} className={cardClass}>
                <div>
                  <div className="font-semibold mb-2">{p.name}</div>
                  <div className="text-sm mb-1">{(p.file_size ? (Math.round(p.file_size/1024/1024*100)/100 + ' MB') : '-') + " | " + (p.created_at ? new Date(p.created_at).toLocaleDateString() : "-")}</div>
                  <div className="text-sm">Status: {p.is_processed ? "Completed" : "In Progress"}</div>
                </div>
                <button
                  className="absolute top-5 right-5 text-xl text-gray-700 hover:text-black focus:outline-none"
                  onClick={e => { e.stopPropagation(); setDropdownIdx(i === dropdownIdx ? null : i); }}
                >&#8942;</button>
                {dropdownIdx === i && (
                  <div className="absolute right-6 top-12 bg-white border border-gray-300 rounded shadow min-w-[150px] z-30">
                    <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100" onClick={() => setModal({ open: true, action: "edit" })}>Edit Dataset</button>
                    <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100" onClick={() => setModal({ open: true, action: "rename" })}>Rename Dataset</button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={() => setModal({ open: true, action: "delete" })}>Delete Dataset</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      {/* Dataset Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={e => { if (e.target === e.currentTarget) setModal({ open: false, action: null }); }}>
          <div className="bg-white border border-gray-300 rounded-xl shadow p-6 w-[320px] max-w-full">
            <h2 className="mb-5 text-lg font-semibold">{modalTitle}</h2>
            {showEdit && <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none" onClick={() => { alert("Edit Dataset clicked!"); setModal({ open: false, action: null }); }}>Edit Dataset</button>}
            {showRename && <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none" onClick={() => { alert("Rename Dataset clicked!"); setModal({ open: false, action: null }); }}>Rename Dataset</button>}
            {showDelete && <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus:outline-none" onClick={() => { alert("Delete Dataset clicked!"); setModal({ open: false, action: null }); }}>Delete Dataset</button>}
            <button className="mt-5 block mx-auto bg-gray-200 hover:bg-gray-300 px-5 py-1 rounded text-gray-700 focus:outline-none" onClick={() => setModal({ open: false, action: null })}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datasets;
