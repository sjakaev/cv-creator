'use client';

import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { CVForm } from '@/components/form/CVForm';
import { CVPreviewWithExport } from '@/components/preview/CVPreviewWithExport';

export function CVEditor() {
  return (
    <div className="cv-editor-container py-6">
      <header className="mb-6 fade-in">
        <h1 className="text-3xl font-bold text-center">CV Editor</h1>
        <p className="text-center text-gray-500">Create and customize your professional CV</p>
      </header>

      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[calc(100vh-150px)] rounded-lg border shadow-sm"
      >
        <ResizablePanel defaultSize={50} minSize={30} className="bg-card">
          <div className="h-full p-4 overflow-y-auto">
            <CVForm />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-4 overflow-y-auto bg-white">
            <CVPreviewWithExport />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
