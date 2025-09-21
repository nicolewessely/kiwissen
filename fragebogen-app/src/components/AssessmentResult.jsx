import React, { useRef } from "react";
import { questionnaire } from "./questions";
import Chart from "chart.js/auto";

// Empfehlungen pro Dimension und Score-Bereich
const recommendations = [
  [
    "Keine klare Richtung. → Empfehlung: Entwickeln Sie eine grundlegende KI-Strategie. Starten Sie mit einem Workshop auf Management-Ebene, um Potenziale und Risiken zu klären.",
    "Erste Ideen da, aber noch nicht konsistent. → Empfehlung: Dokumentieren Sie die Strategie, binden Sie Führungskräfte aktiv ein und sichern Sie ein initiales Budget.",
    "Strategie und Budget vorhanden, aber nicht umfassend. → Empfehlung: Machen Sie KI zum festen Bestandteil der Unternehmensstrategie und richten Sie Roadmaps aus.",
    "Klare strategische Verankerung. → Empfehlung: Fokus auf Umsetzung, Skalierung und die Rolle als Vorreiter in Ihrer Branche."
  ],
  [
    "Datenlage unzureichend. → Empfehlung: Starten Sie mit Dateninventur und Standardisierung. Aufbau einer zentralen Datenplattform priorisieren.",
    "Erste Strukturen, aber noch nicht nutzerfreundlich. → Empfehlung: Investieren Sie in Data Pipelines und einheitliche Schnittstellen.",
    "Basis solide, aber nicht skaliert. → Empfehlung: Infrastruktur modernisieren (Cloud, MLOps) und Datenqualität laufend messen.",
    "Sehr gute Datenbasis. → Empfehlung: Fokus auf Advanced Analytics, KI-gestützte Automatisierung und Monetarisierung von Daten."
  ],
  [
    "Fehlendes Know-how. → Empfehlung: Sofort Weiterbildungsprogramm starten und externe Expertise hinzuziehen.",
    "Erste Inseln von Wissen. → Empfehlung: Breitere Qualifizierung anbieten und interne Champions sichtbar machen.",
    "Gutes Fundament, aber noch nicht flächendeckend. → Empfehlung: Systematisch Trainings für alle relevanten Rollen ausrollen.",
    "Starkes Know-how und positive Haltung. → Empfehlung: Aufbau eines Center of Excellence und aktive Förderung von Innovationskultur."
  ],
  [
    "Noch keine klaren Anwendungsfälle. → Empfehlung: Identifizieren Sie Quick Wins mit klar messbarem Nutzen.",
    "Erste Piloten ohne klare Systematik. → Empfehlung: Standardisierte Projektmethodik einführen und Use Cases priorisieren.",
    "Mehrere Projekte, teilweise integriert. → Empfehlung: Skalierung forcieren und Integration in Kernprozesse beschleunigen.",
    "KI ist in Kernprozessen angekommen. → Empfehlung: Nutzung weiter professionalisieren, Benchmarks setzen und branchenweit teilen."
  ],
  [
    "Keine Regeln. → Empfehlung: Sofort Richtlinien zu Datenschutz, Transparenz und Verantwortlichkeiten aufstellen.",
    "Erste Diskussionen. → Empfehlung: Verantwortliche benennen und erste Prozesse dokumentieren.",
    "Teilweise etabliert. → Empfehlung: Vollständige Governance-Struktur entwickeln und regelmäßig evaluieren.",
    "Sehr solide Governance. → Empfehlung: Fokus auf externe Zertifizierungen, Audits und aktive Kommunikation an Stakeholder."
  ],
  [
    "Kein Plan für Change. → Empfehlung: Change-Management-Konzept erarbeiten, Mitarbeitende früh einbeziehen.",
    "Erste Initiativen, aber unstrukturiert. → Empfehlung: Kommunikationsplan und Feedbackschleifen etablieren.",
    "Teilweise gute Umsetzung. → Empfehlung: Change-Management systematisieren, Erfolge sichtbarer machen.",
    "Sehr gute Umsetzung. → Empfehlung: Kultur weiter festigen, Lessons Learned dokumentieren und mit anderen Organisationen teilen."
  ]
];

function getScoreText(score) {
  if (score < 1) return "rot";
  if (score < 2) return "gelb";
  if (score <= 2.5) return "gelb";
  return "grün";
}

function getRecommendation(dimIdx, score) {
  let rec = "";
  if (score < 1) rec = recommendations[dimIdx][0];
  else if (score < 2) rec = recommendations[dimIdx][1];
  else if (score <= 2.5) rec = recommendations[dimIdx][2];
  else rec = recommendations[dimIdx][3];
  // Pfeil durch Zeilenumbruch ersetzen und "Empfehlung:" hervorheben
  rec = rec.replace(/\s*→\s*/g, "\n");
  rec = rec.replace(/(Empfehlung:)/, '<span style="font-weight:bold;text-decoration:underline;">$1</span>');
  return rec;
}


