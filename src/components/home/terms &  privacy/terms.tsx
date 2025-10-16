import React from "react";
import PageHeader from "../../shared/pageHeader";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}

      <PageHeader />

      {/* Main Content */}
      <main className="flex-1 px-10 py-12 max-w-5xl mx-auto text-black">
        <div className="px-6 py-8 text-[#424242] max-w-5xl mx-auto leading-relaxed">
          {/* Title */}
          <h1 className="text-2xl font-semibold mb-4">
            Canditech Terms of Use
          </h1>
          <hr className="border-gray-300 mb-6" />

          {/* Intro */}
          <p className="mb-6 text-sm">
            These Terms of Use ("<strong>Terms</strong>") constitute a binding
            agreement between you and us, Canditech Ltd. ("
            <strong>Canditech</strong>" or "<strong>we</strong>" or "
            <strong>us</strong>"), the owner and operator of this website, and
            govern your access to and use of our Platform (as defined below).
            Please read them carefully before using the Platform, as any use you
            make of the Platform indicates your full agreement to the Terms.
          </p>

          {/* Sections */}
          <ol className="space-y-6 list-decimal ml-6">
            {/* 1 */}
            <li>
              <span className="font-semibold">DEFINITIONS</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  <b>Candidate</b> means you or any other candidate who was
                  directed to the Platform by a potential Employer as part of
                  the Screening Process.
                </li>
                <li>
                  <b>Employer</b> means any individual or entity who engaged
                  with us or used the Platform to perform its Candidate
                  screening or similar processes.
                </li>
                <li>
                  <b>Platform</b> means our website (
                  <a
                    href="https://canditech.io"
                    className="text-blue-600 underline"
                  >
                    canditech.io
                  </a>
                  ) and online platform, which provides a technological solution
                  for Candidate screening.
                </li>
                <li>
                  <b>Screening Process</b> means the process of screening for a
                  potential Employer that a Candidate undergoes on the Platform,
                  starting from first accessing the Platform until the Candidate
                  completes their final assignment or test on the Platform, or
                  until we terminate the process for any reason in accordance
                  with these Terms.
                </li>
              </ol>
            </li>

            {/* 2 */}
            <li>
              <span className="font-semibold">YOUR USE OF THE PLATFORM</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  You shall only provide us with accurate and updated
                  information, and use the Platform in good faith...
                </li>
                <li>
                  You must be at least 18 years of age or older to use the
                  Platform...
                </li>
                <li>We may allow Employers to create original questions...</li>
                <li>
                  We do not and cannot represent or guarantee that the Platform
                  will help you find a job...
                </li>
                <li>
                  Subject to your compliance with these Terms, Canditech grants
                  you a personal, limited license...
                </li>
                <li>You warrant that you will participate honestly...</li>
                <li>
                  You fully understand and agree that, in order to operate the
                  Platform, we may collect information...
                </li>
                <li>
                  In some cases, and at your discretion, we may access your
                  camera...
                </li>
                <li>
                  You understand and agree that your grades, assessments,
                  reviews, and other details will be viewed by the Employer.
                </li>
              </ol>
            </li>

            {/* 3 */}
            <li>
              <span className="font-semibold">INTELLECTUAL PROPERTY</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  All intellectual property rights in the Platform, including
                  but not limited to any inventions, patents, trademarks,
                  service marks, trade dress, trade secrets, copyright, moral
                  rights, know-how, or any other proprietary rights, are owned
                  by Canditech.
                </li>
                <li>
                  You shall not attempt to, nor allow any third party to,
                  modify, reverse engineer, decompile, disassemble, or copy any
                  part of the Platform.
                </li>
                <li>
                  Nothing in these Terms shall be construed as granting any
                  license or right to use any Canditech trademarks without our
                  prior written permission.
                </li>
                <li>
                  All rights not expressly granted to you in these Terms are
                  reserved by Canditech and its licensors.
                </li>
              </ol>
            </li>

            {/* 4 */}
            <li>
              <span className="font-semibold">DISCLAIMER OF WARRANTIES</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  The Platform and its content are provided on an "as is" and
                  "as available" basis without warranties of any kind, either
                  express or implied.
                </li>
                <li>
                  Canditech disclaims all warranties, including but not limited
                  to implied warranties of merchantability, fitness for a
                  particular purpose, non-infringement, or course of
                  performance.
                </li>
                <li>
                  We do not warrant that the Platform will always be secure,
                  error-free, uninterrupted, or available at any particular time
                  or location.
                </li>
                <li>
                  You acknowledge and agree that the use of the Platform is at
                  your sole risk.
                </li>
              </ol>
            </li>

            {/* 5 */}
            <li>
              <span className="font-semibold">LIMITATION OF LIABILITY</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  To the maximum extent permitted by applicable law, in no event
                  shall Canditech, its affiliates, directors, employees, agents,
                  or licensors be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including loss of profits,
                  data, or goodwill.
                </li>
                <li>
                  Without derogating from the above, Canditech’s total aggregate
                  liability for any claims arising out of or related to these
                  Terms or the use of the Platform shall not exceed USD 100.
                </li>
                <li>
                  Some jurisdictions do not allow the exclusion of certain
                  warranties or limitations of liability; therefore, some of the
                  above limitations may not apply to you.
                </li>
              </ol>
            </li>

            {/* 6 */}
            <li>
              <span className="font-semibold">GENERAL</span>
              <ol className="list-decimal ml-6 mt-2 text-sm space-y-2">
                <li>
                  These Terms constitute the entire agreement between you and
                  Canditech regarding your use of the Platform.
                </li>
                <li>
                  We may revise these Terms at any time by posting an updated
                  version on our website. Your continued use of the Platform
                  constitutes acceptance of such changes.
                </li>
                <li>
                  If any provision of these Terms is held invalid or
                  unenforceable, such provision shall be enforced to the maximum
                  extent possible, and the remaining provisions shall remain in
                  full force and effect.
                </li>
                <li>
                  No waiver by Canditech of any breach of any term shall be
                  deemed a waiver of any prior or subsequent breach.
                </li>
                <li>
                  You may not assign or transfer your rights or obligations
                  under these Terms without our prior written consent.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className=" py-6 text-center text-sm text-gray-600">
        <p>Last updated: September 1, 2025</p>
        <p className="mt-2">&copy; 2025 – Canditech</p>
      </footer>
    </div>
  );
};

export default Terms;
