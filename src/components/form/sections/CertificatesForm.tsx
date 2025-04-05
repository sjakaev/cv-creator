'use client';

import { useState } from 'react';
import { useCVStore } from '@/lib/store/cv-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';

export function CertificatesForm() {
  const { data, addCertificate, updateCertificate, removeCertificate } = useCVStore();
  const { certificates } = data;
  
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    date: '',
    url: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    issuer: '',
    date: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
      case 'issuer':
      case 'date':
        return value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      default:
        return '';
    }
  };

  const handleNewCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
    
    setNewCertificate({
      ...newCertificate,
      [name]: value
    });
  };

  const handleAddCertificate = () => {
    // Validate all fields
    const newErrors = {
      name: validateField('name', newCertificate.name),
      issuer: validateField('issuer', newCertificate.issuer),
      date: validateField('date', newCertificate.date)
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    addCertificate(newCertificate);
    
    // Reset form
    setNewCertificate({
      name: '',
      issuer: '',
      date: '',
      url: ''
    });
  };

  const handleCertificateChange = (id: string, field: string, value: string) => {
    updateCertificate(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 italic">This section is optional. Add certificates if you have any.</p>
      
      {/* Existing Certificates */}
      {certificates.map((certificate) => (
        <Card key={certificate.id} className="relative">
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => removeCertificate(certificate.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Certificate Name</Label>
                <Input
                  value={certificate.name}
                  onChange={(e) => handleCertificateChange(certificate.id, 'name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Issuing Organization</Label>
                <Input
                  value={certificate.issuer}
                  onChange={(e) => handleCertificateChange(certificate.id, 'issuer', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="month"
                  value={certificate.date}
                  onChange={(e) => handleCertificateChange(certificate.id, 'date', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>URL (optional)</Label>
                <Input
                  type="url"
                  value={certificate.url || ''}
                  onChange={(e) => handleCertificateChange(certificate.id, 'url', e.target.value)}
                  placeholder="https://example.com/certificate"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Add New Certificate */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Add New Certificate</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Certificate Name *</Label>
              <Input
                id="name"
                name="name"
                value={newCertificate.name}
                onChange={handleNewCertificateChange}
                placeholder="Advanced JavaScript Certification"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                name="issuer"
                value={newCertificate.issuer}
                onChange={handleNewCertificateChange}
                placeholder="Udemy"
                className={errors.issuer ? 'border-red-500' : ''}
              />
              {errors.issuer && <p className="text-red-500 text-sm">{errors.issuer}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="month"
                value={newCertificate.date}
                onChange={handleNewCertificateChange}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL (optional)</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={newCertificate.url}
                onChange={handleNewCertificateChange}
                placeholder="https://example.com/certificate"
              />
            </div>
          </div>
          
          <Button onClick={handleAddCertificate}>Add Certificate</Button>
        </CardContent>
      </Card>
    </div>
  );
}
