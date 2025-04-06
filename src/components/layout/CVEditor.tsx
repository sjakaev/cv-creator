'use client';

import { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { CVForm } from '@/components/form/CVForm';
import { CVPreviewWithExport } from '@/components/preview/CVPreviewWithExport';

export function CVEditor() {
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth < 768 ? 'vertical' : 'horizontal');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="cv-editor-container h-screen w-full flex flex-col">
      <ResizablePanelGroup
        direction={direction}
        className="flex-1 w-full rounded-lg border shadow-sm"
      >
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="bg-card min-h-[300px]"
        >
          <div className="h-full p-4 overflow-y-auto">
            <CVForm />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="min-h-[300px]"
        >
          <div className="h-full p-4 overflow-y-auto bg-white">
            <CVPreviewWithExport />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
