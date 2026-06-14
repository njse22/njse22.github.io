import React from 'react';
import { LanguageType } from '../types';
import { TRANSLATIONS } from '../App';
import { ShieldAlert } from 'lucide-react';

interface FooterProps {
  language: LanguageType;
}

export default function Footer({ language }: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="border-t border-primary/20 bg-[#0e0e0e] mt-auto py-8 font-mono text-xs" id="main-footer-wrapper">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-6" id="footer-inner-content">
        
        {/* Upper footer area */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6" id="footer-upper-grid">
          {/* User information badge */}
          <div className="flex flex-col gap-2 items-center md:items-start" id="user-info-badge-container">
            <div className="flex items-center gap-2 text-primary" id="footer-user-label">
              <ShieldAlert className="text-secondary text-sm w-4 h-4 animate-pulse" />
              <span>{t.userLabel}: <span className="text-secondary select-all">njse22@telematics</span></span>
            </div>
            <span className="text-on-surface-variant opacity-50 text-[10px]" id="footer-station-label">
              {t.station}: TERMINAL_09 // UPTIME: 342:12:04
            </span>
          </div>

          {/* Uptime and connection state */}
          <div className="flex items-center gap-4" id="uptime-status-group">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#64e060] animate-pulse"></span>
              <span className="text-secondary select-none">{t.systemOnline}</span>
            </div>
            <div className="h-4 w-[1px] bg-primary/20 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-secondary opacity-60 hover:opacity-100" id="uptime-percent">
              <span>{t.uptime}: 99.98%</span>
            </div>
          </div>
        </div>

        {/* Legal and system warning credits */}
        <div className="text-center pt-4 border-t border-primary/5" id="footer-credit-line-parent">
          <p className="text-[10px] text-on-surface-variant opacity-30 uppercase tracking-[0.25em]">
            © 2026 - BUILT FOR THE DECENTRALIZED WEB - NO RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
