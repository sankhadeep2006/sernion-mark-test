import React from "react";

const Verification2 = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h2 className="text-base md:text-lg text-gray-800 mb-8 leading-relaxed">
          Your email has been successfully verified!<br />
          You can now proceed to set your password or continue to your dashboard.
        </h2>
        <a
          href="/frontend/login.html"
          className="w-60 py-3 text-lg font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition mb-4 inline-block"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Verification2;
