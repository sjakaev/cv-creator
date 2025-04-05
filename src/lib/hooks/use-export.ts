'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import { CVData } from '@/lib/types/cv';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import CVPDFTemplate from '@/components/pdf/CVPDFTemplate';

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  // Function to generate filename from user data
  const generateFilename = (data: CVData) => {
    const { firstName, lastName } = data.personalInfo;
    const name = `${firstName}_${lastName}`.replace(/\s+/g, '_').toLowerCase();
    const date = new Date().toISOString().split('T')[0];
    return `${name}_cv_${date}`;
  };

  // Function to export to PDF
  const exportToPDF = async (data: CVData) => {
    if (!data) {
      console.error('No data provided for PDF export');
      return;
    }

    try {
      setIsExporting(true);

      // @ts-ignore
      const pdfBlob = await pdf(React.createElement(CVPDFTemplate, { data })).toBlob();

      const filename = `${generateFilename(data)}.pdf`;
      saveAs(pdfBlob, filename);

      return filename;
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export to PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Function to export to DOCX
  const exportToDOCX = async (data: CVData) => {
    alert('DOCX export is under development. Please use PDF export instead.');
    return exportToPDF(data);
  };

  return {
    isExporting,
    exportToPDF,
    exportToDOCX,
  };
};
