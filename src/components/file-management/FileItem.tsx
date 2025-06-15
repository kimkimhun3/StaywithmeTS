import React from 'react';
import { FileText } from 'lucide-react';
import { FileActions } from './FileActions';

interface FileItemProps {
  filename: string;
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const FileItem: React.FC<FileItemProps> = ({
  filename,
  onView,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FileText className="text-blue-500" size={20} />
        </div>
        <div>
          <span className="font-medium text-slate-800 block">{filename}</span>
          <span className="text-sm text-slate-500">MDX File</span>
        </div>
      </div>
      <FileActions
        filename={filename}
        onView={onView}
        onDownload={onDownload}
        onDelete={onDelete}
      />
    </div>
  );
};
