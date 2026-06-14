import React, { useState } from 'react';
import { TabType, LanguageType } from '../types';
import { TRANSLATIONS } from '../App';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export default function Header({ activeTab, setActiveTab, language, setLanguage }: HeaderProps) {
  const t = TRANSLATIONS[language];
  const [scrambleText, setScrambleText] = useState('ROOT@NJSE22');

  const handleMouseEnter = () => {
    const original = 'ROOT@NJSE22';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setScrambleText(prev => 
        prev.split('').map((letter, index) => {
          if (index < iterations) {
            return original[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join('')
      );
      
      if (iterations >= original.length) {
        clearInterval(interval);
      }
      iterations += 1 / 2;
    }, 30);
  };

  const handleMouseLeave = () => {
    setScrambleText('ROOT@NJSE22');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#131313]/90 backdrop-blur-md border-b border-primary/30 h-16">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 max-w-[1140px] mx-auto h-full">
        {/* Brand Logo with dynamic terminal hover scrambling effect */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab('home')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          id="brand-logo-container"
        >
          <Terminal className="text-primary w-5 h-5 animate-pulse" />
          <span 
            className="font-mono text-lg sm:text-xl font-bold text-primary tracking-tighter uppercase sm:block"
            id="brand-scramble-title"
          >
            {scrambleText}
          </span>
        </div>

        {/* Global Navigation */}
        <nav className="flex items-center gap-4 sm:gap-8" id="main-navigation">
          <button
            id="nav-home-btn"
            onClick={() => setActiveTab('home')}
            className={`font-mono text-sm uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'home' 
                ? "text-secondary font-bold before:content-['>_']" 
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            {t.home}
          </button>
          
          <button
            id="nav-blog-btn"
            onClick={() => setActiveTab('blog')}
            className={`font-mono text-sm uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'blog' || activeTab === 'blog-detail'
                ? "text-secondary font-bold before:content-['>_']" 
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            {t.blog}
          </button>

          <button
            id="nav-research-btn"
            onClick={() => setActiveTab('research')}
            className={`font-mono text-sm uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'research'
                ? "text-secondary font-bold before:content-['>_']" 
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            {t.research}
          </button>
        </nav>

        {/* Tools and Language Toggles */}
        <div className="flex items-center gap-4 sm:gap-6" id="header-tools-panel">
          <div className="font-mono text-xs text-on-surface-variant opacity-80" id="lang-selector-parent">
            {t.langLabel}:{' '}
            <button
              id="lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`hover:text-secondary cursor-pointer ${language === 'en' ? 'text-secondary underline font-bold' : ''}`}
            >
              EN
            </button>{' '}
            |{' '}
            <button
              id="lang-es-btn"
              onClick={() => setLanguage('es')}
              className={`hover:text-secondary cursor-pointer ${language === 'es' ? 'text-secondary underline font-bold' : ''}`}
            >
              ES
            </button>
          </div>
          
          <button 
            id="terminal-pulse-btn"
            onClick={() => setActiveTab('research')}
            className="text-primary hover:text-secondary active:scale-95 transition-transform duration-100 cursor-pointer hidden xs:block"
            title="Secure shell connection"
          >
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
