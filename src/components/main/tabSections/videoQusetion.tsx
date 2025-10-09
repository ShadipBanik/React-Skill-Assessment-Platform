import { useRef, useState } from "react";

interface AssessmentRecorderProps {
  onVideoUpload?: (file: File) => Promise<void>; // async so we can track progress
}

export default function AssessmentRecorder({
  onVideoUpload,
}: AssessmentRecorderProps) {
  const [step, setStep] = useState<
    "initial" | "ready" | "recording" | "uploading" | "review"
  >("initial");
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const openRecorder = () => setStep("ready");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {});
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (evt: BlobEvent) => {
        if (evt.data && evt.data.size > 0) chunksRef.current.push(evt.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunksRef.current = [];

        // Start uploading
        setStep("uploading");
        setUploadProgress(0);

        if (onVideoUpload) {
          await simulateUpload(blob, onVideoUpload);
        } else {
          await simulateUpload(blob);
        }

        setStep("review");
      };

      mediaRecorder.start();
      setStep("recording");
      setTimeLeft(120);

      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("startRecording error:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
  };

  const simulateUpload = async (
    blob: Blob,
    uploadCallback?: (file: File) => Promise<void>
  ) => {
    const file = new File([blob], "recording.webm", { type: "video/webm" });
    const total = 100;
    for (let i = 1; i <= total; i++) {
      await new Promise((res) => setTimeout(res, 20)); // simulate upload speed
      setUploadProgress(i);
    }
    if (uploadCallback) {
      await uploadCallback(file);
    }
  };

  const handleReview = () => {
    setStep("ready");
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleRecordAgain = () => {
    setVideoURL(null);
    startRecording();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex w-full px-4 sm:px-6 md:px-8">
      <div className="flex flex-col w-full">
        <h1 className="text-sm sm:text-base font-medium text-gray-800 mb-3 leading-relaxed flex flex-col sm:flex-row sm:items-start sm:gap-3 md:text-center xs:text-left sm:text-left">
          <div className="flex mx-auto sm:mx-0 items-center justify-center w-7 h-7 rounded-full border-2 text-base font-normal bg-[#6c5ce7] text-white border-[#6c5ce7] shrink-0">
            1
          </div>
          <span>
            Please explain to the camera (in no more than 2 minutes) what the
            appropriate steps are to plan and execute a successful digital
            marketing campaign.
          </span>
        </h1>
        <div className="w-full sm:pl-10 text-center sm:text-left mb-6">
          <p className="text-sm text-blue-600 underline cursor-pointer mb-1 sm:mb-2">
            Please note
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            You can review your video before submitting the section and
            re-record it multiple times. Once you re-record, it replaces the
            previous video.
          </p>
        </div>
        <div className="flex flex-col items-center w-full mt-6">
          <div className="relative w-full max-w-[640px] h-[55vw] sm:h-[350px] bg-[#1e1e1e] rounded-t-lg overflow-hidden shadow-xl flex items-center justify-center">
            {step === "initial" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openRecorder();
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

            {/* Upload Progress Circle */}
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
                      handleReview();
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium flex items-center justify-center text-sm sm:text-base"
                  >
                    <i className="fas fa-play mr-2"></i> REVIEW VIDEO
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleRecordAgain();
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
                    startRecording();
                  }}
                  className="bg-black hover:bg-black px-4 py-2 rounded-md flex items-center space-x-2 text-sm sm:text-base"
                >
                  <i className="fas fa-circle mr-2 text-red-500" /> Start
                  Recording
                </button>
              )}

              {step === "recording" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    stopRecording();
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
      </div>
    </div>
  );
}
