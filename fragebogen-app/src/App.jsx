
import React, { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AssessmentForm from "./components/AssessmentForm";
import AssessmentResult from "./components/AssessmentResult";
import "./App.css";

function App() {
  const [answers, setAnswers] = useState(null);

  return (
    <div className="app-container" style={{ maxWidth: 700, margin: "0 auto", padding: 24, color: '#111', background: '#180036', minHeight: '100vh' }}>
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>KI Readiness Check</h1>
      </header>
      {!answers ? (
        <AssessmentForm onSubmit={setAnswers} />
      ) : (
        <AssessmentResult answers={answers} onRestart={() => setAnswers(null)} />
      )}
      <SpeedInsights />
    </div>
  );
}

export default App;
