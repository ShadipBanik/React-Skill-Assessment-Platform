// src/components/LoadingCard.tsx
import React from "react";

const LoadingCard: React.FC = () => {
  return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg">
                {/* Replace Tailwind spinner with GIF */}
                <img 
                src="images/spinner.gif" 
                alt="Loading..." 
                className="w-12 h-12"
                />
                <span className="text-gray-700 font-medium mt-3">Loading</span>
            </div>
            </div>
  );
};

export default LoadingCard;
