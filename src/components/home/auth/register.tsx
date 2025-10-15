// src/pages/AuthPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
const [registerData, setRegisterData] = useState({ fullName: "", email: "", password: "" });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });

};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
    console.log("Registering:", registerData);
    setRegisterData({ fullName: "", email: "", password: "" });
};

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side form */}
      <div className="flex-1 flex flex-col ">
        <header className="w-full px-4 py-4 md:px-8 kg:px-8">
          <Link to={"/"}>
            <svg
              data-v-93af43e6=""
              data-v-f4f04327=""
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 130 22"
              className="app-logo prevent-events"
            >
              <path d="M14.646 5.244q0 .673-.353 1.2a2.9 2.9 0 0 1-.82.79 10.3 10.3 0 0 0-1.669-.878q-.878-.38-2.108-.38-2.344 0-3.662 1.494-1.318 1.465-1.318 4.189c0 1.816.46 3.29 1.377 4.247q1.405 1.406 3.838 1.406 1.259 0 2.138-.321a10 10 0 0 0 1.669-.82q.439.352.704.908.292.527.292 1.2 0 .585-.322 1.114-.293.498-1.055.85-.585.291-1.582.527-.996.264-2.46.263-1.963 0-3.661-.557a8.1 8.1 0 0 1-2.958-1.699q-1.26-1.141-1.992-2.9Q0 14.09 0 11.659q0-2.286.704-4.042.732-1.758 1.963-2.93a8.15 8.15 0 0 1 2.87-1.816 9.9 9.9 0 0 1 3.515-.616q2.666 0 4.13.85 1.465.85 1.465 2.137zM23.176 17.693q.645 0 1.259-.118.645-.146.967-.35V14.53L23 14.735q-.938.089-1.523.44-.557.322-.557.996c0 .448.177.84.528 1.113q.526.41 1.728.41zM23 6.005q1.523 0 2.754.322 1.26.292 2.138.937a4.24 4.24 0 0 1 1.347 1.64q.499.996.498 2.343v6.62q0 .762-.41 1.23a3.6 3.6 0 0 1-.937.762q-.908.556-2.226.85-1.319.291-2.987.291-3.017 0-4.804-1.141-1.788-1.172-1.787-3.544 0-2.022 1.2-3.075 1.2-1.055 3.691-1.318l3.895-.41v-.322q0-.937-.76-1.377-.762-.439-2.197-.44-1.113 0-2.197.264a13.6 13.6 0 0 0-1.904.615q-.35-.234-.616-.702a2.45 2.45 0 0 1-.235-1.055q0-1.288 1.348-1.845a8.8 8.8 0 0 1 1.962-.469A14.6 14.6 0 0 1 23 6.005M42.103 11.541q0-1.024-.616-1.523-.615-.499-1.64-.498-.705 0-1.29.176a6 6 0 0 0-1.084.44v10.368a5 5 0 0 1-.82.147 7 7 0 0 1-1.17.088q-1.319 0-1.905-.41-.585-.44-.586-1.67V9.61q0-.76.323-1.23.322-.468.908-.878.937-.675 2.401-1.085 1.494-.41 3.281-.41 3.193 0 4.92 1.406 1.759 1.407 1.758 4.013v9.08a6 6 0 0 1-.85.147 7 7 0 0 1-1.172.088q-1.317 0-1.904-.41-.557-.439-.557-1.669v-7.118zM56.637 6.005q.674 0 1.259.117.615.09 1.114.263v-4.92a9 9 0 0 1 .849-.176A7 7 0 0 1 61.03 1.2q1.318 0 1.875.44.586.439.586 1.669v14.265q0 .704-.292 1.2-.294.468-.937.88-.82.498-2.109.907-1.288.41-2.958.41-3.69 0-5.83-1.845-2.108-1.876-2.108-5.595 0-1.933.557-3.34.585-1.405 1.582-2.343A6.15 6.15 0 0 1 53.74 6.47a8.8 8.8 0 0 1 2.9-.469zm2.402 3.954a4.7 4.7 0 0 0-.85-.293 3 3 0 0 0-.937-.147q-1.581 0-2.518.967t-.937 3.076c0 1.406.293 2.334.878 2.959q.909.907 2.49.908.614 0 1.085-.118.497-.147.79-.322V9.96zM71.46 20.505a5 5 0 0 1-.82.147 7 7 0 0 1-1.172.088q-1.318 0-1.904-.41-.557-.439-.557-1.669V6.621q.293-.088.821-.175A7 7 0 0 1 69 6.357q1.32 0 1.875.44.588.439.587 1.669zM66.745 2.402q0-.995.673-1.698Q68.12 0 69.233 0q1.114 0 1.787.704.701.703.702 1.698c0 .664-.235 1.26-.702 1.728q-.673.704-1.787.704t-1.816-.704q-.672-.703-.673-1.728M79.382 15.877q0 .82.527 1.2.527.351 1.465.351.44 0 .937-.088.498-.116.85-.263.263.293.439.675.175.38.176.878 0 1.026-.82 1.699-.79.645-2.783.645-2.46 0-3.837-1.114-1.378-1.142-1.377-3.69V3.015q.322-.087.85-.176a5.3 5.3 0 0 1 1.142-.117q1.289 0 1.846.468.585.44.586 1.64v1.904h4.043q.146.293.293.761.145.439.145.938 0 .937-.438 1.347-.41.41-1.084.41h-2.96v5.686M90.007 15.35q.41 1.23 1.435 1.757 1.025.498 2.373.498 1.23 0 2.314-.322 1.084-.353 1.757-.761.44.293.732.761.293.469.294 1.026 0 .673-.41 1.172t-1.143.85q-.702.321-1.699.468-.967.176-2.139.176-1.728 0-3.192-.468-1.466-.499-2.519-1.436-1.055-.967-1.67-2.402-.585-1.436-.585-3.37c0-1.29.195-2.333.586-3.25q.615-1.377 1.61-2.285a6.4 6.4 0 0 1 2.314-1.318 8.5 8.5 0 0 1 2.696-.44q1.496 0 2.723.47 1.26.438 2.14 1.258a5.7 5.7 0 0 1 1.405 1.963q.497 1.142.497 2.49 0 .938-.497 1.407-.498.469-1.406.615zm2.782-6.035q-1.259 0-2.11.79-.82.762-.966 2.227l5.594-.908q-.06-.761-.674-1.436-.615-.673-1.845-.674zM109.809 9.549q-1.582 0-2.696 1.026-1.112.995-1.112 2.959 0 1.962 1.055 2.93 1.083.966 2.723.966.938 0 1.641-.234a10 10 0 0 0 1.23-.527q.498.38.762.82.292.41.292 1.025.001 1.114-1.171 1.787-1.172.674-3.251.674-1.757 0-3.222-.468-1.434-.47-2.46-1.407-1.026-.936-1.582-2.314-.557-1.406-.557-3.251c0-1.23.206-2.373.616-3.31q.614-1.407 1.669-2.344a7 7 0 0 1 2.459-1.406 9.3 9.3 0 0 1 2.958-.469q2.02 0 3.165.732 1.172.732 1.172 1.846 0 .526-.264.966a2.8 2.8 0 0 1-.586.761 7 7 0 0 0-1.26-.527 5 5 0 0 0-1.581-.234zM120.918 20.505a5 5 0 0 1-.82.147 7 7 0 0 1-1.172.088q-1.318 0-1.904-.41-.586-.439-.586-1.669V1.466q.32-.087.849-.176a7 7 0 0 1 1.172-.088q1.319 0 1.875.44.586.438.586 1.668v3.37q.615-.293 1.377-.47a6.8 6.8 0 0 1 1.698-.205q2.813 0 4.395 1.436 1.61 1.405 1.61 4.247v8.817a5 5 0 0 1-.82.147 7 7 0 0 1-1.172.088q-1.318 0-1.903-.41-.586-.439-.586-1.669v-6.707q0-1.318-.673-1.875-.645-.557-1.67-.557-.673 0-1.23.206a5.4 5.4 0 0 0-1.026.44v10.34z"></path>
            </svg>
          </Link>
        </header>
        <div className="min-h-screen flex items-center justify-center sm:min-h-0 sm:items-start sm:justify-start">
          <form
            key="register-form" // re-render triggers animation
            onSubmit={handleSubmit}
            className="space-y-6 w-full p-4 md:p-8 lg:p-8 md:w-[640px] lg:w-[640px] lg:ml-10 lg:mt-10 md:ml-10 md:mt-10 animate-fadeSlideLeft"
          >
            <h1 className="text-lg font-medium text-gray-800 mb-6">
               Create your account
            </h1>

              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name*"
                  value={registerData.fullName }
                  onChange={handleChange}
                  required
                  className="w-full border text-sm bg-white border-gray-300 focus:border-[#6c5ce7] focus:ring-[#6c5ce7] rounded-lg px-2 py-2 outline-none"
                />
              </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={registerData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full border text-sm bg-white border-gray-300 focus:border-[#6c5ce7] focus:ring-[#6c5ce7] rounded-lg px-2 py-2 outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password*"
                value={registerData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full border text-sm bg-white border-gray-300 focus:border-[#6c5ce7] focus:ring-[#6c5ce7] rounded-lg px-2 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-auto bg-[#6c5ce7] px-5 text-white font-medium py-2 rounded-lg hover:bg-[#6c5ce7] transition"
            >
              Register
            </button>

            <p className="text-sm text-gray-600 mt-2">
              Already have an account? &nbsp;
              <Link to={'/login'}
                type="button"
                className="text-[#6c5ce7] font-medium hover:underline"
              >
                 Login here
              </Link>
            </p>
          </form>
        </div>

      </div>

      {/* Right side illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-200">
        <img
          key= "register"
          src="/images/login-banner-1.webp"
          alt="Illustration"
          className="max-w-md rounded-lg shadow-2xl transition-all duration-700 ease-out opacity-0 animate-fadeInUp"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
