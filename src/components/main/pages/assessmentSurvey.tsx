import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../shared/pageHeader";

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function AssessmentSurvey() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const questions: Question[] = [
    {
      id: 1,
      question:
        "How important is it for you to have the flexibility to choose when to take a pre-employment assessment?",
      options: ["Very important", "Somewhat important", "Not important"],
    },
    {
      id: 2,
      question:
        "What kind of tasks or questions do you find most engaging in home pre-employment assessments?",
      options: [
        "Real-world scenarios or job simulations",
        "Personality or psychometric questions",
      ],
    },
    {
      id: 3,
      question:
        "How do you feel about assessments that include real-world scenarios?",
      options: [
        "I prefer an assessment with real-world scenarios",
        "I prefer non-real-world scenarios",
      ],
    },
    {
      id: 4,
      question:
        "In your opinion, what is the most appropriate length for a pre-employment assessment?",
      options: [
        "Less than 30 minutes",
        "30 – 60 minutes",
        "1 – 2 hours",
        "More than 2 hours",
      ],
    },
    {
      id: 5,
      question:
        "Which do you think better represents your suitability for a job?",
      options: [
        "Resume",
        "A skills-based pre-employment assessment",
        "A combination of the above",
      ],
    },
    {
      id: 6,
      question:
        "Would you appreciate the option to answer a short video question as part of a pre-employment assessment?",
      options: ["Yes", "No"],
    },
    {
      id: 7,
      question: "Which assessment format do you prefer?",
      options: [
        "A timed assessment (e.g., This assessment will take up to 40 minutes)",
        "A non-timed assessment (e.g., You have up to 7 days to complete this assessment)",
      ],
    },
  ];

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted answers:", answers);
    navigate("/assessment-done");
  };

  // ✅ Button visible after any one question is answered
  const anyAnswered = Object.keys(answers).length > 0;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="flex flex-col items-center px-4">
        <div className="max-w-8xl mt-[4rem] mx-auto px-4 py-10">
          {/* Heading */}
          <div className="mb-8 ">
            <h1 className="text-xl md:text-2xl  font-medium border-b-[0.5px] border-gray-200 text-gray-500">
              Assessment Survey
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((q) => (
              <div key={q.id}>
                <h2 className="text-sm md:text-base font-medium text-gray-700 mb-3">
                  {q.question}
                </h2>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleChange(q.id, opt)}
                        className="h-5 w-5 accent-[#6c5ce7] shrink-0 focus:ring-[#6c5ce7] border-gray-300"
                      />
                      <span className="text-gray-700 text-xs md:text-sm">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="pt-10 flex justify-center">
              <button
                type="submit"
                disabled={!anyAnswered}
                className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${
                  anyAnswered
                    ? "bg-[#6c5ce7] hover:bg-[#6c5ce7]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {submitted ? "Submitted" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
