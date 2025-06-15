// src/components/image-management/ImageActions.tsx
import React from 'react';
import { Eye, Download, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface ImageActionsProps {
  filename: string;
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const ImageActions: React.FC<ImageActionsProps> = ({
  filename,
  onView,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={Eye}
        onClick={() => onView(filename)}
        title="View image"
      >
        View
      </Button>
      <Button
        variant="secondary"
        size="sm"
        icon={Download}
        onClick={() => onDownload(filename)}
        title="Download image"
      >
        Download
      </Button>
      <Button
        variant="danger"
        size="sm"
        icon={Trash2}
        onClick={() => onDelete(filename)}
        title="Delete image"
      >
        Delete
      </Button>
    </div>
  );
};
