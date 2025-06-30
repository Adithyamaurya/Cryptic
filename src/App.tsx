import React, { useState } from 'react';
import { Shield, Lock, Unlock, Github } from 'lucide-react';
import Header from './components/Header';
import EncryptSection from './components/EncryptSection';
import DecryptSection from './components/DecryptSection';
import Footer from './components/Footer';

type ActiveSection = 'encrypt' | 'decrypt';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('encrypt');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Bolt.new link in top right */}
      <a 
        href="https://bolt.new/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <img 
          src="/white_circle_360x360.png" 
          alt="Bolt.new" 
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </a>

      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSection('encrypt')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === 'encrypt'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>Encrypt</span>
              </button>
              <button
                onClick={() => setActiveSection('decrypt')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === 'decrypt'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Unlock className="w-5 h-5" />
                <span>Decrypt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {activeSection === 'encrypt' ? <EncryptSection /> : <DecryptSection />}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;