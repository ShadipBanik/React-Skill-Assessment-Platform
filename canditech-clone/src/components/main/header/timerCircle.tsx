import React, { useEffect, useState } from "react";

interface TimerCircleProps {
  duration: number; // in seconds
  size?: number; // diameter
  strokeWidth?: number;
  className?: string; // Tailwind classes
}

const TimerCircle: React.FC<TimerCircleProps> = ({
  duration,
  size = 90,
  strokeWidth = 8, // thicker default
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        style={{
          borderRadius: "50%",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="100%" stopColor="#836fff" />
          </linearGradient>
        </defs>

        {/* White background fill */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="#fff" />

        {/* Gray border circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#ccc"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Timer text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={size * 0.25}
          fontWeight="normal"
          fill="url(#gradient)"
        >
          {formatTime(timeLeft)}
        </text>
      </svg>
    </div>
  );
};

export default TimerCircle;
