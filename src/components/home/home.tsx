import React from "react";
import AssessmentForm from "./assessmentForm/assessmentForm";
import Banner from "./banner/banner";

const Home: React.FC = () => {
  return (
    <div>
      {/* Banner section */}
        <Banner/>
      {/* <!-- Instructions Section --> */}
      <section id="instructions" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-xl font-semibold mb-4">Assessment Instructions</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Assessments can only be performed in Chrome, Safari, and Edge
            browsers.
          </li>
          <li>
            You can’t pause or retake the test, so we encourage you to proceed
            in a quiet environment.
          </li>
          <li>
            When the time is up, your answers will be saved automatically.
          </li>
          <li>
            We sent you the test link by email. Use this link to get back if the
            tab has been closed.
          </li>
          <li>Don’t open the test in more than one tab at the same time.</li>
          <li>
            This assessment contains Excel questions accessed via Google Sheets. &nbsp; 
            <a href="#" className="text-blue-600 underline">
              Click here 
            </a>&nbsp;
            to check compatibility.
          </li>
          <li>
            This assessment contains a video question. Ensure your camera and
            microphone work before starting.
          </li>
          <li>
            If you face technical issues, refresh the browser. Answers will be
            saved. For persistent issues, contact &nbsp; 
            <a
              href="mailto:support@canditech.io"
              className="text-blue-600 underline"
            >
              support@canditech.io
            </a>
            .
          </li>
        </ul>
      </section>

      {/* <!-- Proctoring Section --> */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <h3 className="text-xl font-semibold mb-4">Proctoring Instructions</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Stay on the assessment page throughout the test. Do not navigate to
            other tabs/windows. Hiring team will be notified if you switch.
          </li>
          <li>
            By agreeing to terms, you confirm you will not copy or share
            assessment content.
          </li>
        </ul>
      </section>

      {/* <!-- Assessment Summary --> */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <h3 className="text-xl font-semibold mb-4">Assessment Summary</h3>
        <div className="overflow-x-auto">
          <div className="bg-white shadow rounded-xl p-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left hidden sm:table-cell">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left">Format</th>
                  {/* <!-- hide "Time" column on small screens --> */}
                  <th className="px-6 py-3 text-left ">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 hidden sm:table-cell">1</td>
                  <td className="px-6 py-4">
                    1 × Excel Question
                    <br />
                    1 × Open Question
                    <br />5 × Multiple Choice Question
                  </td>
                  <td className="px-6 py-4 ">40 Minutes</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 hidden sm:table-cell">2</td>
                  <td className="px-6 py-4">1 × Open Question</td>
                  <td className="px-6 py-4 ">15 Minutes</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 hidden sm:table-cell">3</td>
                  <td className="px-6 py-4">4 × Multiple Choice Question</td>
                  <td className="px-6 py-4 ">10 Minutes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 hidden sm:table-cell">4</td>
                  <td className="px-6 py-4">1 × Video</td>
                  <td className="px-6 py-4 ">10 Minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* <!-- Form Section --> */}
     <AssessmentForm />
    </div>
  );
};

export default Home;