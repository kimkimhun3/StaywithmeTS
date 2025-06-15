export interface MDXFile {
  name: string;
  uploadedAt?: string;
}

export interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export interface FileActionProps {
  filename: string;
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
  onDelete: (filename: string) => void;
}

export type TabType = 'upload' | 'manage' | 'view';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}