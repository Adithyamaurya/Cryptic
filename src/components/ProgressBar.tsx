import React from 'react';

interface ProgressBarProps {
  progress: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{label}</span>
        <span className="text-white/60">{progress}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;