import { useState } from "react";
import type { CVData, Job, Certification, Position } from "../types";

interface EditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onSave: () => void;
}

export function Editor({ data, onChange, onSave }: EditorProps) {
  const [showDataMenu, setShowDataMenu] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const copyToClipboard = () => {
    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json);
    setShowDataMenu(false);
    showToast("Copied to clipboard");
  };

  const downloadJson = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cv-${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowDataMenu(false);
    showToast("Downloaded");
  };

  const handleImport = () => {
    try {
      const imported = JSON.parse(importText) as CVData;
      onChange(imported);
      setShowImport(false);
      setShowDataMenu(false);
      setImportText("");
      showToast("Imported successfully");
    } catch {
      showToast("Invalid JSON");
    }
  };

  const handleSave = () => {
    onSave();
    showToast("Saved");
  };

  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    onChange({ ...data, [field]: value });
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    });
  };

  const updateJobAchievement = (jobId: string, index: number, value: string) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              achievements: job.achievements.map((a, i) =>
                i === index ? value : a
              ),
            }
          : job
      ),
    });
  };

  const addJobAchievement = (jobId: string) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? { ...job, achievements: [...job.achievements, ""] }
          : job
      ),
    });
  };

  const removeJobAchievement = (jobId: string, index: number) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              achievements: job.achievements.filter((_, i) => i !== index),
            }
          : job
      ),
    });
  };

  const addJob = () => {
    const newJob: Job = {
      id: Date.now().toString(),
      company: "",
      positions: [{ id: Date.now().toString() + "a", role: "", dateRange: "" }],
      achievements: [""],
    };
    onChange({ ...data, jobs: [...data.jobs, newJob] });
  };

  const removeJob = (jobId: string) => {
    onChange({ ...data, jobs: data.jobs.filter((j) => j.id !== jobId) });
  };

  const updatePosition = (jobId: string, posId: string, updates: Partial<Position>) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              positions: job.positions.map((pos) =>
                pos.id === posId ? { ...pos, ...updates } : pos
              ),
            }
          : job
      ),
    });
  };

  const addPosition = (jobId: string) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              positions: [...job.positions, { id: Date.now().toString(), role: "", dateRange: "" }],
            }
          : job
      ),
    });
  };

  const removePosition = (jobId: string, posId: string) => {
    onChange({
      ...data,
      jobs: data.jobs.map((job) =>
        job.id === jobId
          ? { ...job, positions: job.positions.filter((p) => p.id !== posId) }
          : job
      ),
    });
  };

  const updateSkill = (index: number, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((s, i) => (i === index ? value : s)),
    });
  };

  const addSkill = () => {
    onChange({ ...data, skills: [...data.skills, ""] });
  };

  const removeSkill = (index: number) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const updateCertification = (certId: string, updates: Partial<Certification>) => {
    onChange({
      ...data,
      certifications: data.certifications.map((cert) =>
        cert.id === certId ? { ...cert, ...updates } : cert
      ),
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      issuer: "",
      name: "",
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const removeCertification = (certId: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== certId),
    });
  };

  return (
    <div className="editor">
      {toast && <div className="toast">{toast}</div>}
      <div className="editor-header">
        <h2>CV Builder</h2>
        <div className="header-actions">
          <button className="action-btn primary" onClick={() => window.print()}>
            Print PDF
          </button>
        </div>
      </div>

      <div className="toolbar">
        <button className="toolbar-btn" onClick={handleSave}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save
        </button>
        <div className="toolbar-divider" />
        <div className="toolbar-dropdown">
          <button className="toolbar-btn" onClick={() => setShowDataMenu(!showDataMenu)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Data
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {showDataMenu && (
            <div className="dropdown-menu">
              <button onClick={() => { setShowImport(true); }}>
                Import JSON
              </button>
              <button onClick={copyToClipboard}>
                Copy to Clipboard
              </button>
              <button onClick={downloadJson}>
                Download JSON
              </button>
            </div>
          )}
        </div>
      </div>

      {showImport && (
        <div className="import-panel">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste JSON here..."
            rows={6}
          />
          <div className="import-actions">
            <button className="add-btn" onClick={handleImport}>
              Apply
            </button>
            <button className="remove-btn" onClick={() => { setShowImport(false); setImportText(""); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="editor-content">
        {/* Basic Info */}
        <section className="editor-section">
          <h3>Basic Info</h3>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="field">
            <label>Website</label>
            <input
              type="text"
              value={data.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="yoursite.com"
            />
          </div>
        </section>

        {/* Work Experience */}
        <section className="editor-section">
          <div className="section-header">
            <h3>Work Experience</h3>
            <button className="add-btn" onClick={addJob}>+ Add Job</button>
          </div>

          {data.jobs.map((job, jobIndex) => (
            <div key={job.id} className="job-editor">
              <div className="job-editor-header">
                <span className="job-number">#{jobIndex + 1}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeJob(job.id)}
                >
                  Remove
                </button>
              </div>

              <div className="field">
                <label>Company</label>
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) => updateJob(job.id, { company: e.target.value })}
                />
              </div>

              <div className="field">
                <div className="section-header">
                  <label>Positions</label>
                  <button className="add-btn small" onClick={() => addPosition(job.id)}>
                    + Add Position
                  </button>
                </div>
                {job.positions.map((pos) => (
                  <div key={pos.id} className="position-row">
                    <input
                      type="text"
                      value={pos.role}
                      onChange={(e) => updatePosition(job.id, pos.id, { role: e.target.value })}
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={pos.dateRange}
                      onChange={(e) => updatePosition(job.id, pos.id, { dateRange: e.target.value })}
                      placeholder="Jan 2023 - Present"
                      className="date-input"
                    />
                    {job.positions.length > 1 && (
                      <button
                        className="remove-btn small"
                        onClick={() => removePosition(job.id, pos.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="field">
                <label>Achievements (use **text** for highlights)</label>
                {job.achievements.map((achievement, i) => (
                  <div key={i} className="achievement-row">
                    <textarea
                      value={achievement}
                      onChange={(e) =>
                        updateJobAchievement(job.id, i, e.target.value)
                      }
                      rows={2}
                    />
                    <button
                      className="remove-btn small"
                      onClick={() => removeJobAchievement(job.id, i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  className="add-btn small"
                  onClick={() => addJobAchievement(job.id)}
                >
                  + Add Achievement
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="editor-section">
          <div className="section-header">
            <h3>Skills</h3>
            <button className="add-btn" onClick={addSkill}>+ Add Skill</button>
          </div>

          <div className="skills-editor">
            {data.skills.map((skill, i) => (
              <div key={i} className="skill-row">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(i, e.target.value)}
                />
                <button
                  className="remove-btn small"
                  onClick={() => removeSkill(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="editor-section">
          <h3>Education</h3>
          <div className="field">
            <label>Degree</label>
            <input
              type="text"
              value={data.education}
              onChange={(e) => updateField("education", e.target.value)}
            />
          </div>
        </section>

        {/* Certifications */}
        <section className="editor-section">
          <div className="section-header">
            <h3>Certifications</h3>
            <button className="add-btn" onClick={addCertification}>
              + Add Certification
            </button>
          </div>

          {data.certifications.map((cert) => (
            <div key={cert.id} className="cert-editor">
              <div className="cert-fields">
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertification(cert.id, { issuer: e.target.value })
                  }
                  placeholder="Issuer (e.g., Google)"
                />
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    updateCertification(cert.id, { name: e.target.value })
                  }
                  placeholder="Certificate Name"
                />
              </div>
              <button
                className="remove-btn small"
                onClick={() => removeCertification(cert.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
