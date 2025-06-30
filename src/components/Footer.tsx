import React from 'react';
import { Shield, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 text-center">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">Your privacy is our priority</span>
        </div>
        
        <p className="text-white/60 mb-6 max-w-2xl mx-auto">
          All encryption and decryption happens locally in your browser. 
          Your files and passwords never leave your device.
        </p>
        
        <div className="flex justify-center items-center space-x-1 text-white/50">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-400" />
          <span>for security and privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;