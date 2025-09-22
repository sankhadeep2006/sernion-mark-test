import React, { useEffect } from "react";

const Successfully = () => {
  useEffect(() => {
    function renderSummary(){
      const name = sessionStorage.getItem('projectName') || '—';
      const desc = sessionStorage.getItem('projectDescription') || 'No description provided';
      const deadline = sessionStorage.getItem('projectDeadline') || 'Not set';
      const priority = sessionStorage.getItem('projectPriority') || 'Not set';
      const dataType = localStorage.getItem('selectedDataType') || '—';
      const annotation = localStorage.getItem('selectedAnnotation') || '—';
      let team = [];
      try { team = JSON.parse(localStorage.getItem('teamMembers')||'[]'); } catch(e) {}
      const summaryEl = document.getElementById('summaryContent');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <strong>Project Name:</strong> ${name}<br>
          <strong>Description:</strong> ${desc}<br>
          <strong>Deadline:</strong> ${deadline}<br>
          <strong>Priority:</strong> ${priority}<br>
          <strong>Data Type:</strong> ${dataType}<br>
          <strong>Annotation:</strong> ${annotation}<br>
          <strong>Team Members:</strong> ${team.length ? team.length + ' member(s)' : 'None added'}
        `;
      }
    }
    renderSummary();
    const timeout = setTimeout(() => { window.location.href = "dashboard.html"; }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="success-container" style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',maxWidth:'600px',margin:'auto',minHeight:'100vh'}}>
      <div className="success-card" id="successCard" style={{background:'white',borderRadius:'18px',boxShadow:'0 8px 32px rgba(0,0,0,0.13)',textAlign:'center',width:'100%',padding:'40px 20px'}}>
        <div className="check-icon" style={{background:'black',color:'white',borderRadius:'16px',margin:'auto',fontSize:'32px',width:'60px',height:'60px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'center'}}>&#10004;</div>
        <h2 style={{fontWeight:'bold',margin:0,color:'#333',lineHeight:1.2,fontSize:'20px'}}>Created Successfully</h2>
        <div id="summary" style={{textAlign:'left',marginTop:'28px',fontSize:'14px',lineHeight:1.5}}>
          <div style={{fontWeight:600,marginBottom:'8px'}}>Summary</div>
          <div id="summaryContent">Loading project details...</div>
        </div>
      </div>
    </div>
  );
};

export default Successfully;
