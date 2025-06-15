// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { MDXUpload } from './components/upload/MDXUpload';
import { ImageUpload } from './components/upload/ImageUpload';
import { FileList } from './components/file-management/FileList';
import { MDXViewer } from './components/viewer/MDXViewer';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { useFileManager } from './hooks/useFileManager';
import { useImageManager } from './hooks/useImageManager';
import { ImageList } from './components/image-management/ImageList';

const App: React.FC = () => {
  const {
    mdxFiles,
    selectedFile,
    fileContent,
    loading: mdxLoading,
    uploadMDX,
    uploadImage: uploadImageFromMDX,
    deleteMDX,
    viewMDX,
    downloadMDX,
  } = useFileManager();

  const {
    imageFiles,
    uploadImage,
    deleteImage,
    downloadImage,
    loading: imageLoading,
  } = useImageManager();

  const loading = mdxLoading || imageLoading;

  return (
    <Router>
      <Layout hasSelectedFile={!!selectedFile}>
        <Routes>
          {/* Upload Page */}
          <Route
            path="/"
            element={
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <MDXUpload onUpload={uploadMDX} loading={mdxLoading} />
                <ImageUpload onUpload={uploadImage} loading={imageLoading} />
              </div>
            }
          />

          {/* Manage Files Page */}
          <Route
            path="/manage"
            element={
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Manage MDX Files</h2>
                  <FileList
                    files={mdxFiles}
                    onView={viewMDX}
                    onDownload={downloadMDX}
                    onDelete={deleteMDX}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
                  <ImageList
                    files={imageFiles}
                    onDownload={downloadImage}
                    onDelete={deleteImage}
                  />
                </div>
              </div>
            }
          />

          {/* View Content Page */}
          <Route
            path="/view"
            element={
              selectedFile ? (
                <div className="max-w-4xl mx-auto">
                  <MDXViewer
                    filename={selectedFile}
                    content={fileContent}
                    loading={mdxLoading}
                    onDownload={downloadMDX}
                  />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Redirect unknown routes to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <LoadingSpinner message="Processing..." />
            </div>
          </div>
        )}
      </Layout>
    </Router>
  );
};

export default App;