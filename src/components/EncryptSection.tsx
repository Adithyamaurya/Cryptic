import React, { useState, useCallback } from 'react';
import { Upload, Download, Eye, EyeOff, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import FileDropZone from './FileDropZone';
import ProgressBar from './ProgressBar';
import { encryptImage } from '../utils/encryption';

const EncryptSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setEncryptedData(null);
    setError(null);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    return () => URL.revokeObjectURL(url);
  }, []);

  const handleEncrypt = async () => {
    if (!selectedFile || !password.trim()) {
      setError('Please select a file and enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
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

      const encrypted = await encryptImage(selectedFile, password);
      
      clearInterval(progressInterval);
      setProgress(100);
      setEncryptedData(encrypted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!encryptedData || !selectedFile) return;

    const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFile.name.split('.')[0]}.cryptic`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPassword('');
    setEncryptedData(null);
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
        <div className="bg-emerald-500 p-3 rounded-xl">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Encrypt Images</h2>
          <p className="text-white/60">Secure your images with AES-256 encryption</p>
        </div>
      </div>

      {!selectedFile ? (
        <FileDropZone onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="space-y-6">
          {/* File Preview */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start space-x-4">
              {previewUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl border border-white/20"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">{selectedFile.name}</h3>
                <div className="text-sm text-white/60 space-y-1">
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Type: {selectedFile.type}</p>
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

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Encryption Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password (min 8 characters)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
            <p className="text-xs text-white/50">
              Use a strong password with letters, numbers, and symbols for maximum security
            </p>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <ProgressBar progress={progress} label="Encrypting image..." />
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {encryptedData && (
            <div className="flex items-center space-x-2 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-200">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Image encrypted successfully! Ready for download.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {!encryptedData ? (
              <button
                onClick={handleEncrypt}
                disabled={isProcessing || !password.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Lock className="w-5 h-5" />
                <span>{isProcessing ? 'Encrypting...' : 'Encrypt Image'}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  <Download className="w-5 h-5" />
                  <span>Download .cryptic File</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                >
                  Encrypt Another
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EncryptSection;