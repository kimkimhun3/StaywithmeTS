import React, { useRef, useState } from 'react';
import { Upload, type LucideIcon } from 'lucide-react';
import { Button } from '../common/Button';

interface UploadZoneProps {
  title: string;
  icon: LucideIcon;
  acceptedTypes: string;
  onFileSelect: (file: File) => void;
  loading?: boolean;
  iconColor?: string;
  buttonColor?: 'primary' | 'success';
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  title,
  icon: Icon,
  acceptedTypes,
  onFileSelect,
  loading = false,
  iconColor = 'text-blue-500',
  buttonColor = 'primary',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className={`text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2`}>
        <Icon className={iconColor} size={24} />
        {title}
      </h2>
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mx-auto text-slate-400 mb-4" size={48} />
        <p className="text-slate-600 mb-2">
          Drag and drop your file here
        </p>
        <p className="text-sm text-slate-500 mb-4">or</p>
        
        <Button
          variant={buttonColor}
          loading={loading}
          disabled={loading}
        >
          Choose File
        </Button>
        
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};