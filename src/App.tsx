// src/App.tsx
import React from 'react';
import { Layout } from './components/layout/Layout';
import { MDXUpload } from './components/upload/MDXUpload';
import { ImageUpload } from './components/upload/ImageUpload';
import { FileList } from './components/file-management/FileList';
import { MDXViewer } from './components/viewer/MDXViewer';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { useFileManager } from './hooks/useFileManager';

const App: React.FC = () => {
  const {
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
  } = useFileManager();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <MDXUpload onUpload={uploadMDX} loading={loading} />
            <ImageUpload onUpload={uploadImage} loading={loading} />
          </div>
        );

      case 'manage':
        return (
          <div className="max-w-4xl mx-auto">
            <FileList
              files={mdxFiles}
              onView={viewMDX}
              onDownload={downloadMDX}
              onDelete={deleteMDX}
            />
          </div>
        );

      case 'view':
        return (
          <div className="max-w-4xl mx-auto">
            <MDXViewer
              filename={selectedFile}
              content={fileContent}
              loading={loading}
              onDownload={downloadMDX}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      hasSelectedFile={!!selectedFile}
    >
      {renderTabContent()}
      
      {/* Global loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <LoadingSpinner message="Processing..." />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;