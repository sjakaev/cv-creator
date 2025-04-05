import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, PersonalInfo, WorkExperience, Education, Certificate, Language, Skills } from '../types/cv';

// Default empty CV data
const defaultCVData: CVData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Smith',
    position: 'Senior Software Engineer',
    country: 'United States',
    city: 'San Francisco',
    phone: '+1 234 567 8901',
    email: 'john.smith@example.com',
    linkedin: 'johnsmith-dev',
    telegram: '@johnsmith'
  },
  summary: 'Experienced software engineer with over 8 years of expertise in developing scalable applications. Proficient in JavaScript, TypeScript, and React ecosystem. Passionate about building high-quality software solutions that solve real-world problems.',
  workExperience: [
    {
      id: "sample1",
      company: "Tech Solutions Inc.",
      companyDescription: "Leading software development company specializing in enterprise solutions.",
      position: "Senior Frontend Developer",
      startDate: "2020-03-01",
      endDate: "Present",
      location: "San Francisco, CA",
      achievements: [
        "Led a team of 5 developers to redesign the company's flagship product, resulting in 30% increase in user engagement.",
        "Implemented CI/CD pipelines that reduced deployment time by 40%.",
        "Optimized application performance, reducing load time by 50%."
      ]
    },
    {
      id: "sample2",
      company: "WebApp Studios",
      companyDescription: "Digital agency creating web and mobile applications.",
      position: "Frontend Developer",
      startDate: "2017-06-01",
      endDate: "2020-02-28",
      location: "Boston, MA",
      achievements: [
        "Developed responsive web applications using React and Redux.",
        "Collaborated with designers to implement pixel-perfect UI components.",
        "Maintained and improved existing codebase, resolving critical bugs."
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      university: "Massachusetts Institute of Technology",
      specialization: "Master of Science in Computer Science",
      startDate: "2015-09-01",
      endDate: "2017-05-31",
      location: "Cambridge, MA"
    },
    {
      id: "edu2",
      university: "University of California, Berkeley",
      specialization: "Bachelor of Science in Computer Science",
      startDate: "2011-09-01",
      endDate: "2015-05-31",
      location: "Berkeley, CA"
    }
  ],
  skills: {
    description: "**Programming Languages**\n- JavaScript/TypeScript\n- Python\n- Java\n- HTML/CSS\n\n**Frameworks & Libraries**\n- React/Next.js\n- Node.js\n- Express\n- Redux\n\n**Tools & Technologies**\n- Git/GitHub\n- Docker\n- AWS\n- CI/CD"
  },
  certificates: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-01-15",
      url: "https://example.com/certificate"
    },
    {
      id: "cert2",
      name: "Professional React Developer",
      issuer: "React Academy",
      date: "2020-06-20",
      url: "https://example.com/certificate"
    }
  ],
  languages: [
    {
      id: "lang1",
      description: "English: C1 (advanced)\nGerman: A2 (pre-intermediate)\nSpanish: B1 (intermediate)"
    }
  ]
};

interface CVStore {
  data: CVData;
  activeTemplate: string;

  // Personal Info actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Summary actions
  updateSummary: (summary: string) => void;

  // Work Experience actions
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addAchievement: (experienceId: string, achievement: string) => void;
  updateAchievement: (experienceId: string, index: number, achievement: string) => void;
  removeAchievement: (experienceId: string, index: number) => void;

  // Education actions
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills actions
  updateSkills: (description: string) => void;
  addSkill: (category: keyof Skills, skill: string) => void;
  removeSkill: (category: keyof Skills, index: number) => void;

  // Certificate actions
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  removeCertificate: (id: string) => void;

  // Language actions
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Template actions
  setActiveTemplate: (templateId: string) => void;

  // Reset action
  resetCV: () => void;
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the store
export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: defaultCVData,
      activeTemplate: 'default',

