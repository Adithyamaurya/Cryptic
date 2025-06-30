import React, { useState, useCallback } from 'react';
import { Download, Eye, EyeOff, AlertCircle, CheckCircle, Unlock } from 'lucide-react';
import FileDropZone from './FileDropZone';
import ProgressBar from './ProgressBar';
import { decryptImage } from '../utils/encryption';

const DecryptSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [decryptedData, setDecryptedData] = useState<{ blob: Blob; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    // Validate .cryptic extension
    if (!file.name.toLowerCase().endsWith('.cryptic')) {
      setError('Please select a .cryptic file');
      return;
    }

    setSelectedFile(file);
    setDecryptedData(null);
    setError(null);
    setPreviewUrl(null);
  }, []);

  const handleDecrypt = async () => {
    if (!selectedFile || !password.trim()) {
      setError('Please select a .cryptic file and enter the password');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const result = await decryptImage(selectedFile, password);
      
      clearInterval(progressInterval);
      setProgress(100);
      setDecryptedData(result);

      // Create preview URL for decrypted image
      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!decryptedData) return;

    const url = URL.createObjectURL(decryptedData.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = decryptedData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPassword('');
    setDecryptedData(null);
    setError(null);
    setProgress(0);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-500 p-3 rounded-xl">
          <Unlock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Decrypt Images</h2>
          <p className="text-white/60">Restore your encrypted .cryptic files</p>
        </div>
      </div>

      {!selectedFile ? (
        <FileDropZone 
          onFileSelect={handleFileSelect} 
          accept=".cryptic"
          message="Drop your .cryptic file here or click to browse"
          subMessage="Only .cryptic files are supported"
        />
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Unlock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">{selectedFile.name}</h3>
                <div className="text-sm text-white/60 space-y-1">
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Type: Encrypted Image (.cryptic)</p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Decrypted Image Preview */}
          {previewUrl && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-medium mb-4">Decrypted Image Preview</h3>
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt="Decrypted preview"
                  className="max-w-full max-h-64 object-contain rounded-xl border border-white/20"
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Decryption Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password used for encryption"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isProcessing}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <ProgressBar progress={progress} label="Decrypting image..." />
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {decryptedData && (
            <div className="flex items-center space-x-2 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-200">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Image decrypted successfully! Ready for download.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {!decryptedData ? (
              <button
                onClick={handleDecrypt}
                disabled={isProcessing || !password.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                <Unlock className="w-5 h-5" />
                <span>{isProcessing ? 'Decrypting...' : 'Decrypt Image'}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Original Image</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                >
                  Decrypt Another
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecryptSection;