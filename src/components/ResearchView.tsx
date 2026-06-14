import React, { useState } from 'react';
import { Publication, TabType, LanguageType } from '../types';
import { PUBLICATIONS } from '../data';
import { TRANSLATIONS } from '../App';
import { motion } from 'motion/react';
import { FolderArchive, Award, Key, FileCode, Check, Send, Download, Terminal, Shield } from 'lucide-react';

interface ResearchViewProps {
  key?: string;
  language: LanguageType;
}

export default function ResearchView({ language }: ResearchViewProps) {
  const t = TRANSLATIONS[language];
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  
  // SECURE CONTACT RELAY: interactive state
  const [contactMsg, setContactMsg] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  // Publication Row hovering text scramble effect
  const [titleTexts, setTitleTexts] = useState<{ [key: string]: string }>(() => {
    const list: { [key: string]: string } = {};
    PUBLICATIONS.forEach(pub => {
      list[pub.id] = language === 'en' ? pub.title : pub.titleEs;
    });
    return list;
  });

  const handleMouseEnterPubTitle = (id: string, original: string) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setTitleTexts(prev => ({
        ...prev,
        [id]: prev[id].split('').map((letter, index) => {
          if (index < iterations) {
            return original[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join('')
      }));
      
      if (iterations >= original.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  };

  const handleCopyFingerprint = () => {
    const fnStr = 'EF82 3121 99A2 0184 62D4 C7E1 0022 4FF3 92B1 8E30';
    navigator.clipboard.writeText(fnStr);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2500);
  };

  const handleDownloadKey = () => {
    // Dynamically downlad a `.asc` GPG key file for maximum premium feeling!
    const keyContent = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2.4.0 (GNU/Linux)

mQINBFmNfBEBEADcv9Gg4pS4m7x6L8Y7HPr27O5kY/9s2D7Z8A9F3hJ6b2v9N3u2
EF82312199A2018462D4C7E100224FF392B18E30=...
-----END PGP PUBLIC KEY BLOCK-----`;
    const element = document.createElement('a');
    const file = new Blob([keyContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "anonymous_gpg_public.asc";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendContactMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;

    setSendingMessage(true);
    const textMsg = contactMsg;
    setContactMsg('');

    // Progressive terminal logging output simulation! Truly immersive and robust
    const logs = [
      `$ echo "${textMsg.substring(0, 20)}..." > secure_relay.pipe`,
      `[RELAY_DAEMON] Initializing secure handshake...`,
      `[KDF] Deriving Ephemeral ECDH key agreement...`,
      `[Symmetric_AES] Enveloping payload with AES-GCM-256...`,
      `[TOR] Multiplexing cells via circuit HOP_1 -> HOP_2 -> HOP_3...`,
      `[RELAY_DAEMON] Transmission successful! Payload ID: #0x${Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase()}`
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setTerminalOutput(prev => [...prev, logs[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setSendingMessage(false);
      }
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-16 pt-8"
      id="research-view-parent"
    >
      
      {/* HERO TITLE SECTION */}
      <section className="space-y-6" id="research-hero-banner">
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-6 py-2" id="research-title-container">
          <h1 className="font-mono text-3xl sm:text-4xl font-extrabold text-primary uppercase tracking-tight">
            Research_&_Publications
          </h1>
          <p className="font-mono text-xs text-on-surface-variant opacity-70">
            {t.directory}: /home/njse22/archive/papers
          </p>
        </div>

        {/* System metrics badges */}
	{/*<div className="flex flex-wrap gap-4 pt-4" id="research-metrics-badges">
          <div className="bg-[#201f1f] p-4 border border-primary/25 flex items-center gap-3 select-none" id="status-encrypted-badge">
            <Shield className="text-secondary w-5 h-5 animate-pulse" />
            <span className="font-mono text-xs">
              {t.systemStatus}: <span className="text-secondary glow-secondary font-bold">{t.encryptedUplink}</span>
            </span>
          </div>

          <div className="bg-[#201f1f] p-4 border border-primary/25 flex items-center gap-3 select-none" id="total-records-badge">
            <FolderArchive className="text-primary w-5 h-5" />
            <span className="font-mono text-xs">
              {t.totalRecords}: <span className="text-[#e9b3ff] font-bold">128_KIB</span>
            </span>
          </div>
        </div>*/}
      </section>

      {/* PUBLICATION LIST TABLE (ls -l Linux Shell terminal representation) */}
      <section className="w-full overflow-x-auto" id="publications-ledger-module">
        <div className="min-w-[800px] space-y-4" id="publications-inner-table">
          
          {/* List Headers */}
          <div className="grid grid-cols-[1fr_100px_180px_220px] gap-6 px-4 py-3 bg-primary/10 border-b border-primary/30 select-none" id="pub-table-header-row">
            <span className="font-mono text-xs text-primary uppercase font-bold">{t.filenameTitle}</span>
            <span className="font-mono text-xs text-primary uppercase text-center font-bold">{t.year}</span>
            <span className="font-mono text-xs text-primary uppercase font-bold">{t.venue}</span>
            <span className="font-mono text-xs text-primary uppercase text-right font-bold">{t.accessPerms}</span>
          </div>

          {/* List Rows */}
          {PUBLICATIONS.map(pub => {
            const displayTitle = titleTexts[pub.id] || (language === 'en' ? pub.title : pub.titleEs);
            const originalTitle = language === 'en' ? pub.title : pub.titleEs;

            return (
              <div 
                id={`pub-row-${pub.id}`}
                key={pub.id}
                className="group grid grid-cols-[1fr_100px_180px_220px] gap-6 px-4 py-6 border border-primary/10 hover:border-secondary bg-[#1c1b1b] transition-all duration-300 items-center rounded-none"
              >
                {/* Filename with simulated permissions */}
                <div className="flex flex-col gap-1" id={`pub-row-details-${pub.id}`}>
                  <span className="font-mono text-xs text-secondary opacity-65 select-all">
                    {pub.permissions}
                  </span>
                  
                  <h3 
                    id={`pub-row-title-${pub.id}`}
                    onMouseEnter={() => handleMouseEnterPubTitle(pub.id, originalTitle)}
                    className="font-mono text-base font-semibold text-on-surface group-hover:text-primary transition-colors cursor-help leading-snug tracking-tight"
                  >
                    {displayTitle}
                  </h3>
                  
                  <p className="font-sans text-xs text-on-surface-variant opacity-75">
                    {pub.authors}
                  </p>
                </div>

                {/* Year Badge */}
                <div className="flex items-center justify-center" id={`pub-row-year-holder-${pub.id}`}>
                  <span className="font-mono text-xs text-on-surface-variant bg-[#353534] px-2.5 py-1 select-all font-semibold rounded-none">
                    {pub.year}
                  </span>
                </div>

                {/* Venue details */}
                <div className="flex items-center select-all" id={`pub-row-venue-holder-${pub.id}`}>
                  <span className="font-mono text-xs text-on-surface flex items-center gap-1.5 font-semibold">
                    <Award className="text-primary w-4 h-4" />
                    {pub.venue}
                  </span>
                </div>

                {/* Action button download relays */}
                <div className="flex justify-end gap-2" id={`pub-row-actions-${pub.id}`}>
                  {pub.pdfAvailable && (
                    <a
                      id={`pub-pdf-btn-${pub.id}`}
                      href="#download"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`[ACCESS_PERM_OK] Dowloading file: "${originalTitle.replace(/ /g, '_')}.pdf"`);
                      }}
                      className="px-2.5 py-1 bg-primary text-on-primary font-mono text-[10px] hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer flex items-center gap-1 font-bold"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </a>
                  )}
                  {pub.srcAvailable && (
                    <a
                      id={`pub-src-btn-${pub.id}`}
                      href="#source"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`[ACCESS_PERM_OK] Fetching source code repository for "${pub.title}"`);
                      }}
                      className="px-2.5 py-1 border border-primary/50 text-primary font-mono text-[10px] hover:border-secondary hover:text-secondary transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <FileCode className="w-3 h-3" /> SRC
                    </a>
                  )}
                  {pub.bibAvailable && (
                    <button
                      id={`pub-bib-btn-${pub.id}`}
                      onClick={() => {
                        alert(`@article{${pub.id},\n  title={${pub.title}},\n  author={${pub.authors}},\n  year={${pub.year}},\n  journal={${pub.venue}}\n}`);
                      }}
                      className="px-2.5 py-1 border border-primary/50 text-primary font-mono text-[10px] hover:border-secondary hover:text-secondary transition-colors cursor-pointer flex items-center gap-1"
                    >
                      BIB
                    </button>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* AUXILIARY PANELS (GPG and CONTACT RESEARCH) */}
      <aside className="grid md:grid-cols-2 gap-8 my-8" id="research-supplemental-aside">
        
        {/* PGP KEY BOX */}
	{/*
        <div className="bg-[#0e0e0e] border border-primary/20 p-6 sm:p-8 relative overflow-hidden group rounded-none" id="aside-gpg-fngerprint-box">
          <div className="relative z-10 space-y-6" id="gpg-box-inner">
            <h4 className="font-mono text-lg font-bold text-primary uppercase select-none flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" /> {t.gpgTitle}
            </h4>
            
            <p 
              onClick={handleCopyFingerprint}
              className="font-mono text-xs text-on-surface-variant tracking-wider bg-[#131113] p-4 border-l-2 border-secondary select-all break-all cursor-copy hover:text-secondary hover:border-primary transition-all leading-relaxed"
              title="Copy GPG Key Fingerprint to clipboard"
            >
              EF82 3121 99A2 0184 62D4 C7E1 0022 4FF3 92B1 8E30
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start pt-2" id="gpg-actions">
              <button 
                id="gpg-copy-fingerprint-btn"
                onClick={handleCopyFingerprint}
                className="flex items-center gap-1.5 text-secondary font-mono text-xs hover:underline cursor-pointer font-bold select-none"
              >
                {copiedFingerprint ? (
                  <>
                    <Check className="w-4 h-4 text-secondary" />
                    <span>Fingerprint copied!</span>
                  </>
                ) : (
                  <span>Copy Fingerprint</span>
                )}
              </button>

              <button 
                id="gpg-download-key-btn"
                onClick={handleDownloadKey}
                className="flex items-center gap-1.5 text-primary font-mono text-xs hover:underline cursor-pointer font-bold select-none"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>{t.downloadKey}</span>
              </button>
            </div>
          </div>


          <div className="absolute -right-10 -bottom-10 opacity-[0.02] transform rotate-12 group-hover:rotate-6 group-hover:scale-105 pointer-events-none transition-transform duration-700" id="gpg-decor-shield">
            <Shield className="w-48 h-48 text-[#e9b3ff]" />
          </div>
        </div> */}

        {/* SECURE RELAY FORM */}
	{/*
        <div className="bg-[#0e0e0e] border border-primary/20 p-6 sm:p-8 rounded-none flex flex-col justify-between space-y-6" id="aside-secure-contact-box">
          
          <div className="space-y-4" id="secure-contact-headers">
            <h4 className="font-mono text-lg font-bold text-primary uppercase select-none flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" /> {t.contactTitle}
            </h4>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed opacity-90">
              {t.contactText}
            </p>
          </div>

          <div className="space-y-4" id="secure-contact-interaction">

            {terminalOutput.length > 0 && (
              <div className="p-3.5 bg-[#131313] border border-secondary/30 text-[10px] sm:text-xs font-mono text-[#64e060]/90 space-y-1.5 overflow-hidden" id="contact-terminal-outputs">
                {terminalOutput.map((logLine, logIdx) => (
                  <div key={logIdx} className="break-all select-all leading-tight">
                    {logLine}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendContactMessage} className="relative group flex items-center" id="secure-contact-form">
              <input 
                id="contact-message-input"
                type="text"
                required
                disabled={sendingMessage}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder={sendingMessage ? "Transmitting..." : "Your message..._"}
                className="w-full bg-transparent border-0 border-b border-primary/50 text-on-surface focus:text-secondary placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-0 focus:border-secondary transition-colors font-mono text-sm pb-2 text-left cursor-text"
              />
              <button 
                id="contact-submit-btn"
                type="submit" 
                disabled={sendingMessage || !contactMsg.trim()}
                className="absolute right-0 bottom-1 hover:text-secondary text-primary/80 disabled:opacity-30 cursor-pointer p-1 transition-all"
                title="Send secure message packet"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
	*/}

      </aside>

    </motion.div>
  );
}
