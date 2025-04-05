'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './sections/PersonalInfoForm';
import { SummaryForm } from './sections/SummaryForm';
import { WorkExperienceForm } from './sections/WorkExperienceForm';
import { EducationForm } from './sections/EducationForm';
import { SkillsForm } from './sections/SkillsForm';
import { CertificatesForm } from './sections/CertificatesForm';
import { LanguagesForm } from './sections/LanguagesForm';

export function CVForm() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit CV</h2>
      
      <Tabs defaultValue="personal" className="cv-form-tabs">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
          <TabsTrigger value="personal" className="text-xs md:text-sm">Personal</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs md:text-sm">Summary</TabsTrigger>
          <TabsTrigger value="experience" className="text-xs md:text-sm">Experience</TabsTrigger>
          <TabsTrigger value="education" className="text-xs md:text-sm">Education</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs md:text-sm">Skills</TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs md:text-sm">Certificates</TabsTrigger>
          <TabsTrigger value="languages" className="text-xs md:text-sm">Languages</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 slide-in">
          <TabsContent value="personal" className="space-y-4">
            <PersonalInfoForm />
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-4">
            <SummaryForm />
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-4">
            <WorkExperienceForm />
          </TabsContent>
          
          <TabsContent value="education" className="space-y-4">
            <EducationForm />
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <SkillsForm />
          </TabsContent>
          
          <TabsContent value="certificates" className="space-y-4">
            <CertificatesForm />
          </TabsContent>
          
          <TabsContent value="languages" className="space-y-4">
            <LanguagesForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
