import type { RefObject } from "react";

interface VideoRecorderProps {
  step: "initial" | "ready" | "recording" | "uploading" | "review";
  videoRef: RefObject<HTMLVideoElement | null>; // allow null
  videoURL: string | null;
  timeLeft: number;
  uploadProgress: number;
  onOpenRecorder: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onReview: () => void;
  onRecordAgain: () => void;
  formatTime: (seconds: number) => string;
}

export default function VideoRecorder({
  step,
  videoRef,
  videoURL,
  timeLeft,
  uploadProgress,
  onOpenRecorder,
  onStartRecording,
  onStopRecording,
  onReview,
  onRecordAgain,
  formatTime,
}: VideoRecorderProps) {
  return (
    <div className="flex flex-col items-center w-full mt-6">
      <div className="relative w-full max-w-[640px] h-[55vw] sm:h-[350px] bg-[#1e1e1e] rounded-t-lg overflow-hidden shadow-xl flex items-center justify-center">
        {step === "initial" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenRecorder();
            }}
            className="flex items-center space-x-2 bg-gray-700 mt-[68px] hover:bg-gray-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs md:text-base"
          >
            <i className="fas fa-video" />
            <span>CLICK HERE TO OPEN VIDEO RECORDER</span>
          </button>
        )}

        {(step === "ready" ||
          step === "recording" ||
          step === "review" ||
          step === "uploading") && (
          <>
            <video
              ref={videoRef}
              src={videoURL || undefined}
              controls={!!(step === "ready" && videoURL)}
              autoPlay={step === "recording"}
              muted={step === "recording"}
              className="w-full h-full object-cover"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />

            {step === "recording" && (
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs sm:text-sm px-2 py-1 rounded">
                {formatTime(timeLeft)}
              </div>
            )}
          </>
        )}

        {/* Upload Progress */}
        {step === "uploading" && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-center">
            <div className="relative w-24 h-24">
              <svg
                className="transform -rotate-90 w-24 h-24"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#555"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#4ade80"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={Math.PI * 2 * 45}
                  strokeDashoffset={
                    Math.PI * 2 * 45 * (1 - uploadProgress / 100)
                  }
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                {uploadProgress}%
              </div>
            </div>
            <p className="mt-4 text-lg">Uploading...</p>
          </div>
        )}

        {/* Review Overlay */}
        {step === "review" && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm sm:text-lg font-medium mb-4">
              Your video was uploaded successfully!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onReview();
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-play mr-2"></i> REVIEW VIDEO
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onRecordAgain();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-redo mr-2"></i> RECORD AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      {step !== "initial" && (
        <div className="relative w-full max-w-[640px] h-[60px] sm:h-[64px] bg-gray-800/90 rounded-b-lg text-white flex justify-center items-center">
          {step === "ready" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onStartRecording();
              }}
              className="bg-black hover:bg-black px-4 py-2 rounded-md flex items-center space-x-2 text-sm sm:text-base"
            >
              <i className="fas fa-circle mr-2 text-red-500" /> Start Recording
            </button>
          )}

          {step === "recording" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onStopRecording();
              }}
              className="bg-black hover:bg-black px-4 py-2 rounded-md flex items-center space-x-2 text-sm sm:text-base"
            >
              <i className="fas fa-stop mr-2 text-red-500" /> Stop Recording
            </button>
          )}
        </div>
      )}
      {step === "initial" && (
        <div className="relative w-full max-w-[640px] h-[60px] sm:h-[64px] bg-[#1e1e1e] rounded-b-lg"></div>
      )}
    </div>
  );
}
