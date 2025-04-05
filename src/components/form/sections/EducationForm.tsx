'use client';

import { useState } from 'react';
import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();
  const { education } = data;
  
  const [newEducation, setNewEducation] = useState({
    specialization: '',
    university: '',
    startDate: '',
    endDate: ''
  });
  
  const [errors, setErrors] = useState({
    specialization: '',
    university: '',
    startDate: '',
    endDate: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'specialization':
      case 'university':
      case 'startDate':
      case 'endDate':
        return value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
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

  const handleAddEducation = () => {
    // Validate all fields
    const newErrors = {
      specialization: validateField('specialization', newEducation.specialization),
      university: validateField('university', newEducation.university),
      startDate: validateField('startDate', newEducation.startDate),
      endDate: validateField('endDate', newEducation.endDate)
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
      endDate: ''
    });
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value });
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
              <div className="space-y-2">
                <Label>Specialization/Degree</Label>
                <Input
                  value={edu.specialization}
                  onChange={(e) => handleEducationChange(edu.id, 'specialization', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>University/Institution</Label>
                <Input
                  value={edu.university}
                  onChange={(e) => handleEducationChange(edu.id, 'university', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
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
            <div className="space-y-2">
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
            
            <div className="space-y-2">
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
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={newEducation.startDate}
                onChange={handleNewEducationChange}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newEducation.endDate}
                onChange={handleNewEducationChange}
                className={errors.endDate ? 'border-red-500' : ''}
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>
          
          <Button onClick={handleAddEducation}>Add Education</Button>
        </CardContent>
      </Card>
    </div>
  );
}
