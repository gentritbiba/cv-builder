export interface Position {
  id: string;
  role: string;
  dateRange: string;
}

export interface Job {
  id: string;
  company: string;
  positions: Position[];
  achievements: string[];
}

export interface Certification {
  id: string;
  issuer: string;
  name: string;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  website: string;
  jobs: Job[];
  skills: string[];
  education: string;
  certifications: Certification[];
}

export const defaultCVData: CVData = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 555 123 4567",
  website: "example.com",
  jobs: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      positions: [
        { id: "1a", role: "Senior Software Engineer", dateRange: "Mar 2023 - Present" },
        { id: "1b", role: "Software Engineer", dateRange: "Jun 2021 - Mar 2023" }
      ],
      achievements: [
        "Led development of a microservices architecture that improved system scalability by **300%**",
        "Mentored a team of **5 junior developers**, conducting code reviews and pair programming sessions",
        "Reduced API response times by **60%** through database optimization and caching strategies",
        "Implemented CI/CD pipelines that decreased deployment time from hours to **15 minutes**"
      ]
    },
    {
      id: "2",
      company: "Digital Innovations Co.",
      positions: [
        { id: "2a", role: "Full-Stack Developer", dateRange: "Jan 2019 - May 2021" }
      ],
      achievements: [
        "Built and maintained **12+ client-facing** web applications using React and Node.js",
        "Developed RESTful APIs serving over **100,000 daily requests**",
        "Collaborated with UX team to improve user engagement by **45%**",
        "Integrated third-party payment systems processing **$2M+ monthly** transactions"
      ]
    },
    {
      id: "3",
      company: "StartupXYZ",
      positions: [
        { id: "3a", role: "Junior Developer", dateRange: "Jul 2017 - Dec 2018" }
      ],
      achievements: [
        "Developed responsive front-end interfaces using HTML, CSS, and JavaScript",
        "Participated in agile development cycles with **2-week sprints**",
        "Contributed to open-source projects and internal component libraries",
        "Automated testing workflows reducing QA time by **30%**"
      ]
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL"],
  education: "Bachelor of Science in Computer Science",
  certifications: [
    { id: "1", issuer: "AWS", name: "Solutions Architect Associate" },
    { id: "2", issuer: "Google", name: "Professional Cloud Developer" }
  ]
};
