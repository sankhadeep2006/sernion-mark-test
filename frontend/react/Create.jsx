import React, { useEffect } from "react";

const Create = () => {
  useEffect(() => {
    const projectNameInput = document.getElementById('projectName');
    const nameError = document.getElementById('nameError');
    const nextButton = document.getElementById('nextButton');
    const projectForm = document.getElementById('projectForm');
    function validateProjectName() {
      if (projectNameInput.value.trim() === '') {
        projectNameInput.classList.add('error-input');
        nameError.textContent = 'Project name is required';
        nameError.classList.add('show');
        return false;
      } else {
        projectNameInput.classList.remove('error-input');
        nameError.textContent = '';
        nameError.classList.remove('show');
        return true;
      }
    }
    if (projectNameInput) {
      projectNameInput.addEventListener('input', function() {
        if (projectNameInput.value.trim() !== '') {
          projectNameInput.classList.remove('error-input');
          nameError.textContent = '';
          nameError.classList.remove('show');
        }
      });
      projectNameInput.addEventListener('blur', validateProjectName);
    }
    if (nextButton) {
      nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        const isValid = validateProjectName();
        if (isValid) {
          nextButton.disabled = true;
          nextButton.innerHTML = '<span class="inline-block mr-2">Processing</span><span class="animate-pulse">...</span>';
          sessionStorage.setItem('projectName', projectNameInput.value);
          sessionStorage.setItem('projectDescription', document.getElementById('description').value);
          sessionStorage.setItem('projectDeadline', document.getElementById('deadlineText').value);
          sessionStorage.setItem('projectPriority', document.getElementById('prioritySelect').value);
          setTimeout(function() {
            window.location.href = "annotation.html";
          }, 500);
        } else {
          projectNameInput.classList.add('animate-shake');
          setTimeout(() => {
            projectNameInput.classList.remove('animate-shake');
          }, 500);
          projectNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          projectNameInput.focus();
        }
      });
    }
    // Populate fields from sessionStorage
    if (sessionStorage.getItem('projectName')) {
      projectNameInput.value = sessionStorage.getItem('projectName');
    }
    if (sessionStorage.getItem('projectDescription')) {
      document.getElementById('description').value = sessionStorage.getItem('projectDescription');
    }
    if (sessionStorage.getItem('projectDeadline')) {
      document.getElementById('deadlineText').value = sessionStorage.getItem('projectDeadline');
    }
    if (sessionStorage.getItem('projectPriority')) {
      document.getElementById('prioritySelect').value = sessionStorage.getItem('projectPriority');
    }
  }, []);

  return (
    <div className="bg-white min-h-screen font-[Inter]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center mb-8 border-b pb-4">
          <a href="/frontend/dashboard.html" className="text-3xl text-black hover:text-gray-700 transition-colors mr-4" aria-label="Go back">&larr;</a>
          <h1 className="text-2xl font-bold text-black">Create new project</h1>
        </div>
        {/* Progress steps */}
        <div className="progress-container" style={{position:'relative',padding:'0 16px',margin:'40px 0'}}>
          <div className="progress-line" style={{position:'absolute',height:'2px',backgroundColor:'#e5e5e5',left:'24px',right:'24px',top:'14px'}}></div>
          <div className="progress-active" style={{position:'absolute',height:'2px',backgroundColor:'#000',left:'24px',width:'0',top:'14px'}}></div>
          <div className="step-circles" style={{position:'relative',display:'flex',justifyContent:'space-between',zIndex:10}}>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">1</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">2</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">3</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">4</div>
          </div>
        </div>
        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h3 className="text-lg font-medium text-black mb-1">Project Details</h3>
          <p className="text-gray-600 text-sm mb-6">Provide basic information about your annotation project</p>
          <form id="projectForm" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="projectName" className="block text-sm font-medium text-black">Project name<span className="text-red-600">*</span></label>
                <span className="text-xs text-gray-500">Required</span>
              </div>
              <input type="text" id="projectName" placeholder="Enter project name" className="w-full px-3 py-2 bg-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-black input-transition" />
              <div id="nameError" className="error-message mt-1 text-sm text-red-600"></div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</label>
              <textarea id="description" placeholder="Enter project description" rows={4} className="w-full px-3 py-2 bg-gray-100 border-0 rounded focus:outline-none focus:ring-1 focus:ring-black"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deadlineText" className="block text-sm font-medium text-black mb-2">Deadline</label>
                <input type="text" id="deadlineText" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 bg-gray-100 border-0 rounded focus:outline-none focus:ring-1 focus:ring-black" onFocus={e => e.target.type='date'} onBlur={e => {if(e.target.value===''){e.target.type='text'}}} />
              </div>
              <div>
                <label htmlFor="prioritySelect" className="block text-sm font-medium text-black mb-2">Priority</label>
                <div className="relative">
                  <select id="prioritySelect" className="w-full px-3 py-2 bg-gray-100 border-0 rounded focus:outline-none focus:ring-1 focus:ring-black appearance-none">
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Actions */}
        <div className="flex justify-end">
          <button id="nextButton" className="px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
