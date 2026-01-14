import type { CVData } from "../types";

interface CVPreviewProps {
  data: CVData;
}

// Parse **text** to highlighted spans
function parseHighlights(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="highlight">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export function CVPreview({ data }: CVPreviewProps) {
  return (
    <div className="page">
      <header>
        <h1 className="name">{data.name}</h1>
        <address className="contact">
          <span>
            <span className="contact-label">Email:</span>{" "}
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </span>
          {data.phone && (
            <span>
              <span className="contact-label">Phone:</span>{" "}
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </span>
          )}
          <span>
            <span className="contact-label">Website:</span>{" "}
            <a href={`https://${data.website}`}>{data.website}</a>
          </span>
        </address>
      </header>

      <main>
        <section>
          <h2 className="section-title">Work Experience</h2>

          {data.jobs.map((job) => (
            <article key={job.id} className="job">
              {job.positions.length === 1 ? (
                <>
                  <div className="job-header">
                    <span className="company">{job.company}</span>
                    {job.positions[0].dateRange && (
                      <span className="date">{job.positions[0].dateRange}</span>
                    )}
                  </div>
                  <div className="role">{job.positions[0].role}</div>
                </>
              ) : (
                <>
                  <div className="company">{job.company}</div>
                  <div className="positions">
                    {job.positions.map((pos) => (
                      <div key={pos.id} className="position">
                        <span className="role">{pos.role}</span>
                        {pos.dateRange && <span className="date">{pos.dateRange}</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <ul className="achievements">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{parseHighlights(achievement)}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2 className="section-title">Skills</h2>
          <p className="skills-text">{data.skills.join(", ")}</p>
        </section>

        <section>
          <h2 className="section-title">Education</h2>
          <p className="education-text">{data.education}</p>
        </section>

        {data.certifications.length > 0 && (
          <section>
            <h2 className="section-title">Certifications</h2>
            <ul className="cert-list">
              {data.certifications.map((cert) => (
                <li key={cert.id}>
                  {cert.name} — {cert.issuer}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
