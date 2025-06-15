import React from 'react';
import { FileText } from 'lucide-react';
import { FileItem } from './FileItem';

interface FileListProps {
  files: string[];
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onView,
  onDownload,
  onDelete,
}) => {
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 sm:p-8 text-center text-slate-500">
          <FileText className="mx-auto text-slate-300" size={48} />
          <h3 className="text-base sm:text-lg font-medium mt-4 mb-1">No MDX files found</h3>
          <p className="text-sm text-slate-400">Upload your first MDX file to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="text-blue-500" size={20} />
          MDX Files ({files.length})
        </h2>
      </div>
      <div className="divide-y divide-slate-200 text-sm sm:text-base max-h-[60vh] overflow-y-auto">
        {files.map((filename) => (
          <FileItem
            key={filename}
            filename={filename}
            onView={onView}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
