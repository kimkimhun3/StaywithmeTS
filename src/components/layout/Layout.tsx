import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Notification } from '../common/Notification';
import { useNotification } from '../../hooks/useNotification';
import type { TabType } from '../../types/common';

interface LayoutProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hasSelectedFile: boolean;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  activeTab,
  onTabChange,
  hasSelectedFile,
  children,
}) => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <Navigation
          activeTab={activeTab}
          onTabChange={onTabChange}
          hasSelectedFile={hasSelectedFile}
        />
        <main>{children}</main>
      </div>
    </div>
  );
};