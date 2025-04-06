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
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="w-max xl:w-full min-w-full xl:grid xl:grid-cols-7">
            <TabsTrigger value="personal" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Personal</TabsTrigger>
            <TabsTrigger value="summary" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Summary</TabsTrigger>
            <TabsTrigger value="experience" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Experience</TabsTrigger>
            <TabsTrigger value="education" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Education</TabsTrigger>
            <TabsTrigger value="skills" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Skills</TabsTrigger>
            <TabsTrigger value="certificates" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Certificates</TabsTrigger>
            <TabsTrigger value="languages" className="whitespace-nowrap px-3 xl:px-4 text-xs sm:text-sm xl:text-base">Languages</TabsTrigger>
          </TabsList>
        </div>

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
