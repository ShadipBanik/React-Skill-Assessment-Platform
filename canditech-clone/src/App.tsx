import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import LoadingCard from "./components/shared/Spinner";
import AssessmentPage from "./components/main/assessmentPage"; // create this file with the page code
import Terms from "./components/home/terms &  privacy/terms";
import PrivacyPolicy from "./components/home/terms &  privacy/PrivacyPolicy";
import AssessmentSuccessPage from "./components/main/pages/assessmentSuccess";
import AssessmentSurvey from "./components/main/pages/assessmentSurvey";
import AssessmentDonePage from "./components/main/pages/assessmentDone";
import AssessmentRecorder from "./components/main/tabSections/videoQusetion";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // simulate loading
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  return (
  <Router basename="/">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/assessment-success" element={<AssessmentSuccessPage />} />
      <Route path="/assessment-survey" element={<AssessmentSurvey />} />
      <Route path="/assessment-done" element={<AssessmentDonePage />} />
      <Route path="/video" element={<AssessmentRecorder />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />



    </Routes>
  </Router>
  );
};

export default App;

