import React, { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const continueBtn = document.getElementById('continueBtn');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
    if (toggleConfirmPassword && confirmPasswordInput) {
      toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
    function setInputError(input, errorElement, message) {
      input.classList.add('border-red-500', 'shake-animation');
      input.classList.remove('border-gray-200');
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      setTimeout(() => {
        input.classList.remove('shake-animation');
      }, 820);
    }
    function clearInputError(input, errorElement) {
      input.classList.remove('border-red-500');
      input.classList.add('border-gray-200');
      errorElement.classList.add('hidden');
      errorElement.textContent = '';
    }
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    if (continueBtn) {
      continueBtn.addEventListener('click', function (e) {
        e.preventDefault();
        clearInputError(fullNameInput, fullNameError);
        clearInputError(emailInput, emailError);
        clearInputError(passwordInput, passwordError);
        clearInputError(confirmPasswordInput, confirmPasswordError);
        let hasErrors = false;
        if (!fullNameInput.value.trim()) {
          setInputError(fullNameInput, fullNameError, 'Full name is required');
          hasErrors = true;
        }
        if (!emailInput.value.trim()) {
          setInputError(emailInput, emailError, 'Email address is required');
          hasErrors = true;
        } else if (!isValidEmail(emailInput.value.trim())) {
          setInputError(emailInput, emailError, 'Please enter a valid email address');
          hasErrors = true;
        }
        if (!passwordInput.value) {
          setInputError(passwordInput, passwordError, 'Password is required');
          hasErrors = true;
        } else if (passwordInput.value.length < 6) {
          setInputError(passwordInput, passwordError, 'Password must be at least 6 characters');
          hasErrors = true;
        }
        if (!confirmPasswordInput.value) {
          setInputError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
          hasErrors = true;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
          setInputError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
          hasErrors = true;
        }
        if (!hasErrors) {
          window.location.href = "verify.html";
        }
      });
    }
    if (fullNameInput) fullNameInput.addEventListener('input', () => clearInputError(fullNameInput, fullNameError));
    if (emailInput) emailInput.addEventListener('input', () => clearInputError(emailInput, emailError));
    if (passwordInput) passwordInput.addEventListener('input', () => clearInputError(passwordInput, passwordError));
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', () => clearInputError(confirmPasswordInput, confirmPasswordError));
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-['Inter',sans-serif]">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Sign into your account to continue</p>
        <div className="space-y-5">
          {/* Full name field */}
          <div>
            <label className="block text-sm mb-1.5">Full name <span className="text-red-500">*</span></label>
            <div className="input-container">
              <input type="text" id="fullName" placeholder="Enter your full name" className="w-full border bg-gray-100 rounded-md outline-none py-2.5 px-3 text-sm transition" />
            </div>
            <div id="fullNameError" className="error-message hidden"></div>
          </div>
          {/* Email field */}
          <div>
            <label className="block text-sm mb-1.5">Email <span className="text-red-500">*</span></label>
            <div className="input-container">
              <input type="email" id="email" placeholder="Enter your email" className="w-full border bg-gray-100 rounded-md outline-none py-2.5 px-3 text-sm transition" />
            </div>
            <div id="emailError" className="error-message hidden"></div>
          </div>
          {/* Password field */}
          <div>
            <label className="block text-sm mb-1.5">Password <span className="text-red-500">*</span></label>
            <div className="input-container">
              <input type="password" id="password" placeholder="Enter your password" className="w-full border bg-gray-100 rounded-md outline-none py-2.5 px-3 text-sm transition" />
              <div className="eye-icon" id="togglePassword">
                <i className="fa-solid fa-eye-slash text-gray-500"></i>
              </div>
            </div>
            <div id="passwordError" className="error-message hidden"></div>
          </div>
          {/* Confirm password field */}
          <div>
            <label className="block text-sm mb-1.5">Confirm password <span className="text-red-500">*</span></label>
            <div className="input-container">
              <input type="password" id="confirmPassword" placeholder="Re-enter password" className="w-full border bg-gray-100 rounded-md outline-none py-2.5 px-3 text-sm transition" />
              <div className="eye-icon" id="toggleConfirmPassword">
                <i className="fa-solid fa-eye-slash text-gray-500"></i>
              </div>
            </div>
            <div id="confirmPasswordError" className="error-message hidden"></div>
          </div>
          {/* Continue button */}
          <button id="continueBtn" className="w-full bg-black text-white py-3 rounded-md text-center block text-base font-medium hover:bg-gray-800 transition mt-2">Continue</button>
          {/* OR divider */}
          <div className="relative flex items-center my-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Google button */}
          <a href="/accounts/google/login/" className="w-full border border-gray-300 rounded-full py-2.5 px-3 flex items-center justify-center hover:bg-gray-50 transition">
            <img src="src/png/Google.png" alt="Google logo" className="w-[30px] h-[30px] mr-2 rounded-full" />
            <span className="text-sm">Continue with Google</span>
          </a>
          {/* Login link */}
          <div className="text-center text-sm mt-5">
            Already have an account? <a href="login.html" className="font-semibold text-black hover:underline">Log in</a>
          </div>
          {/* Terms text */}
          <div className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to our <a href="#" className="font-semibold text-black hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-black hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
