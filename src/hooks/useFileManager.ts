import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';
import { useApi } from './useApi';
import { useNotification } from './useNotification';
import type { TabType } from '../types/common';

export const useFileManager = () => {
  const [mdxFiles, setMdxFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  
  const { loading, execute } = useApi();
  const { showNotification } = useNotification();

  const fetchFiles = useCallback(async () => {
    await execute(
      () => apiService.listMDXFiles(),
      (result) => setMdxFiles(result.files || []),
      (error) => showNotification(`Failed to fetch files: ${error}`, 'error')
    );
  }, [execute, showNotification]);

  const uploadMDX = useCallback(async (file: File) => {
    await execute(
      () => apiService.uploadMDX(file),
      (result) => {
        showNotification(`${result.filename} uploaded successfully!`);
        fetchFiles();
      },
      (error) => showNotification(`Upload failed: ${error}`, 'error')
    );
  }, [execute, showNotification, fetchFiles]);

  const uploadImage = useCallback(async (file: File) => {
    await execute(
      () => apiService.uploadImage(file),
      (result) => {
        showNotification(`Image uploaded! URL: ${result.url}`);
      },
      (error) => showNotification(`Image upload failed: ${error}`, 'error')
    );
  }, [execute, showNotification]);

  const deleteMDX = useCallback(async (filename: string) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;

    await execute(
      () => apiService.deleteMDXFile(filename),
      (result) => {
        showNotification(result.message);
        fetchFiles();
        if (selectedFile === filename) {
          setSelectedFile(null);
          setFileContent('');
        }
      },
      (error) => showNotification(`Delete failed: ${error}`, 'error')
    );
  }, [execute, showNotification, fetchFiles, selectedFile]);

  const viewMDX = useCallback(async (filename: string) => {
    await execute(
      () => apiService.getMDXContent(filename),
      (content) => {
        setFileContent(content);
        setSelectedFile(filename);
        setActiveTab('view');
      },
      (error) => showNotification(`Failed to load file: ${error}`, 'error')
    );
  }, [execute, showNotification]);

  const downloadMDX = useCallback((filename: string) => {
    const link = document.createElement('a');
    link.href = apiService.getMDXDownloadURL(filename);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    mdxFiles,
    selectedFile,
    fileContent,
    activeTab,
    loading,
    setActiveTab,
    uploadMDX,
    uploadImage,
    deleteMDX,
    viewMDX,
    downloadMDX,
    fetchFiles,
  };
};