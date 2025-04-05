'use client';

import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export function SummaryForm() {
  const { data, updateSummary } = useCVStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={handleChange}
            placeholder="Experienced Frontend Developer with 6 years of expertise in building responsive web applications..."
            className="min-h-[200px]"
          />
          <p className="text-sm text-gray-500">
            Write a concise summary of your professional background, skills, and career highlights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
