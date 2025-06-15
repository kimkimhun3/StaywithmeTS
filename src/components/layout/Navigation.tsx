import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Upload, FolderOpen, Eye } from 'lucide-react';

interface NavigationProps {
  hasSelectedFile: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ hasSelectedFile }) => {
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Upload Files', icon: Upload },
    { path: '/manage', label: 'Manage Files', icon: FolderOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="flex justify-center mb-8">
      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
        {tabs.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
              isActive(path)
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};