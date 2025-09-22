import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "/frontend/dashboard.html";
      } else {
        setError(data.message || data.errors || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen m-0 font-inter">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md max-w-sm w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-8">Sign into your account to continue</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
          {/* Email Field */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm mb-1.5">Email address <span className="text-red-500">*</span></label>
            <div className="field-wrapper">
              <input type="email" id="email" name="email" placeholder="Enter email address" required className="w-full border bg-gray-100 rounded-md outline-none py-3 px-4 text-sm focus:ring-1 focus:ring-gray-400 transition-all" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          {/* Password Field */}
          <div className="text-left">
            <label htmlFor="loginPassword" className="block text-sm mb-1.5">Password <span className="text-red-500">*</span></label>
            <div className="field-wrapper flex items-center">
              <input type={showPassword ? "text" : "password"} id="loginPassword" name="password" placeholder="Enter password" required className="w-full border bg-gray-100 rounded-md outline-none py-3 px-4 text-sm focus:ring-1 focus:ring-gray-400 transition-all" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="ml-2 text-gray-500" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="verification.html" className="text-sm hover:underline text-gray-700">Forgot password?</a>
          </div>
          {/* Continue Button */}
          <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white text-center py-3 px-4 rounded-md font-medium transition duration-200 mt-6 relative" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span>Continue</span>
            )}
          </button>
          {/* OR Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Google Button */}
          <a href="/accounts/google/login/" className="w-full border border-gray-300 rounded-full py-2.5 px-4 flex items-center justify-center hover:bg-gray-50 transition duration-200">
            <img src="src/png/Google.png" alt="Google logo" className="w-[30px] h-[30px] mr-3 rounded-full" />
            <span>Continue with Google</span>
          </a>
          {/* Sign Up Link */}
          <div className="text-center text-sm mt-6">
            Don't have an account? <a href="signup.html" className="font-semibold hover:underline">Sign up</a>
          </div>
        </form>
        <div className="text-center text-xs text-gray-600 mt-6">
          By continuing, you agree to our <a href="#" className="font-semibold hover:underline">Terms of Service</a> and <a href="#" className="font-semibold hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
