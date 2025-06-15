import React from 'react';
import { Eye, Download } from 'lucide-react';
import { ContentPreview } from './ContentPreview';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface MDXViewerProps {
  filename: string | null;
  content: string;
  loading?: boolean;
  onDownload?: (filename: string) => void;
}

export const MDXViewer: React.FC<MDXViewerProps> = ({
  filename,
  content,
  loading = false,
  onDownload,
}) => {
  if (!filename) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-8 text-center text-slate-500">
          <Eye className="mx-auto text-slate-300 mb-4" size={64} />
          <h3 className="text-lg font-medium mb-2">No file selected</h3>
          <p className="text-slate-400">Select a file from the manage tab to view its content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Eye className="text-purple-500" size={24} />
            Viewing: {filename}
          </h2>
          {onDownload && (
            <Button
              variant="secondary"
              icon={Download}
              onClick={() => onDownload(filename)}
            >
              Download
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {loading ? (
          <LoadingSpinner message="Loading content..." />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                <strong>File:</strong> {filename} • <strong>Size:</strong> {content.length} characters
              </div>
            </div>
            <ContentPreview content={content} />
          </>
        )}
      </div>
    </div>
  );
};