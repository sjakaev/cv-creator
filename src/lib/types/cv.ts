// Types for CV data structure
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  position: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  linkedin?: string;
  telegram?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  companyDescription: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  achievements: string[];
}

export interface Education {
  id: string;
  specialization: string;
  university: string;
  startDate: string;
  endDate: string;
  location?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  description: string;
}

export interface Skills {
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  certificates: Certificate[];
  languages: Language[];
}

// Template interface for future template switching
export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}