export default function AssessmentResult({ answers, onRestart }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Scores pro Dimension berechnen
  const dimScores = questionnaire.map((dim, dIdx) => {
    const values = dim.questions.map((q, qIdx) => {
      const v = answers[`${dIdx}-${qIdx}`];
      return v !== undefined ? Number(v) : 0;
    });
    return values.reduce((a, b) => a + b, 0) / values.length;
  });
  const overall = dimScores.reduce((a, b) => a + b, 0) / dimScores.length;

  // Chart zeichnen (robust gegen Mehrfach-Renderings)
  React.useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    try {
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: questionnaire.map((d) => d.dimension),
          datasets: [
            {
              label: "Score",
              data: dimScores,
              backgroundColor: "rgba(24,0,54,0.15)",
              borderColor: "#180036",
              borderWidth: 2,
              pointBackgroundColor: "#180036",
            },
          ],
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 3,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    } catch (e) {
      // Fehler beim Zeichnen des Charts ignorieren, damit die Seite nicht abstürzt
      // Optional: console.error("Chart.js Fehler:", e);
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [answers]);

  // PDF-Export (mit html2canvas + jsPDF)
  const handleDownloadPDF = async () => {
  // html2canvas und jsPDF sind bereits oben importiert
    // Nur den Bereich bis zur Tabelle exportieren, inkl. Chart-Canvas als Bild
    const resultDiv = document.getElementById("result-section");
    const table = resultDiv.querySelector("table");
    const chartDiv = resultDiv.querySelector("div");
    const chartCanvas = chartDiv.querySelector("canvas");
    // Chart als Bild extrahieren (mit Legende)
    const chartImg = document.createElement("img");
    chartImg.src = chartCanvas.toDataURL("image/png");
    chartImg.style.display = "block";
    chartImg.style.margin = "0 auto 32px auto";
    chartImg.style.maxWidth = "100%";
    chartImg.style.height = "auto";
    // Temporäres Wrapper-Div für Export
    const exportDiv = document.createElement("div");
    exportDiv.style.background = "#fff";
    exportDiv.style.padding = "24px";
    exportDiv.style.borderRadius = "8px";
    exportDiv.style.display = "flex";
    exportDiv.style.flexDirection = "column";
    exportDiv.style.alignItems = "center";
    exportDiv.style.width = "700px";
    // Datum und Uhrzeit oben rechts
    const now = new Date();
    const dateString = now.toLocaleDateString('de-DE');
    const timeString = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const dateDiv = document.createElement('div');
    dateDiv.style.width = '100%';
    dateDiv.style.textAlign = 'right';
    dateDiv.style.fontSize = '14px';
    dateDiv.style.color = '#111';
    dateDiv.style.marginBottom = '8px';
    dateDiv.textContent = `Erstellt am ${dateString} um ${timeString}`;
    exportDiv.appendChild(dateDiv);
    // Kopiere Header, Score, Diagramm (als Bild), Tabelle
    exportDiv.appendChild(resultDiv.querySelector("h2").cloneNode(true));
    exportDiv.appendChild(resultDiv.querySelector("p").cloneNode(true));
    exportDiv.appendChild(chartImg);
    // Tabelle als HTML übernehmen, damit dangerouslySetInnerHTML gerenderte Inhalte (z.B. <span> für Empfehlung) erhalten bleiben
    const tableClone = document.createElement('table');
    tableClone.innerHTML = table.innerHTML;
    tableClone.setAttribute('style', (table.getAttribute('style') || '') + ';color:#111;');
    // Kopiere Styles der th/td und setze Textfarbe auf schwarz
    Array.from(table.querySelectorAll('th')).forEach((th, i) => {
      if (tableClone.querySelectorAll('th')[i]) {
        let thStyle = th.getAttribute('style') || '';
        thStyle += ';color:#111;';
        tableClone.querySelectorAll('th')[i].setAttribute('style', thStyle);
      }
    });
    Array.from(table.querySelectorAll('td')).forEach((td, i) => {
      if (tableClone.querySelectorAll('td')[i]) {
        let tdStyle = td.getAttribute('style') || '';
        tdStyle += ';color:#111;';
        tableClone.querySelectorAll('td')[i].setAttribute('style', tdStyle);
        tableClone.querySelectorAll('td')[i].innerHTML = td.innerHTML;
      }
    });
    exportDiv.appendChild(tableClone);
    document.body.appendChild(exportDiv);
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).jsPDF;
    const canvas = await html2canvas(exportDiv, { scale: 2, backgroundColor: '#fff' });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    // Skaliere das Bild seitenfüllend und zentriert
    let imgWidth = pageWidth;
    let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight;
      imgWidth = (imgProps.width * imgHeight) / imgProps.height;
    }
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("KI-Readiness-Auswertung.pdf");
    document.body.removeChild(exportDiv);
  };

  return (
    <div id="result-section" style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#180036', textAlign: 'center', marginBottom: 12 }}>Auswertung</h2>
      <p style={{ textAlign: 'center', marginBottom: 24 }}><b>Gesamtscore:</b> {overall.toFixed(2)} / 3</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <canvas ref={canvasRef} id="radarChart" width="700" height="700" style={{ maxWidth: 700, maxHeight: 700 }}></canvas>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '28%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '54%' }} />
        </colgroup>
        <thead>
          <tr style={{ background: '#f3f0fa' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#180036', fontSize: 16 }}>Bereich</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#180036', fontSize: 16 }}>Score</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#180036', fontSize: 16 }}><span style={{ fontWeight: 'bold' }}>Empfehlung</span></th>
          </tr>
        </thead>
        <tbody>
          {questionnaire.map((dim, dIdx) => (
            <tr key={dim.dimension} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 12px', verticalAlign: 'top', fontWeight: 600, textAlign: 'left' }}>{dim.dimension}</td>
              <td style={{ padding: '8px 12px', verticalAlign: 'top', textAlign: 'left', whiteSpace: 'nowrap', fontSize: 16 }}>
                <span style={{ display: 'inline-block', minWidth: 48 }}>{dimScores[dIdx].toFixed(2)} / 3</span>
              </td>
              <td style={{ padding: '8px 12px', verticalAlign: 'top', textAlign: 'left', whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{__html: getRecommendation(dIdx, dimScores[dIdx])}}></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleDownloadPDF} style={{ marginTop: 24, marginRight: 12 }}>
          Auswertung als PDF herunterladen
        </button>
        <button onClick={onRestart} style={{ marginTop: 24 }}>
          Neu starten
        </button>
      </div>
    </div>
  );
}
