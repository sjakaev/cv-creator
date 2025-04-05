'use client';

import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function SkillsForm() {
  const { data, updateSkills } = useCVStore();
  const { skills } = data;

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSkills(e.target.value);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Textarea
              id="skills"
              value={skills.description}
              onChange={handleSkillsChange}
              placeholder="Your skills..."
              className="min-h-[250px] font-mono"
            />
            <p className="text-sm text-gray-500">
              Markdown formatting is supported: <span className="font-mono">**bold**</span>, <span className="font-mono">*underlined*</span> (instead of italic), <span className="font-mono">- lists</span>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
