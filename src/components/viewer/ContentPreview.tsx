import React from 'react';

interface ContentPreviewProps {
  content: string;
  maxHeight?: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ 
  content, 
  maxHeight = 'max-h-96' 
}) => {
  return (
    <div className={`bg-slate-50 p-4 rounded-lg overflow-auto text-sm text-slate-800 ${maxHeight}`}>
      <pre className="whitespace-pre-wrap font-mono leading-relaxed">
        {content}
      </pre>
    </div>
  );
};