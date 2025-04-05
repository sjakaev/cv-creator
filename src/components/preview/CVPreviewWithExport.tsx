'use client';

import { useCVStore } from '@/lib/store/cv-store';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamic import of PDF components that should only work on the client side
const DynamicPDFPreview = dynamic(() => import('@/components/pdf/CVPreview'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center">Loading PDF preview...</div>
});

const DynamicPDFDownloader = dynamic(() => import('@/components/pdf/PDFDownloader'), {
  ssr: false
});

export function CVPreviewWithExport() {
  const { data } = useCVStore();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex flex-wrap gap-2">
          <DynamicPDFDownloader
            data={data}
            className="w-full sm:w-auto"
            buttonLabel="Download PDF"
          />
        </div>
      </div>

      <div className="h-[1000px] border rounded-md overflow-hidden">
        <DynamicPDFPreview data={data} />
      </div>
    </div>
  );
}
