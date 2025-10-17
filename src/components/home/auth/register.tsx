import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [registerData, setRegisterData] = useState({ fullName: "", email: "", password: "" });
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [isRestricted, setIsRestricted] = useState(false);

  const restrictedCountries = ["BD", "IN", "PK"]; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRestricted) return;
    console.log("Registering:", registerData);
    setRegisterData({ fullName: "", email: "", password: "" });
  };

  useEffect(() => {
    // Try ipapi first
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setUserCountry(data.country);
        setIsRestricted(restrictedCountries.includes(data.country));
      })
      .catch(() => {
        console.warn("ipapi failed, trying ipinfo.io...");
        fetch("https://ipinfo.io/json?token=03252c1636d1a3")
          .then(res => res.json())
          .then(data => {
            setUserCountry(data.country);
            setIsRestricted(restrictedCountries.includes(data.country));
          })
          .catch(() => {
            setUserCountry(null);
            setIsRestricted(false);
          });
      });
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side form */}
      <div className="flex-1 flex flex-col">
        <header className="w-full px-4 py-4 md:px-8 lg:px-8">
          <Link to={"/"}>
             <img src="/images/logo.svg" className="app-logo prevent-events"></img>
          </Link>
        </header>

        <div className="min-h-screen flex items-center justify-center sm:min-h-0 sm:items-start sm:justify-start">
          <form
            key="register-form"
            onSubmit={handleSubmit}
            className="space-y-6 w-full p-4 md:p-8 lg:p-8 md:w-[640px] lg:w-[640px] lg:ml-10 lg:mt-10 md:ml-10 md:mt-10 animate-fadeSlideLeft"
          >
            <h1 className="text-lg font-medium text-gray-800 mb-6">Create your account</h1>

            {/* Location restriction notice */}
            {isRestricted && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                Registration is not allowed from your country.
              </div>
            )}

            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full name*"
                value={registerData.fullName}
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
              disabled={isRestricted}
              className={`w-auto px-5 text-white font-medium py-2 rounded-lg transition ${
                isRestricted ? "bg-gray-400 cursor-not-allowed" : "bg-[#6c5ce7] hover:bg-[#5a4bd8]"
              }`}
            >
              Register
            </button>

            <p className="text-sm text-gray-600 mt-2">
              Already have an account? &nbsp;
              <Link
                to={"/login"}
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
          key="register"
          src="/images/login-banner-1.webp"
          alt="Illustration"
          className="max-w-md rounded-lg shadow-2xl transition-all duration-700 ease-out opacity-0 animate-fadeInUp"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
