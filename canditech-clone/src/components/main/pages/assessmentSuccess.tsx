import { Link } from "react-router-dom";
import PageHeader from "../../shared/pageHeader";

export default function AssessmentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Checkmark Icon */}
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* Message */}
          <div>
            <p className="text-gray-800 font-medium">
              Thanks for taking the assessment!
            </p>
            <p className="text-gray-600 text-sm">
              We would appreciate your feedback:
            </p>
          </div>

          {/* Button */}
          <Link
            to={"/assessment-survey"}
            className="bg-[#6c5ce7] text-white font-medium px-6 py-2 rounded-md hover:bg-[#5a4ed0] transition"
          >
            TAKE A 30 SECOND SURVEY
          </Link>

          {/* Support text */}
          <div className="text-sm text-gray-600">
            <p>If you had any technical issues, please contact us:</p>
            <a
              href="mailto:support@canditech.io"
              className="text-[#6c5ce7] underline hover:text-[#5a4ed0]"
            >
              support@canditech.io
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
