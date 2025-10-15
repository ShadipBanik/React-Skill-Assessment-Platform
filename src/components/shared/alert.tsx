import { useEffect } from "react";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number; // ms
}

export default function Alert({
  type = "info",
  message,
  onClose,
  autoClose = true,
  duration = 4000,
}: AlertProps) {
  useEffect(() => {
    if (!autoClose) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [autoClose, duration, onClose]);

  const color =
    type === "success" ? "bg-green-50 border-green-400 text-green-800" :
    type === "error" ? "bg-red-50 border-red-400 text-red-800" :
    "bg-blue-50 border-blue-400 text-blue-800";

  const icon =
    type === "success" ? (
      // check icon
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.414 0l-3.182-3.182a1 1 0 011.414-1.414l2.475 2.475 6.363-6.363a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : type === "error" ? (
      // x icon
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 8.586L4.293 2.879A1 1 0 102.879 4.293L8.586 10l-5.707 5.707a1 1 0 101.414 1.414L10 11.414l5.707 5.707a1 1 0 001.414-1.414L11.414 10l5.707-5.707a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
      </svg>
    ) : (
      // info icon
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-3a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    );

  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full max-w-lg mx-auto ${color} border rounded-md px-4 py-3 shadow-sm flex items-start gap-3`}
    >
      <div className="pt-0.5">{icon}</div>

      <div className="flex-1 text-sm leading-tight">
        {message}
      </div>

      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="ml-2 shrink-0 inline-flex items-center justify-center p-1 rounded hover:bg-white/20"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 8.586L4.293 2.879A1 1 0 102.879 4.293L8.586 10l-5.707 5.707a1 1 0 101.414 1.414L10 11.414l5.707 5.707a1 1 0 001.414-1.414L11.414 10l5.707-5.707a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
