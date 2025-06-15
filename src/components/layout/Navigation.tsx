import React from 'react';
import { Upload, FolderOpen, Eye } from 'lucide-react';
import type { TabType } from '../../types/common';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hasSelectedFile: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  hasSelectedFile,
}) => {
  const tabs = [
    { id: 'upload' as TabType, label: 'Upload Files', icon: Upload },
    { id: 'manage' as TabType, label: 'Manage Files', icon: FolderOpen },
    ...(hasSelectedFile ? [{ id: 'view' as TabType, label: 'View Content', icon: Eye }] : []),
  ];

  return (
    <nav className="flex justify-center mb-8">
      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === id
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};