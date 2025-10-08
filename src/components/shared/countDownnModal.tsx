import { useEffect, useState } from "react";

interface CountdownModalProps {
  isOpen: boolean;
  duration: number;
  onClose: () => void;
}

export default function CountdownModal({
  isOpen,
  duration,
  onClose,
}: CountdownModalProps) {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!isOpen) return;
    setCount(duration);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          // 👇 Wait 1 second after reaching 0 before closing
          setTimeout(() => onClose(), 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-[350px] text-center">
        <h2 className="text-xl font-semibold mb-3">Time is up!</h2>
        <p className="text-gray-600 mb-6">
          Please wait while the next section loads automatically.
        </p>

        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <svg className="absolute top-0 left-0 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="45"
              stroke="#ef4444"
              strokeWidth="6"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(1 - count / duration) * 2 * Math.PI * 45}
              transform="rotate(-90 48 48)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="text-3xl font-bold text-red-500">{count}</span>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
