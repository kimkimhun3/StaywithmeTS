import React from 'react';
import { Image } from 'lucide-react';
import { UploadZone } from './UploadZone';
import { ACCEPTED_IMAGE_TYPES } from '../../utils/constants';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, loading }) => {
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    onUpload(file);
  };

  return (
    <UploadZone
      title="Upload Image"
      icon={Image}
      acceptedTypes={ACCEPTED_IMAGE_TYPES}
      onFileSelect={handleFileSelect}
      loading={loading}
      iconColor="text-green-500"
      buttonColor="success"
    />
  );
};