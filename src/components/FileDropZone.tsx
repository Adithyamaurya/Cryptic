import React, { useCallback, useState } from 'react';
import { Upload, Image, AlertCircle } from 'lucide-react';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  accept: string;
  message?: string;
  subMessage?: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ 
  onFileSelect, 
  accept, 
  message = "Drop your image here or click to browse",
  subMessage = "Supports JPG, PNG, GIF up to 50MB"
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 50MB');
      return false;
    }

    // Check file type for images
    if (accept === 'image/*') {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPG, PNG, or GIF)');
        return false;
      }
    }

    // Check .cryptic extension
    if (accept === '.cryptic' && !file.name.toLowerCase().endsWith('.cryptic')) {
      setError('Please select a .cryptic file');
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
          isDragOver
            ? 'border-emerald-400 bg-emerald-400/10 scale-105'
            : 'border-white/30 hover:border-white/50 hover:bg-white/5'
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full transition-all duration-300 ${
              isDragOver 
                ? 'bg-emerald-400/20 text-emerald-400' 
                : 'bg-white/10 text-white/60 group-hover:text-white group-hover:bg-white/20'
            }`}>
              {accept === 'image/*' ? (
                <Image className="w-12 h-12" />
              ) : (
                <Upload className="w-12 h-12" />
              )}
            </div>
          </div>
          
          <div>
            <p className={`text-lg font-medium transition-colors duration-300 ${
              isDragOver ? 'text-emerald-400' : 'text-white group-hover:text-white/90'
            }`}>
              {message}
            </p>
            <p className="text-white/50 mt-2">
              {subMessage}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;