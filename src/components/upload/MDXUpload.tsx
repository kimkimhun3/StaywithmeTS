import React from 'react';
import { FileText } from 'lucide-react';
import { UploadZone } from './UploadZone';
import { ACCEPTED_MDX_TYPES } from '../../utils/constants';

interface MDXUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export const MDXUpload: React.FC<MDXUploadProps> = ({ onUpload, loading }) => {
  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.mdx')) {
      alert('Please select an .mdx file');
      return;
    }
    onUpload(file);
  };

  return (
    <UploadZone
      title="Upload MDX File"
      icon={FileText}
      acceptedTypes={ACCEPTED_MDX_TYPES}
      onFileSelect={handleFileSelect}
      loading={loading}
      iconColor="text-blue-500"
      buttonColor="primary"
    />
  );
};