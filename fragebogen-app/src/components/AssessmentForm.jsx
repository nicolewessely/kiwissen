import React, { useState } from "react";
import { questionnaire } from "./questions";

export default function AssessmentForm({ onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (dimensionIdx, questionIdx, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${dimensionIdx}-${questionIdx}`]: value,
    }));
  };

  const allAnswered =
    Object.keys(answers).length === questionnaire.reduce((sum, d) => sum + d.questions.length, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allAnswered) {
      onSubmit(answers);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questionnaire.map((dim, dIdx) => (
        <div
          key={dim.dimension}
          className="dimension-block"
          style={{
            background: "#f8f9fa",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
            padding: 20,
            marginBottom: 28,
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
            color: '#111',
          }}
        >
          <h2
            style={{
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 12,
              color: [
                "Strategie & Management",
                "Daten & Infrastruktur",
                "Kompetenzen & Kultur",
                "Prozesse & Use Cases",
                "Governance & Ethik",
                "Change Management & Umsetzung"
              ].includes(dim.dimension)
                ? "#180036"
                : undefined,
              textAlign: [
                "Strategie & Management",
                "Daten & Infrastruktur",
                "Kompetenzen & Kultur",
                "Prozesse & Use Cases",
                "Governance & Ethik",
                "Change Management & Umsetzung"
              ].includes(dim.dimension)
                ? "center"
                : "left"
            }}
          >
            {dim.dimension}
          </h2>
          <hr style={{ border: 'none', borderTop: '2px solid #180036', margin: '12px 0 24px 0' }} />
          {dim.questions.map((q, qIdx) => (
            <div key={q.id} className="question-block" style={{ marginBottom: 16 }}>
              <p style={{ marginBottom: 8, textAlign: 'left' }}><b>{q.text}</b></p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {q.options.map((opt, oIdx) => (
                  <label key={oIdx} style={{ display: "block", marginBottom: 4, textAlign: "left", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name={`q-${dIdx}-${qIdx}`}
                      value={oIdx}
                      checked={answers[`${dIdx}-${qIdx}`] == oIdx}
                      onChange={() => handleChange(dIdx, qIdx, oIdx)}
                      style={{ marginRight: 8 }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" disabled={!allAnswered} style={{ marginTop: 24 }}>
        Auswertung
      </button>
    </form>
  );
}
