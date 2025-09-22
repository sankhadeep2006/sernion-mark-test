import React, { useEffect, useRef, useState } from "react";

const Verification1 = () => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(60);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    inputRefs[0].current.focus();
    startCooldown();
    // eslint-disable-next-line
  }, []);

  const startCooldown = () => {
    setCooldown(60);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInput = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[idx] = val;
    setDigits(newDigits);
    setError("");
    if (val && idx < 3) inputRefs[idx + 1].current.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs[idx - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").split("");
    const newDigits = ["", "", "", ""];
    pasted.forEach((d, i) => { if (i < 4) newDigits[i] = d; });
    setDigits(newDigits);
    if (pasted.length >= 4) inputRefs[3].current.focus();
    else if (pasted.length > 0) inputRefs[pasted.length].current.focus();
  };

  const handleContinue = () => {
    if (digits.every(Boolean)) {
      if (digits.join("") === "5678") {
        window.location.href = "verification2.html";
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } else {
      setError("Please enter the verification code.");
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (cooldown === 0) {
      setDigits(["", "", "", ""]);
      inputRefs[0].current.focus();
      setError("");
      startCooldown();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h2 className="text-base md:text-lg text-gray-800 mb-8 leading-relaxed">
          We've sent a verification code to your email. Please check your inbox and enter the code below to continue.
        </h2>
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        <div className="flex justify-center gap-6 mb-8">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              className={`code-digit w-16 h-16 md:w-20 md:h-20 text-2xl font-bold text-center border-2 ${error && !digit ? "border-red-500 bg-red-50" : "border-gray-400"} rounded-lg focus:border-black focus:outline-none transition`}
              value={digit}
              ref={inputRefs[idx]}
              onChange={e => handleInput(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button
          disabled={!digits.every(Boolean)}
          onClick={handleContinue}
          className="w-60 py-3 text-lg font-medium rounded-lg bg-black text-white disabled:bg-gray-400 hover:bg-gray-800 transition mb-4"
        >
          Continue
        </button>
        <div className="text-sm text-gray-600">
          Didn't get the code?
          <a
            href="#"
            onClick={handleResend}
            className={`text-blue-600 hover:underline ml-1 ${cooldown > 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            Resend
          </a>
          <span className="ml-2">{cooldown > 0 && `(${cooldown}s)`}</span>
        </div>
      </div>
    </div>
  );
};

export default Verification1;