      // Personal Info actions
      updatePersonalInfo: (info) => set((state) => ({
        data: {
          ...state.data,
          personalInfo: {
            ...state.data.personalInfo,
            ...info
          }
        }
      })),

      // Summary actions
      updateSummary: (summary) => set((state) => ({
        data: {
          ...state.data,
          summary
        }
      })),

      // Work Experience actions
      addWorkExperience: (experience) => set((state) => ({
        data: {
          ...state.data,
          workExperience: [
            ...state.data.workExperience,
            {
              ...experience,
              id: generateId(),
              achievements: experience.achievements || []
            }
          ]
        }
      })),

      updateWorkExperience: (id, experience) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((item) =>
            item.id === id ? { ...item, ...experience } : item
          )
        }
      })),

      removeWorkExperience: (id) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.filter((item) => item.id !== id)
        }
      })),

      addAchievement: (experienceId, achievement) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((item) =>
            item.id === experienceId
              ? { ...item, achievements: [...item.achievements, achievement] }
              : item
          )
        }
      })),

      updateAchievement: (experienceId, index, achievement) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((item) =>
            item.id === experienceId
              ? {
                  ...item,
                  achievements: item.achievements.map((a, i) =>
                    i === index ? achievement : a
                  )
                }
              : item
          )
        }
      })),

      removeAchievement: (experienceId, index) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((item) =>
            item.id === experienceId
              ? {
                  ...item,
                  achievements: item.achievements.filter((_, i) => i !== index)
                }
              : item
          )
        }
      })),

      // Education actions
      addEducation: (education) => set((state) => ({
        data: {
          ...state.data,
          education: [
            ...state.data.education,
            {
              ...education,
              id: generateId()
            }
          ]
        }
      })),

      updateEducation: (id, education) => set((state) => ({
        data: {
          ...state.data,
          education: state.data.education.map((item) =>
            item.id === id ? { ...item, ...education } : item
          )
        }
      })),

      removeEducation: (id) => set((state) => ({
        data: {
          ...state.data,
          education: state.data.education.filter((item) => item.id !== id)
        }
      })),

      // Skills actions
      updateSkills: (description) => set((state) => ({
        data: {
          ...state.data,
          skills: {
            description
          }
        }
      })),

      addSkill: (category, skill) => {
        console.warn('addSkill is deprecated, use updateSkills instead');
      },

      removeSkill: (category, index) => {
        console.warn('removeSkill is deprecated, use updateSkills instead');
      },

      // Certificate actions
      addCertificate: (certificate) => set((state) => ({
        data: {
          ...state.data,
          certificates: [
            ...state.data.certificates,
            {
              ...certificate,
              id: generateId()
            }
          ]
        }
      })),

      updateCertificate: (id, certificate) => set((state) => ({
        data: {
          ...state.data,
          certificates: state.data.certificates.map((item) =>
            item.id === id ? { ...item, ...certificate } : item
          )
        }
      })),

      removeCertificate: (id) => set((state) => ({
        data: {
          ...state.data,
          certificates: state.data.certificates.filter((item) => item.id !== id)
        }
      })),

      // Language actions
      addLanguage: (language) => set((state) => ({
        data: {
          ...state.data,
          languages: [
            ...state.data.languages,
            {
              ...language,
              id: generateId()
            }
          ]
        }
      })),

      updateLanguage: (id, language) => set((state) => ({
        data: {
          ...state.data,
          languages: state.data.languages.map((item) =>
            item.id === id ? { ...item, ...language } : item
          )
        }
      })),

      removeLanguage: (id) => set((state) => ({
        data: {
          ...state.data,
          languages: state.data.languages.filter((item) => item.id !== id)
        }
      })),

      // Template actions
      setActiveTemplate: (templateId) => set(() => ({
        activeTemplate: templateId
      })),

      // Reset action
      resetCV: () => set(() => ({
        data: defaultCVData
      })),
    }),
    {
      name: 'cv-storage',
    }
  )
);
