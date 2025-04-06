'use client';

import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function LanguagesForm() {
  const { data, updateLanguage } = useCVStore();
  const { languages } = data;

  // Get language description from the first element of the array or empty string
  const languageDescription = languages.length > 0 ? languages[0].description : '';

  const handleLanguageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (languages.length === 0) {
      // If no languages yet, create the first one
      const { addLanguage } = useCVStore.getState();
      addLanguage({ description: e.target.value });
    } else {
      // If languages already exist, update the first one
      updateLanguage(languages[0].id, { description: e.target.value });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="languages">Languages</Label>
            <Textarea
              id="languages"
              value={languageDescription}
              onChange={handleLanguageChange}
              placeholder="English: C1 (advanced)
German: A2 (pre-intermediate)"
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
