import { useRef, useState } from "react";
import VideoRecorder from "./VideoRecorder";
import ConfirmModal from "../../../shared/ConfirmModal";

interface AssessmentRecorderProps {
  onVideoUpload?: (file: File) => Promise<void>;
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
  const [deviceError, setDeviceError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const openRecorder = () => setStep("ready");

  const startRecording = async () => {
    try {
      let stream: MediaStream | null = null;
      let videoAllowed = false;
      let audioAllowed = false;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoAllowed = true;
        audioAllowed = true;
      } catch {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          });
          videoAllowed = false;
          audioAllowed = true;
        } catch {
          setDeviceError(true);
          return;
        }
      }

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
        const blob = new Blob(chunksRef.current, {
          type: videoAllowed ? "video/webm" : "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        chunksRef.current = [];

        setStep("uploading");
        setUploadProgress(0);

        if (onVideoUpload) await simulateUpload(blob, onVideoUpload);
        else await simulateUpload(blob);

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
    } catch {
      setDeviceError(true);
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
    for (let i = 1; i <= 100; i++) {
      await new Promise((res) => setTimeout(res, 20));
      setUploadProgress(i);
    }
    if (uploadCallback) await uploadCallback(file);
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

        <VideoRecorder
          step={step}
          videoRef={videoRef}
          videoURL={videoURL}
          timeLeft={timeLeft}
          uploadProgress={uploadProgress}
          onOpenRecorder={openRecorder}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onReview={handleReview}
          onRecordAgain={handleRecordAgain}
          formatTime={formatTime}
        />
      </div>

      <ConfirmModal
        isOpen={deviceError}
        onClose={() => setDeviceError(false)}
        message="Device not found. Please make sure the camera and microphone are connected."
      />
    </div>
  );
}
