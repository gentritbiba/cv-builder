import { useState, useEffect } from "react";
import type { CVData } from "./types";
import { defaultCVData } from "./types";
import { CVPreview } from "./components/CVPreview";
import { Editor } from "./components/Editor";
import "./App.css";

const STORAGE_KEY = "cv-builder-data";

function App() {
  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as CVData;
      } catch {
        return defaultCVData;
      }
    }
    return defaultCVData;
  });

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  };

  useEffect(() => {
    document.title = `CV - ${cvData.name}`;
  }, [cvData.name]);

  return (
    <div className="app">
      <Editor data={cvData} onChange={setCvData} onSave={saveToStorage} />
      <div className="preview-container">
        <CVPreview data={cvData} />
      </div>
    </div>
  );
}

export default App;
