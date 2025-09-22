import React, { useRef, useState } from "react";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const handleSubmit = () => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email) {
      setMsgType("error");
      setMsg("Please enter your email address!");
      return;
    }
    if (!emailPattern.test(email)) {
      setMsgType("error");
      setMsg("Please enter a valid email format!");
      return;
    }
    setMsgType("success");
    setMsg(`Verification code sent to ${email}`);
    setTimeout(() => {
      window.location.href = "verification1.html";
    }, 1500);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white w-11/12 sm:w-96 p-8 rounded-xl shadow-lg text-center animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Enter your email address</h2>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-4/5 bg-black text-white py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition"
        >
          Continue
        </button>
        {msg && (
          <p className={`mt-4 text-sm ${msgType === "error" ? "text-red-500" : "text-green-600"}`}>{msg}</p>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Verification;
