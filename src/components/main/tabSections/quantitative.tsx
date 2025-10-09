export default function QuantitativeTab() {
  return (
    <div className="w-full max-w-8xl mx-auto px-3 sm:px-6 md:px-10 py-4 sm:py-6 lg:py-8">
      <h2 className=" xs:text-lg sm:text-lg md:text-xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
        For each of the following questions, choose the most appropriate answer:
      </h2>

      {/* Question 1 */}
      <div>
        <h2 className="flex font-medium gap-3 mb-4 text-base md:text-lg sm:text-sm items-start">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 text-base font-normal bg-[#6c5ce7] text-white border-[#6c5ce7] shrink-0 ">
            3
          </div>
          <span className="text-gray-800 leading-snug">
            Your CVR (Conversion Rate, when conversion refers to users who
            download the app from the app store) has increased by 5 times. Which
            of the following statements about your CPI (Cost per Install) is
            correct?
          </span>
        </h2>
        <div className="space-y-2 sm:space-y-3 text-gray-500 pb-14 md:pl-10">
          {[
            "It should have decreased by 5 times.",
            "It should have increased by 5 times.",
            "It should have stayed the same, because there is no correlation between CPI and CVR.",
            "There is not enough information to determine what should have happened to the CPI.",
          ].map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-[14px] sm:text-[15px]"
            >
              <input
                type="radio"
                name="q1"
                value={option}
                className="peer accent-[#6c5ce7] w-4 h-4 focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="peer-checked:text-pink-500 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Question 2 */}
      <div>
        <h2 className="flex flex-col sm:flex-row sm:items-center font-medium gap-3 mb-4 text-base md:text-lg sm:text-sm">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 text-base font-normal bg-[#6c5ce7] text-white border-[#6c5ce7] shrink-0">
            2
          </div>
          <span className="mt-2 sm:mt-0">
            In July, you got 500 installs with a total cost of $2,000. The ARPU
            (Average Revenue Per User) in July was $3. What is your ROAS (Return
            on Ad Spend) in July?
          </span>
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 pl-0 sm:pl-6 md:pl-10 italic">
          Note that ROAS = Revenue / Cost
        </p>
        <div className="space-y-2 sm:space-y-3 text-gray-500 pb-14 md:pl-10">
          {["25%", "175%", "75%", "125%"].map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-[14px] sm:text-[15px]"
            >
              <input
                type="radio"
                name="q2"
                value={option}
                className="peer accent-[#6c5ce7] w-4 h-4 focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="peer-checked:text-pink-500 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 3 */}
      <div>
        <h2 className="flex flex-col sm:flex-row sm:items-center font-medium gap-3 mb-4 text-base md:text-lg sm:text-sm">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 text-base font-normal bg-[#6c5ce7] text-white border-[#6c5ce7] shrink-0">
            2
          </div>
          <span className="mt-2 sm:mt-0">
            In August, you got 1,000 installs with a deposit rate of 3%. The
            ARPU (Average Revenue per user) in August was $3. What is the ARPPU
            (Average Revenue Per Paying User) in August?
          </span>
        </h2>
        <div className="space-y-2 sm:space-y-3 text-gray-500 pb-14 md:pl-10">
          {["$1", "$10", "$1,000", "$100"].map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-[14px] sm:text-[15px]"
            >
              <input
                type="radio"
                name="q3"
                value={option}
                className="peer accent-[#6c5ce7] w-4 h-4 focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="peer-checked:text-pink-500 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
