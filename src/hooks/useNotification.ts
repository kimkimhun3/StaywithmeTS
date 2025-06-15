import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: Notification['type'] = 'success') => {
    const id = Date.now().toString();
    const notification: Notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
  };
};
