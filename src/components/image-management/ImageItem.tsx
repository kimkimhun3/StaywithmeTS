// src/components/image-management/ImageItem.tsx
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { ImageActions } from './ImageActions';

interface ImageItemProps {
  filename: string;
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  filename,
  onView,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-lg">
          <ImageIcon className="text-green-500" size={20} />
        </div>
        <div>
          <span className="font-medium text-slate-800 block">{filename}</span>
          <span className="text-sm text-slate-500">Image File</span>
        </div>
      </div>
      <ImageActions
        filename={filename}
        onView={onView}
        onDownload={onDownload}
        onDelete={onDelete}
      />
    </div>
  );
};
