import { useEffect, useRef, useState } from "react";
import Header from "./header/header";
import ConfirmModal from "../shared/ConfirmModal";
import { useNavigate } from "react-router-dom";
import AssessmentRecorder from "./tabSections/videoQusetion";
import QuantitativeTab from "./tabSections/quantitative";
import MarketingPlan from "./tabSections/marketingPlan";
import AnalysisTab from "./tabSections/Analysis";
import CountdownModal from "../shared/countDownnModal";

export default function AssessmentPage() {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tempStepData, setTempStepData] = useState<Record<string, any> | null>(
    null
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const TOTAL_STEPS = 4;
  const STEP_DURATIONS = [40, 30, 40, 40]; // seconds per step

  const storedUser = localStorage.getItem("user");
  let userEmail: string | null = null;
  try {
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    userEmail = parsed?.email ?? parsed ?? null;
  } catch {
    userEmail = storedUser ?? null;
  }

  // Check if user already submitted
  useEffect(() => {
    if (localStorage.getItem(`assessmentDone:${userEmail}`) === "true") {
      navigate("/assessment-success");
    }
  }, [navigate, userEmail]);

  // Auto step submit when timer runs out
  useEffect(() => {
    if (!currentStep) return;

    // Always close modal when a new step starts
    setShowCountdownModal(false);

    const duration = STEP_DURATIONS[currentStep - 1];
    console.log(` Step ${currentStep} started — time limit: ${duration}s`);

    // Timer for main step duration
    const mainTimer = setTimeout(() => {
      console.log(
        ` Step ${currentStep} time limit reached — showing countdown modal`
      );
      setShowCountdownModal(true);

      // Start the 20-second countdown timer
      const countdownTimer = setTimeout(() => {
        console.log(` Step ${currentStep} auto-submitted after countdown`);
        setShowCountdownModal(false);

        // if (currentStep === 4 && !videoFile) {
        //   console.log(" Skipping auto-submit because video not uploaded");
        //   return;
        // }

        const stepData = getCurrentStepData();
        setTempStepData(stepData);
        handleConfirmYes(true);
      }, 20 * 1000); // 20s countdown

      // Clear countdown when unmounted or next step starts
      return () => clearTimeout(countdownTimer);
    }, duration * 1000); // Wait full step duration first

    // Clear both timers if step changes
    return () => clearTimeout(mainTimer);
  }, [currentStep, videoFile]);

  const handleCountdownClose = () => {
    setShowCountdownModal(false);

    const stepData = getCurrentStepData();
    setTempStepData(stepData);
    handleConfirmYes(true);
  };

  const tabChange = () => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  };

  const getCurrentStepData = (): Record<string, any> => {
    if (currentStep === 4) {
      return videoFile ? { videoFile } : {};
    }

    if (!formRef.current) return {};
    const form = new FormData(formRef.current);
    const stepData: Record<string, string> = {};
    form.forEach((value, key) => {
      stepData[key] = value.toString();
    });
    return stepData;
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const stepData = getCurrentStepData();
    setTempStepData(stepData);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmYes = (auto = false) => {
    const stepData = tempStepData || getCurrentStepData();

    // Close countdown if still visible
    setShowCountdownModal(false);

    // Save data for current step
    setFormData((prev) => ({
      ...prev,
      [`step${currentStep}`]: stepData,
    }));

    setTempStepData(null);
    setIsSubmitModalOpen(false);
    setLoading(false);

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      tabChange();
    } else {
      const finalData = {
        ...formData,
        [`step${currentStep}`]: stepData,
        email: userEmail,
      };

      console.log("Submitting all steps data:", finalData);
      localStorage.setItem(`assessmentDone:${userEmail}`, "true");
      navigate("/assessment-success", { state: finalData });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <Header
        currentStep={currentStep}
        duration={STEP_DURATIONS[currentStep - 1]}
        key={currentStep}
      />

      {/* Step forms */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <form
          ref={formRef}
          className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 mt-[120px] space-y-8"
          onSubmit={handleStepSubmit}
        >
          {currentStep === 1 && <AnalysisTab />}
          {currentStep === 2 && <MarketingPlan />}
          {currentStep === 3 && <QuantitativeTab />}
          {currentStep === 4 && (
            <AssessmentRecorder onVideoUpload={(file) => setVideoFile(file)} />
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 flex font-bold items-center justify-center gap-2 
                      text-white rounded disabled:opacity-70 w-[221px] h-[44px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : currentStep < 4 ? (
                "SUBMIT SECTION"
              ) : (
                "FINAL SUBMIT"
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Tab-change modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={() => setIsModalOpen(false)}
        title="Oops! Tab change detected"
        message="We noticed that you have left the assessment tab. The hiring team is monitoring this action. It is suggested that you remain on this page until the assessment is completed."
        confirmText="Agree & Continue"
      />

      <CountdownModal
        isOpen={showCountdownModal}
        duration={20}
        onClose={handleCountdownClose}
      />

      {/* Step confirm modal */}
      <ConfirmModal
        isOpen={isSubmitModalOpen}
        title="Are you sure you want to submit?"
        message={
          currentStep < 4
            ? "Once you submit this section, you cannot edit your answers."
            : "This is your final submission. You cannot edit afterwards."
        }
        actions={
          <>
            <button
              onClick={() => {
                setIsSubmitModalOpen(false);
                setLoading(false);
              }}
              className="px-4 py-2 text-red-600 hover:underline"
            >
              No
            </button>
            <button
              onClick={() => handleConfirmYes(false)}
              className="px-4 py-2 text-green-700"
            >
              Yes
            </button>
          </>
        }
      />
    </div>
  );
}
