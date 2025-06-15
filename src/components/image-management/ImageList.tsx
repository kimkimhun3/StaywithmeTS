import React from 'react';
import { Image } from 'lucide-react';
import { ImageItem } from './ImageItem';

interface ImageListProps {
  files: string[];
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({ files, onDownload, onDelete }) => {
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 sm:p-8 text-center text-slate-500">
          <Image className="mx-auto text-slate-300" size={48} />
          <h3 className="text-base sm:text-lg font-medium mt-4 mb-1">No image files found</h3>
          <p className="text-sm text-slate-400">Upload images to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Image className="text-green-500" size={20} />
          Image Files ({files.length})
        </h2>
      </div>
      <div className="divide-y divide-slate-200 text-sm sm:text-base max-h-[60vh] overflow-y-auto">
        {files.map((filename) => (
          <ImageItem
            key={filename}
            filename={filename}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
