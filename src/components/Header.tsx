import React from 'react';
import { Shield, Zap, Lock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-emerald-400 to-blue-500 p-4 rounded-full">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
        Cryptic
      </h1>
      
      <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
        Military-grade AES-256 encryption for your images. Secure, fast, and completely client-side.
      </p>
      
      <div className="flex justify-center space-x-8 text-sm text-white/60">
        <div className="flex items-center space-x-2">
          <Lock className="w-4 h-4" />
          <span>AES-256 Encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Client-Side Processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Zero Data Storage</span>
        </div>
      </div>
    </div>
  );
};

export default Header;