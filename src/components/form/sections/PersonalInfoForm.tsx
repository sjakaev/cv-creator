'use client';

import { useState } from 'react';
import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useCVStore();
  const { personalInfo } = data;

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    position: '',
    country: '',
    city: '',
    phone: '',
    email: '',
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'country':
      case 'city':
      case 'position':
        return value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      case 'email':
        return value.trim() ? (isValidEmail(value) ? '' : 'Invalid email format') : 'Email is required';
      case 'phone':
        return value.trim() ? (isValidPhone(value) ? '' : 'Phone format should be +XX XXXX XXXX XXX') : 'Phone is required';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the error state
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });

    // Update the store
    updatePersonalInfo({ [name]: value });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleChange}
              placeholder="John"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="position">Position / Job Title *</Label>
            <Input
              id="position"
              name="position"
              value={personalInfo.position || ''}
              onChange={handleChange}
              placeholder="Senior Frontend Developer"
              className={errors.position ? 'border-red-500' : ''}
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              name="country"
              value={personalInfo.country}
              onChange={handleChange}
              placeholder="Germany"
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              value={personalInfo.city}
              onChange={handleChange}
              placeholder="Berlin"
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number * (format: +49 1234 5678 901)</Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="+49 1234 5678 901"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (optional)</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={handleChange}
              placeholder="https://www.linkedin.com/in/johndoe/"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram (optional, without @)</Label>
            <Input
              id="telegram"
              name="telegram"
              value={personalInfo.telegram || ''}
              onChange={handleChange}
              placeholder="johndoe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website || ''}
              onChange={handleChange}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
