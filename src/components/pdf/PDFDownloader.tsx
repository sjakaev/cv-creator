'use client';

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { BlobProvider } from '@react-pdf/renderer';
import CVPDFTemplate from './CVPDFTemplate';
import { CVData } from '@/lib/types/cv';
import { Button } from '@/components/ui/button';

interface PDFDownloaderProps {
  data: CVData;
  className?: string;
  buttonLabel?: string;
}

const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  data,
  className = '',
  buttonLabel = 'Download PDF'
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to generate filename from user data
  const generateFilename = (data: CVData) => {
    const { firstName, lastName } = data.personalInfo;
    const name = `${firstName}_${lastName}`.replace(/\s+/g, '_').toLowerCase();
    const date = new Date().toISOString().split('T')[0];
    return `${name}_cv_${date}`;
  };

  // Sanitize the data to prevent rendering issues
  const sanitizeData = (data: CVData): CVData => {
    const copy = JSON.parse(JSON.stringify(data));

    // Ensure workExperience is an array and sanitize it
    if (copy.workExperience) {
      copy.workExperience = copy.workExperience.map((job: any) => ({
        ...job,
        achievements: Array.isArray(job.achievements) ?
          job.achievements.filter(Boolean) : [],
        companyDescription: job.companyDescription || ''
      }));
    } else {
      copy.workExperience = [];
    }

    // Ensure other arrays are properly defined
    copy.education = Array.isArray(copy.education) ? copy.education : [];
    copy.certificates = Array.isArray(copy.certificates) ? copy.certificates : [];
    copy.languages = Array.isArray(copy.languages) ? copy.languages : [];

    // Ensure skills object is defined with the current structure
    if (!copy.skills || typeof copy.skills.description !== 'string') {
      copy.skills = {
        description: ''
      };
    }

    return copy;
  };

  const handleError = (error: any) => {
    console.error('Error exporting to PDF:', error);
    setError(`Error exporting to PDF: ${error instanceof Error ? error.message : String(error)}`);
    setIsGenerating(false);
  };

  const handleDownload = async (blob: Blob | null) => {
    if (!blob) {
      handleError('Failed to generate PDF blob');
      return;
    }

    try {
      const filename = `${generateFilename(data)}.pdf`;
      saveAs(blob, filename);
    } catch (error) {
      handleError(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Sanitize data for PDF generation
  const sanitizedData = sanitizeData(data);

  return (
    <div className="flex flex-col">
      <BlobProvider document={<CVPDFTemplate data={sanitizedData} />}>
        {({ blob, loading, error: pdfError }) => (
          <Button
            onClick={() => {
              setIsGenerating(true);
              setError(null);

              if (pdfError) {
                handleError(pdfError);
                return;
              }

              handleDownload(blob);
            }}
            disabled={isGenerating || loading}
            className={className}
          >
            {isGenerating || loading ? 'Generating PDF...' : buttonLabel}
          </Button>
        )}
      </BlobProvider>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default PDFDownloader;
