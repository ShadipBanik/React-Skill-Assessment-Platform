export default function QuantitativeTab() {
  return (
    <div className="w-full max-w-8xl mx-auto px-3 sm:px-6 md:px-10 py-4 sm:py-6 lg:py-8">
      <h2 className=" xs:text-lg sm:text-lg md:text-xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
        For each of the following questions, choose the most appropriate answer:
      </h2>

      {/* Question 1 */}
      <div className="mb-10 sm:mb-12">
        <h3 className="flex flex-col sm:flex-row items-start sm:items-center text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-3">
          <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[#6c5ce7] text-white text-xs sm:text-sm font-bold mr-2 mb-2 sm:mb-0 shrink-0">
            1
          </span>
          <span>
            Your CVR (Conversion Rate, when conversion refers to users who
            download the app from the app store) has increased by 5 times. Which
            of the following statements about your CPI (Cost per Install) is
            correct?
          </span>
        </h3>

        <div className="space-y-3 sm:space-y-2 pb-10 sm:pb-14 pl-0 sm:pl-6 md:pl-10">
          {[
            "It should have decreased by 5 times.",
            "It should have increased by 5 times.",
            "It should have stayed the same, because there is no correlation between CPI and CVR.",
            "There is not enough information to determine what should have happened to the CPI.",
          ].map((option, i) => (
            <label
              key={i}
              className="flex items-start sm:items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="q1"
                value={option}
                className="mt-1 sm:mt-0 w-4 h-4 accent-[#6c5ce7] focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base leading-snug">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="mb-10 sm:mb-12">
        <h3 className="flex flex-col sm:flex-row items-start sm:items-center text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-3">
          <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[#6c5ce7] text-white text-xs sm:text-sm font-bold mr-2 mb-2 sm:mb-0 shrink-0">
            2
          </span>
          <span>
            In July, you got 500 installs with a total cost of $2,000. The ARPU
            (Average Revenue Per User) in July was $3. What is your ROAS (Return
            on Ad Spend) in July?
          </span>
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 pl-0 sm:pl-6 md:pl-10 italic">
          Note that ROAS = Revenue / Cost
        </p>

        <div className="space-y-3 sm:space-y-2 pb-10 sm:pb-14 pl-0 sm:pl-6 md:pl-10">
          {["25%", "175%", "75%", "125%"].map((option, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="q2"
                value={option}
                className="w-4 h-4 accent-[#6c5ce7] focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 3 */}
      <div className="mb-10 sm:mb-12">
        <h3 className="flex flex-col sm:flex-row items-start sm:items-center text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-3">
          <span className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[#6c5ce7] text-white text-xs sm:text-sm font-bold mr-2 mb-2 sm:mb-0 shrink-0">
            3
          </span>
          <span>
            In August, you got 1,000 installs with a deposit rate of 3%. The
            ARPU (Average Revenue per user) in August was $3. What is the ARPPU
            (Average Revenue Per Paying User) in August?
          </span>
        </h3>

        <div className="space-y-3 sm:space-y-2 pl-0 sm:pl-6 md:pl-10">
          {["$1", "$10", "$1,000", "$100"].map((option, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="q3"
                value={option}
                className="w-4 h-4 accent-[#6c5ce7] focus:ring-[#6c5ce7] shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
