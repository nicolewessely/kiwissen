// Fragen und Antwortoptionen für das KI-Readiness-Assessment
export const questionnaire = [
  {
    dimension: "Strategie & Management",
    questions: [
      {
        id: "F1",
        text: "Gibt es eine klare Strategie für den Einsatz von KI im Unternehmen?",
        options: [
          "Keine Strategie oder Diskussion",
          "Erste Überlegungen, aber nicht dokumentiert",
          "Strategie grob formuliert und teilweise kommuniziert",
          "Klare, dokumentierte KI-Strategie mit Management-Commitment"
        ]
      },
      {
        id: "F2",
        text: "Wie stark unterstützt das Management KI-Initiativen?",
        options: [
          "Kein Interesse oder Ablehnung",
          "Einzelne Führungskräfte interessiert",
          "Mehrheitlich positiv, aber ohne feste Priorität",
          "Klare Priorisierung und Ressourcenfreigabe durch Top-Management"
        ]
      },
      {
        id: "F3",
        text: "Gibt es Budget für KI-Projekte?",
        options: [
          "Kein Budget vorgesehen",
          "Einmalige Pilotbudgets",
          "Regelmäßiges, aber kleines Budget",
          "Fester Budgetposten mit langfristiger Planung"
        ]
      }
    ]
  },
  {
    dimension: "Daten & Infrastruktur",
    questions: [
      {
        id: "F4",
        text: "Wie ist die Datenqualität im Unternehmen?",
        options: [
          "Daten verstreut, unstrukturiert, oft unvollständig",
          "Teilweise strukturierte Daten, aber große Lücken",
          "Daten meist nutzbar, Qualität schwankt",
          "Hohe Datenqualität mit klaren Standards"
        ]
      },
      {
        id: "F5",
        text: "Wie gut sind Daten zugänglich?",
        options: [
          "Daten liegen in Silos, kaum verfügbar",
          "Zugriff nur mit großem Aufwand",
          "Teilweise zentralisiert, teils noch Silos",
          "Zentrale, leicht zugängliche Datenplattform"
        ]
      },
      {
        id: "F6",
        text: "Gibt es die notwendige IT-Infrastruktur für KI (z. B. Cloud, Rechenleistung)?",
        options: [
          "Keine Infrastruktur für KI",
          "Erste Pilot-Infrastruktur",
          "Grundlegende, einsatzfähige Infrastruktur",
          "Skalierbare, moderne Infrastruktur speziell für KI"
        ]
      }
    ]
  },
  {
    dimension: "Kompetenzen & Kultur",
    questions: [
      {
        id: "F7",
        text: "Wie verbreitet sind KI-Kenntnisse im Unternehmen?",
        options: [
          "Keine Mitarbeitenden mit KI-Wissen",
          "Einzelne Personen mit Grundkenntnissen",
          "Mehrere Mitarbeitende mit praktischer Erfahrung",
          "Breites Know-how in mehreren Teams vorhanden"
        ]
      },
      {
        id: "F8",
        text: "Gibt es Weiterbildungsangebote zu KI?",
        options: [
          "Keine Angebote",
          "Einzelne Mitarbeitende suchen sich selbst Angebote",
          "Erste interne/externe Trainings verfügbar",
          "Systematisches Weiterbildungsprogramm"
        ]
      },
      {
        id: "F9",
        text: "Wie ist die Haltung der Mitarbeitenden gegenüber KI?",
        options: [
          "Skepsis oder Angst dominiert",
          "Interesse vorhanden, aber auch Vorbehalte",
          "Mehrheitlich offen, erste positive Erfahrungen",
          "Hohe Akzeptanz, KI wird als Chance gesehen"
        ]
      }
    ]
  },
  {
    dimension: "Prozesse & Use Cases",
    questions: [
      {
        id: "F10",
        text: "Gibt es identifizierte KI-Anwendungsfälle im Unternehmen?",
        options: [
          "Keine",
          "Erste Ideen gesammelt",
          "Einige Pilotprojekte umgesetzt",
          "Mehrere produktive Anwendungsfälle"
        ]
      },
      {
        id: "F11",
        text: "Wie systematisch werden KI-Projekte umgesetzt?",
        options: [
          "Ad-hoc, ohne Struktur",
          "Erste Piloten mit wechselnden Methoden",
          "Teilweise strukturierte Projektvorgehen",
          "Klare Methodik, standardisierter Projektprozess"
        ]
      },
      {
        id: "F12",
        text: "Ist KI in Kernprozesse integriert?",
        options: [
          "Nein",
          "Erste Tests in Nebenprozessen",
          "Teilweise Integration in Kernprozesse",
          "Fester Bestandteil mehrerer Kernprozesse"
        ]
      }
    ]
  },
  {
    dimension: "Governance & Ethik",
    questions: [
      {
        id: "F13",
        text: "Gibt es Richtlinien für den Umgang mit KI (z. B. Datenschutz, Fairness, Transparenz)?",
        options: [
          "Nein",
          "Erste Diskussion, aber keine Dokumentation",
          "Teilweise Richtlinien vorhanden",
          "Umfassende Richtlinien etabliert"
        ]
      },
      {
        id: "F14",
        text: "Gibt es Verantwortlichkeiten für KI-Governance?",
        options: [
          "Niemand zuständig",
          "Informelle Zuständigkeit",
          "Einzelne Personen offiziell benannt",
          "Klare Rollen, Verantwortlichkeiten und Prozesse definiert"
        ]
      },
      {
        id: "F15",
        text: "Werden ethische Fragen in KI-Projekten berücksichtigt?",
        options: [
          "Nein",
          "Nur ad-hoc",
          "Teilweise in Projekten integriert",
          "Standardisierter Bestandteil jedes Projekts"
        ]
      }
    ]
  },
  {
    dimension: "Change Management & Umsetzung",
    questions: [
      {
        id: "F16",
        text: "Gibt es einen klaren Plan für die Einführung von KI (Change Management)?",
        options: [
          "Nein",
          "Erste Überlegungen",
          "Teilweise Pläne oder Initiativen",
          "Ausgearbeiteter Change-Plan mit Kommunikation"
        ]
      },
      {
        id: "F17",
        text: "Wie werden Mitarbeitende in KI-Projekte eingebunden?",
        options: [
          "Gar nicht",
          "Nur in Ausnahmefällen",
          "Teilweise Einbindung bei Projekten",
          "Regelmäßige, strukturierte Einbindung"
        ]
      },
      {
        id: "F18",
        text: "Werden Erfolge aus KI-Projekten im Unternehmen kommuniziert?",
        options: [
          "Nein",
          "Einzelne informelle Kommunikation",
          "Regelmäßig, aber unstrukturiert",
          "Systematisch und transparent im ganzen Unternehmen"
        ]
      }
    ]
  }
];
