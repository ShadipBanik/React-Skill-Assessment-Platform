import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./header/header";
import ConfirmModal from "../shared/ConfirmModal";
import QuantitativeTab from "./tabSections/quantitative";
import MarketingPlan from "./tabSections/marketingPlan";
import AnalysisTab from "./tabSections/Analysis";
import CountdownModal from "../shared/countDownnModal";
import AssessmentRecorder from "./tabSections/videoSection/videoQuestion";

export default function AssessmentPage() {
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

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
  const STEP_DURATIONS = [40, 30, 40, 80]; // seconds per step

  // timers stored as window timer IDs (number)
  const mainTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);

  // token to invalidate timers from previous steps
  const stepTokenRef = useRef(0);

  // avoid double submission per step
  const submittedRef = useRef(false);

  // mirror formData in a ref for synchronous reads when submitting
  const formDataRef = useRef<Record<string, any>>(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const storedUser = localStorage.getItem("user");
  let userEmail: string | null = null;
  try {
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    userEmail = parsed?.email ?? parsed ?? null;
  } catch {
    userEmail = storedUser ?? null;
  }

  // redirect if already done
  useEffect(() => {
    if (localStorage.getItem(`assessmentDone:${userEmail}`) === "true") {
      navigate("/assessment-success");
    }
  }, [navigate, userEmail]);

  // when currentStep changes, start a brand new timer (and invalidate previous timers)
  useEffect(() => {
    startStepTimer();
    return () => {
      // cleanup when unmounting or before starting a new step
      clearAllTimersAndInvalidate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const clearAllTimersAndInvalidate = () => {
    // increment token to invalidate any previously scheduled callbacks
    stepTokenRef.current += 1;

    if (mainTimerRef.current) {
      window.clearTimeout(mainTimerRef.current);
      mainTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      window.clearTimeout(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    // reset submittedRef for next step
    submittedRef.current = false;
  };

  const startStepTimer = () => {
    // invalidate prior timers immediately
    clearAllTimersAndInvalidate();

    // capture token and the step for safety
    const token = ++stepTokenRef.current;
    const stepAtStart = currentStep;
    submittedRef.current = false;
    setShowCountdownModal(false);

    const duration = STEP_DURATIONS[stepAtStart - 1] ?? 0;
    const stepEnd = Date.now() + duration * 1000;

    const stepCheck = () => {
      // if another step started, bail out
      if (token !== stepTokenRef.current) return;

      const remaining = stepEnd - Date.now();
      if (remaining <= 0) {
        // step time finished exactly now
        console.log(
          `⏳ Step ${stepAtStart} time limit reached — opening countdown`
        );
        setShowCountdownModal(true);

        // start countdown (20s) with same token guard
        const countdownEnd = Date.now() + 20 * 1000;
        const countdownCheck = () => {
          if (token !== stepTokenRef.current) return;
          if (Date.now() >= countdownEnd) {
            console.log(
              `✅ Step ${stepAtStart} auto-submitted after countdown`
            );
            // finalise this step (pass stepAtStart and token)
            finishStep(stepAtStart, token);
          } else {
            // schedule next small-check (shorter of remaining or 500ms)
            const nextDelay = Math.min(500, countdownEnd - Date.now());
            countdownTimerRef.current = window.setTimeout(
              countdownCheck,
              nextDelay
            ) as unknown as number;
          }
        };

        // first countdown tick
        countdownCheck();
      } else {
        // schedule next check (shorter of remaining or 500ms)
        const nextDelay = Math.min(500, remaining);
        mainTimerRef.current = window.setTimeout(
          stepCheck,
          nextDelay
        ) as unknown as number;
      }
    };

    // kickoff
    stepCheck();
  };

  // finishStep receives the step index it is finishing (prevents stale-step writes)
  const finishStep = (stepIndex: number, token: number) => {
    // ensure it's still valid token and hasn't been submitted already
    if (token !== stepTokenRef.current) return;
    if (submittedRef.current) return;

    submittedRef.current = true;
    setShowCountdownModal(false);

    // collect the step data at the moment of finishing
    const stepData = getCurrentStepDataFor(stepIndex);
    setTempStepData(stepData);

    // commit using explicit stepIndex & data (avoids relying on possibly-changed currentStep)
    handleConfirmYes(true, stepIndex, stepData);
  };

  // When modal close (user clicked CONTINUE), finish the currently active step safely
  const handleCountdownClose = () => {
    // use current token and step for safety
    const token = stepTokenRef.current;
    const stepAtClose = currentStep;
    finishStep(stepAtClose, token);
  };

  const tabChange = () => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  };

  // reads form fields / video file for a *given* step index
  // (for form-based steps, we assume the form DOM holds current step answers while user is on that step)
  const getCurrentStepDataFor = (stepIndex: number): Record<string, any> => {
    if (stepIndex === 4) {
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

  // Manual submit button handler (opens confirmation)
  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const stepData = getCurrentStepDataFor(currentStep);
    setTempStepData(stepData);
    setIsSubmitModalOpen(true);
  };

  // Unified confirm handler. Accepts optional stepIndex & stepData (used by auto-finish)
  const handleConfirmYes = (
    auto = false,
    stepIndexArg?: number,
    stepDataArg?: Record<string, any>
  ) => {
    // pick explicit step index if provided (auto path), otherwise use currentStep
    const stepIndexToUse =
      typeof stepIndexArg === "number" ? stepIndexArg : currentStep;
    const stepData =
      stepDataArg ?? tempStepData ?? getCurrentStepDataFor(stepIndexToUse);

    // invalidate any running timers immediately to avoid races
    clearAllTimersAndInvalidate();

    // update the formData (both state and ref synchronously)
    const newFormData = {
      ...formDataRef.current,
      [`step${stepIndexToUse}`]: stepData,
    };
    setFormData(newFormData);
    formDataRef.current = newFormData;

    // cleanup UI flags
    setTempStepData(null);
    setIsSubmitModalOpen(false);
    setLoading(false);

    // move to next step or final submit
    if (stepIndexToUse < TOTAL_STEPS) {
      // set current step to the next step index
      setCurrentStep(stepIndexToUse + 1);
      // small UX: open tab-change modal in background
      tabChange();
    } else {
      // final submit — we have the complete data in newFormData
      const finalData = {
        ...newFormData,
        email: userEmail,
      };
      console.log("✅ Submitting all steps data:", finalData);
      localStorage.setItem(`assessmentDone:${userEmail}`, "true");
      navigate("/assessment-success", { state: finalData });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] ">
      <Header
        currentStep={currentStep}
        duration={STEP_DURATIONS[currentStep - 1]}
        key={currentStep}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <form
          ref={formRef}
          onSubmit={handleStepSubmit}
          className="bg-white shadow-md rounded-2xl p-6 mt-[120px] space-y-8"
        >
          <div className="w-full overflow-hidden">
            <TransitionGroup component={null}>
              <CSSTransition
                key={currentStep}
                nodeRef={stepRefs[currentStep - 1]}
                timeout={1000}
                classNames="step"
              >
                <div ref={stepRefs[currentStep - 1]} className="w-full">
                  {currentStep === 1 && <AnalysisTab />}
                  {currentStep === 2 && <MarketingPlan />}
                  {currentStep === 3 && <QuantitativeTab />}
                  {currentStep === 4 && (
                    <AssessmentRecorder
                      onVideoUpload={async (file) => setVideoFile(file)}
                    />
                  )}
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 flex font-bold items-center justify-center gap-2 text-white rounded w-[221px] h-[44px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : currentStep < 4 ? (
                "SUBMIT SECTION"
              ) : (
                "FINAL SUBMIT"
              )}
            </button>
          </div>
        </form>
      </main>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={() => setIsModalOpen(false)}
        title="Oops! Tab change detected"
        message="We noticed that you have left the assessment tab. The hiring team is monitoring this action. Please remain on this page until the assessment is completed."
        confirmText="Agree & Continue"
      />

      <CountdownModal
        isOpen={showCountdownModal}
        duration={20}
        onClose={handleCountdownClose}
      />

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
