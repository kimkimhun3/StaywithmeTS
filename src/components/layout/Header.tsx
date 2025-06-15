import React from 'react';
import { FileText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-blue-500 rounded-xl text-white">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-800">MDX File Manager</h1>
      </div>
      <p className="text-slate-600 text-lg">
        Upload, manage, and view your MDX files and images
      </p>
    </header>
  );
};