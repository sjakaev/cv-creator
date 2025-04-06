'use client';

import { useState } from 'react';
import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash, X } from 'lucide-react';
import { generateId } from '@/lib/utils';

export function WorkExperienceForm() {
  const { data, addWorkExperience, updateWorkExperience, removeWorkExperience, addAchievement, updateAchievement, removeAchievement } = useCVStore();
  const { workExperience } = data;

  const [newExperience, setNewExperience] = useState({
    company: '',
    companyDescription: '',
    position: '',
    startDate: '',
    endDate: '',
    achievements: ['']
  });

  const [errors, setErrors] = useState({
    company: '',
    companyDescription: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'company':
      case 'companyDescription':
      case 'position':
      case 'startDate':
        return value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      default:
        return '';
    }
  };

  const handleNewExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });

    setNewExperience({
      ...newExperience,
      [name]: value
    });
  };

  const handleAddAchievement = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience.achievements, '']
    });
  };

  const handleNewAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements[index] = value;

    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const handleRemoveNewAchievement = (index: number) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements.splice(index, 1);

    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const handleAddExperience = () => {
    // Validate all fields
    const newErrors = {
      company: validateField('company', newExperience.company),
      companyDescription: validateField('companyDescription', newExperience.companyDescription),
      position: validateField('position', newExperience.position),
      startDate: validateField('startDate', newExperience.startDate),
      endDate: '',
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Filter out empty achievements
    const filteredAchievements = newExperience.achievements.filter(a => a.trim() !== '');

    addWorkExperience({
      ...newExperience,
      achievements: filteredAchievements,
    });

    // Reset form
    setNewExperience({
      company: '',
      companyDescription: '',
      position: '',
      startDate: '',
      endDate: '',
      achievements: ['']
    });
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    updateWorkExperience(id, { [field]: value });
  };

  const handleExperienceAchievementChange = (experienceId: string, index: number, value: string) => {
    updateAchievement(experienceId, index, value);
  };

  const handleAddExperienceAchievement = (experienceId: string) => {
    addAchievement(experienceId, '');
  };

  const handleRemoveExperienceAchievement = (experienceId: string, index: number) => {
    removeAchievement(experienceId, index);
  };

  return (
    <div className="space-y-6">
      {/* Existing Work Experience */}
      {workExperience.map((experience) => (
        <Card key={experience.id} className="relative">
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => removeWorkExperience(experience.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => handleExperienceChange(experience.id, 'position', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>End Date (or &quot;Present&quot;)</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label>Company Description</Label>
              <Textarea
                value={experience.companyDescription}
                onChange={(e) => handleExperienceChange(experience.id, 'companyDescription', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Achievements</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddExperienceAchievement(experience.id)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => handleExperienceAchievementChange(experience.id, index, e.target.value)}
                    placeholder="Describe your achievement..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveExperienceAchievement(experience.id, index)}
                    disabled={experience.achievements.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Work Experience */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Add New Work Experience</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                value={newExperience.company}
                onChange={handleNewExperienceChange}
                placeholder="Company Name"
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                name="position"
                value={newExperience.position}
                onChange={handleNewExperienceChange}
                placeholder="Senior Frontend Developer"
                className={errors.position ? 'border-red-500' : ''}
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={newExperience.startDate}
                onChange={handleNewExperienceChange}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (or &quot;Present&quot;)</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newExperience.endDate}
                onChange={handleNewExperienceChange}
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Label htmlFor="companyDescription">Company Description *</Label>
            <Textarea
              id="companyDescription"
              name="companyDescription"
              value={newExperience.companyDescription}
              onChange={handleNewExperienceChange}
              placeholder="Describe your company..."
              className={errors.companyDescription ? 'border-red-500' : ''}
            />
            {errors.companyDescription && <p className="text-red-500 text-sm">{errors.companyDescription}</p>}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <Label>Achievements</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddAchievement}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={achievement}
                  onChange={(e) => handleNewAchievementChange(index, e.target.value)}
                  placeholder="Describe your achievement..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveNewAchievement(index)}
                  disabled={newExperience.achievements.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleAddExperience}>Add Work Experience</Button>
        </CardContent>
      </Card>
    </div>
  );
}
