// Header.tsx
import React from "react";
import TimerCircle from "./timerCircle";
import Stepper from "../../shared/stepperProps";

interface HeaderProps {
  currentStep: number;
  duration: number; // new prop
}

const Header: React.FC<HeaderProps> = ({ currentStep, duration }) => {
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="relative bg-[#6c5ce7] text-white py-2 px-4 sm:px-6 flex items-center">
        <img
          src="images/logo.png"
          alt="Logo"
          className="h-[36px] w-auto sm:h-[40px]"
        />

        <div className="absolute right-4 top-[93%] -translate-y-1/2">
          {/* 10 minutes (600 sec) per step */}
          <TimerCircle
            duration={duration}
            size={90}
            className="sm:size-[130px]"
          />
        </div>
      </div>

      <div className="bg-white shadow-md">
        <Stepper currentStep={currentStep} />
      </div>
    </header>
  );
};

export default Header;
