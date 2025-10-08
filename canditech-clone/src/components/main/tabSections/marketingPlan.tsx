export default function MarketingPlan() {
  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        The scenario:
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        As part of your job as Campaign Manager, you are about to start managing
        a new advertising activity for the company's new gaming app (see video):
      </p>

      {/* Video Section */}
      <div className="flex justify-center mb-8">
        <video
          className="rounded-lg shadow-md  md:w-[640px] md:h-[360px] "
          controls
        >
          <source
            src="https://canditech-assets-u.s3.amazonaws.com/production/html-assets/Self-serve/c19dbeae-011b-4208-95d6-98a288912fbc.qt"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Budget Info */}
      <p className="text-gray-700 mb-6">
        The initial budget is{" "}
        <span className="font-semibold">$30K monthly</span> and the main KPIs
        are <span className="font-semibold">ROAS</span> and{" "}
        <span className="font-semibold">low CPI</span>.
      </p>

      {/* Question Section */}
      <div>
        <h2 className="flex flex-col sm:flex-row sm:items-center font-medium gap-2 mb-4 text-sm sm:text-base">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 text-base font-normal bg-[#6c5ce7] text-white border-[#6c5ce7] shrink-0">
            2
          </div>
          <span className="mt-2 sm:mt-0">
            Write an email to your manager with your insights and suggest action
            items to improve activity results.
          </span>
        </h2>
        <div className="pb-14 md:pl-10">
          <textarea
            className="w-full h-60 p-3 sm:p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] resize-none"
            placeholder="Type your response..."
            name="q2"
            required
          />
        </div>
      </div>
    </div>
  );
}
