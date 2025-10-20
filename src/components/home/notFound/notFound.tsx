import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* 404 Icon */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-[#6c5ce7] animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12V16.5zM4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
          />
        </svg>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl px-8 py-10 max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-[#6c5ce7] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-[#6c5ce7] hover:bg-[#6c5ce7] text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Go Back Home
        </button>
      </div>

      {/* Decorative footer text */}
      <p className="mt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your App. All rights reserved.
      </p>
    </div>
  );
}
