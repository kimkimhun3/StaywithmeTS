// src/components/image-management/ImageList.tsx
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { ImageItem } from './ImageItem';

interface ImageListProps {
  files: string[];
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({
  files,
  onView,
  onDownload,
  onDelete,
}) => {
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-8 text-center text-slate-500">
          <div className="mb-4">
            <ImageIcon className="mx-auto text-slate-300" size={64} />
          </div>
          <h3 className="text-lg font-medium mb-2">No images found</h3>
          <p className="text-slate-400">Upload an image to see it listed here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <ImageIcon className="text-green-500" size={24} />
          Uploaded Images ({files.length})
        </h2>
      </div>
      <div className="divide-y divide-slate-200">
        {files.map((filename) => (
          <ImageItem
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
