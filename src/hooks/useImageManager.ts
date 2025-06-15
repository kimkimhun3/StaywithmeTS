// src/hooks/useImageManager.ts
import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';
import { useApi } from './useApi';
import { useNotification } from './useNotification';

export const useImageManager = () => {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const { loading, execute } = useApi();
  const { showNotification } = useNotification();

  const fetchImages = useCallback(async () => {
    await execute(
      () => apiService.listImageFiles(),
      (result) => setImageFiles(result.images || []),
      (error) => showNotification(`Failed to fetch images: ${error}`, 'error')
    );
  }, [execute, showNotification]);

  const uploadImage = useCallback(async (file: File) => {
    await execute(
      () => apiService.uploadImage(file),
      (result) => {
        showNotification(`Image uploaded! URL: ${result.url}`);
        fetchImages();
      },
      (error) => showNotification(`Image upload failed: ${error}`, 'error')
    );
  }, [execute, showNotification, fetchImages]);

  const deleteImage = useCallback(async (filename: string) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;

    await execute(
      () => apiService.deleteImageFile(filename),
      (result) => {
        showNotification(result.message);
        fetchImages();
      },
      (error) => showNotification(`Image deletion failed: ${error}`, 'error')
    );
  }, [execute, showNotification, fetchImages]);

  const downloadImage = useCallback((filename: string) => {
    const link = document.createElement('a');
    link.href = apiService.getImageURL(filename);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    imageFiles,
    loading,
    uploadImage,
    deleteImage,
    downloadImage,
    fetchImages,
  };
};
