import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import CVPDFTemplate from './CVPDFTemplate';
import { CVData } from '@/lib/types/cv';

interface CVPreviewProps {
  data: CVData;
  className?: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, className = '' }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <PDFViewer width="100%" height="100%" className="rounded-md border border-gray-200">
        <CVPDFTemplate data={data} />
      </PDFViewer>
    </div>
  );
};

export default CVPreview;
