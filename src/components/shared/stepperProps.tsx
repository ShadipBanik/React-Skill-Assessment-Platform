import React from "react";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Analysis & optimization" },
    { id: 2, label: "Creating a marketing plan" },
    { id: 3, label: "Quantitative reasoning" },
    { id: 4, label: "Video question" },
  ];

  return (
    <div className="w-full flex md:flex-col items-center">
      <div className="flex w-[80%] md:w-full items-center  p-2 sm:p-4 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 min-w-[50px] sm:min-w-0">
            <div className="flex items-center gap-2 relative z-10">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-sm font-medium
                  ${
                    currentStep >= step.id
                      ? "bg-[#6c5ce7] text-white border-[#6c5ce7]"
                      : "bg-gray-300 text-gray-600 border-gray-300"
                  }
                `}
              >
                {step.id}
              </div>
              <span className="hidden sm:inline font-normal text-gray-800 whitespace-nowrap">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[1px] bg-gray-300 mx-2 relative">
                <div
                  className="absolute top-0 left-0 h-[1px] bg-[#6c5ce7] transition-all duration-500"
                  style={{
                    width:
                      currentStep > step.id
                        ? "100%"
                        : currentStep === step.id
                        ? "50%"
                        : "0%",
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
