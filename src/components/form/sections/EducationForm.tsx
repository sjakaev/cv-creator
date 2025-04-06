'use client';

import { useState } from 'react';
import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();
  const { education } = data;

  const [newEducation, setNewEducation] = useState({
    specialization: '',
    university: '',
    startDate: '',
    endDate: '',
    location: '',
    isCurrent: false
  });

  const [errors, setErrors] = useState({
    specialization: '',
    university: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'specialization':
      case 'university':
      case 'startDate':
        return value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      case 'endDate':
        // Если это текущее место учебы, то конечная дата не требуется
        return newEducation.isCurrent ? '' : (value.trim() ? '' : 'End Date is required');
      default:
        return '';
    }
  };

  const handleNewEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });

    setNewEducation({
      ...newEducation,
      [name]: value
    });
  };

  const handleCurrentCheckboxChange = (checked: boolean) => {
    setNewEducation({
      ...newEducation,
      isCurrent: checked,
      endDate: checked ? 'Present' : ''
    });

    if (checked) {
      setErrors({
        ...errors,
        endDate: ''
      });
    }
  };

  const handleAddEducation = () => {
    // Validate all fields
    const newErrors = {
      specialization: validateField('specialization', newEducation.specialization),
      university: validateField('university', newEducation.university),
      startDate: validateField('startDate', newEducation.startDate),
      endDate: validateField('endDate', newEducation.endDate),
      location: ''
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    addEducation(newEducation);

    // Reset form
    setNewEducation({
      specialization: '',
      university: '',
      startDate: '',
      endDate: '',
      location: '',
      isCurrent: false
    });
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value });
  };

  const handleEducationCurrentChange = (id: string, checked: boolean) => {
    updateEducation(id, {
      endDate: checked ? 'Present' : '',
      isCurrent: checked
    });
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      {education.map((edu) => (
        <Card key={edu.id} className="relative">
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => removeEducation(edu.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-1">
                <Label>Specialization/Degree</Label>
                <Input
                  value={edu.specialization}
                  onChange={(e) => handleEducationChange(edu.id, 'specialization', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-1">
                <Label>University/Institution</Label>
                <Input
                  value={edu.university}
                  onChange={(e) => handleEducationChange(edu.id, 'university', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-1">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-1">
                <Label>End Date</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="month"
                    value={edu.endDate !== 'Present' ? edu.endDate : ''}
                    onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                    disabled={edu.endDate === 'Present'}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-edu-${edu.id}`}
                      checked={edu.endDate === 'Present'}
                      onCheckedChange={(checked) => handleEducationCurrentChange(edu.id, checked === true)}
                    />
                    <label
                      htmlFor={`current-edu-${edu.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Currently studying here
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Location</Label>
                <Input
                  value={edu.location || ''}
                  onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                  placeholder="e.g. Berkeley, CA"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Education */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Add New Education</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="specialization">Specialization/Degree *</Label>
              <Input
                id="specialization"
                name="specialization"
                value={newEducation.specialization}
                onChange={handleNewEducationChange}
                placeholder="Bachelor in Electronics and Nanoelectronics"
                className={errors.specialization ? 'border-red-500' : ''}
              />
              {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="university">University/Institution *</Label>
              <Input
                id="university"
                name="university"
                value={newEducation.university}
                onChange={handleNewEducationChange}
                placeholder="Samara National Research University"
                className={errors.university ? 'border-red-500' : ''}
              />
              {errors.university && <p className="text-red-500 text-sm">{errors.university}</p>}
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                type="month"
                id="startDate"
                name="startDate"
                value={newEducation.startDate}
                onChange={handleNewEducationChange}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>

            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="endDate">End Date {newEducation.isCurrent ? '' : '*'}</Label>
              <div className="flex flex-col gap-2">
                <Input
                  type="month"
                  id="endDate"
                  name="endDate"
                  value={newEducation.isCurrent ? '' : newEducation.endDate}
                  onChange={handleNewEducationChange}
                  className={errors.endDate ? 'border-red-500' : ''}
                  disabled={newEducation.isCurrent}
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="current-education"
                    checked={newEducation.isCurrent}
                    onCheckedChange={(checked) => handleCurrentCheckboxChange(checked === true)}
                  />
                  <label
                    htmlFor="current-education"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Currently studying here
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newEducation.location}
                onChange={handleNewEducationChange}
                placeholder="e.g. Berkeley, CA"
              />
            </div>
          </div>

          <Button onClick={handleAddEducation}>Add Education</Button>
        </CardContent>
      </Card>
    </div>
  );
}
