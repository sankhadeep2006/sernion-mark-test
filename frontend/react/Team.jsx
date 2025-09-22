import React, { useEffect } from "react";

const Team = () => {
  useEffect(() => {
    function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    const input = document.getElementById('emailInput');
    const addBtn = document.getElementById('addBtn');
    const removeBtn = document.getElementById('removeBtn');
    const select = document.getElementById('emailDropdown');
    const list = document.getElementById('emailList');
    const placeholder = document.getElementById('emailPlaceholder');
    function saveTeam() {
      const members = Array.from(select.options).filter(o=>o.value).map(o=>o.value);
      localStorage.setItem('teamMembers', JSON.stringify(members));
    }
    function restoreTeam() {
      const stored = localStorage.getItem('teamMembers');
      if (!stored) return;
      const members = JSON.parse(stored);
      if (members.length) {
        select.innerHTML = '';
        members.forEach(email => {
          const option = document.createElement('option');
          option.value = email;
          option.textContent = email;
          select.appendChild(option);
          const chip = document.createElement('span');
          chip.className='inline-flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm';
          chip.dataset.email=email;
          chip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0z" /></svg><span>${email}</span>`;
          list.appendChild(chip);
        });
        placeholder.classList.add('hidden');
      }
    }
    function addEmail() {
      const email = input.value.trim();
      if (!email) return; if (!isValidEmail(email)) { alert('Please enter a valid email.'); return; }
      for (const opt of select.options) { if (opt.value.toLowerCase() === email.toLowerCase()) { alert('This email is already in the list.'); input.value=''; return; } }
      if (select.options.length && select.options[0].value === '') select.remove(0);
      const option = document.createElement('option'); option.value = email; option.textContent = email; select.appendChild(option); select.value = email; input.value='';
      const chip = document.createElement('span'); chip.className='inline-flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm'; chip.dataset.email=email; chip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0z" /></svg><span>${email}</span>`; list.appendChild(chip); placeholder.classList.add('hidden');
      saveTeam();
    }
    function removeSelected() {
      if (!select.value) { alert('Select a member to remove.'); return; }
      const removed = select.value; const idx = select.selectedIndex; if (idx>=0) select.remove(idx);
      const chip = list.querySelector(`[data-email="${CSS.escape(removed)}"]`); if (chip) chip.remove();
      if (!select.options.length) { const ph = document.createElement('option'); ph.value=''; ph.textContent='No members yet'; ph.disabled=true; ph.selected=true; select.appendChild(ph); }
      if (!list.children.length) { placeholder.classList.remove('hidden'); }
      saveTeam();
    }
    if (addBtn) addBtn.addEventListener('click', addEmail);
    if (removeBtn) removeBtn.addEventListener('click', removeSelected);
    if (input) input.addEventListener('keydown', e => { if (e.key==='Enter'){ e.preventDefault(); addEmail(); }});
    restoreTeam();
    const finishLink = document.querySelector('a[href="Successfully.html"]');
    if (finishLink) {
      finishLink.addEventListener('click', () => { saveTeam(); });
    }
  }, []);

  return (
    <div className="bg-white font-[Inter] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center py-6 border-b">
          <a href="Image/index5.html" onClick={e => {e.preventDefault(); window.history.back();}} className="text-3xl text-black mr-4" aria-label="Go back">&larr;</a>
          <h1 className="text-2xl font-bold">Create new project</h1>
        </div>
        {/* Progress (Step 4 active) */}
        <div className="progress-container" style={{position:'relative',padding:'0 16px',margin:'40px 0'}}>
          <div className="progress-line" style={{position:'absolute',height:'2px',backgroundColor:'#e5e5e5',left:'24px',right:'24px',top:'14px'}}></div>
          <div className="progress-active" style={{position:'absolute',height:'2px',backgroundColor:'#000',left:'24px',width:'calc(100% - 48px)',top:'14px'}}></div>
          <div className="step-circles" style={{position:'relative',display:'flex',justifyContent:'space-between',zIndex:10}}>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">1</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">2</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">3</div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-medium text-sm">4</div>
          </div>
        </div>
        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-1">Team & Settings</h2>
            <p className="text-gray-600">Configure team access and project settings</p>
          </div>
          {/* Team Members */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="emailInput">Team members</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" id="emailInput" placeholder="Enter email address" className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
              <div className="flex gap-2">
                <button id="addBtn" className="px-4 py-2 bg-black text-white rounded-md font-medium" type="button">Add</button>
                <button id="removeBtn" className="px-4 py-2 bg-black text-white rounded-md font-medium" type="button">Remove</button>
              </div>
            </div>
            <select id="emailDropdown" className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-black text-sm">
              <option value="" disabled selected>No members yet</option>
            </select>
            <div id="emailList" className="mt-4 flex flex-wrap gap-2"></div>
            <p id="emailPlaceholder" className="mt-3 text-sm text-gray-500">Email addresses will appear here.</p>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-between mb-10">
          <a href="Dataset_upload.html" className="px-6 py-2 bg-black text-white font-medium rounded text-center">Previous</a>
          <a href="Successfully.html" className="px-6 py-2 bg-black text-white font-medium rounded text-center">Finish</a>
        </div>
      </div>
    </div>
  );
};

export default Team;
