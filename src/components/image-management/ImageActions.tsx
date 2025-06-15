import React from 'react';
import { Trash2, Download } from 'lucide-react';
import { Button } from '../common/Button';

interface ImageActionsProps {
  filename: string;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export const ImageActions: React.FC<ImageActionsProps> = ({ filename, onDownload, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
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
