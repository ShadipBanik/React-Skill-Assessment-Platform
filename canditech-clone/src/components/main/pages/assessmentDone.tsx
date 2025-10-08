import PageHeader from "../../shared/pageHeader";


export default function AssessmentDonePage() {
  return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            {/* Header */}

            <PageHeader/>
            {/* Main Content */}
            <main className="flex flex-col items-center px-4">
                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    {/* Icon */}
                    <div className="text-[#6c5ce7] mb-6">
                        <i className="fal fa-hand-peace text-[120px]" aria-hidden="true"></i>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <p className="text-xl font-medium text-gray-600 mb-2">
                        Thank you for taking the time to complete this survey.
                        </p>
                        <p className="text-lg font-semibold text-[#6c5ce7]">Canditech Team</p>
                    </div>
                </div>
            </main>
         </div>    
  );
}
