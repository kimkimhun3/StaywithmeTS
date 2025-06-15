import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type,
  onClose,
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${styles[type]} min-w-80 max-w-md`}>
      <Icon size={20} />
      <span className="flex-1 text-sm">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};