import React from 'react';
import { TabType, LanguageType } from '../types';
import { getBlogPosts } from '../lib/posts';
import { TRANSLATIONS } from '../App';
import { motion } from 'motion/react';
import { Github, KeyRound, Radio, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  key?: string;
  setActiveTab: (tab: TabType) => void;
  setSelectedPostId: (id: string) => void;
  language: LanguageType;
}

export default function HomeView({ setActiveTab, setSelectedPostId, language }: HomeViewProps) {
  const t = TRANSLATIONS[language];

  // Filter posts for Home feed (take first 3 as Latest Intel)
  const latestIntel = getBlogPosts().slice(0, 3);

  const handleCardClick = (postId: string) => {
    setSelectedPostId(postId);
    setActiveTab('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-20 pt-8"
      id="home-view-animation-wrapper"
    >
      
      {/* PROFESSIONAL PROFILE: Terminal Console Look */}
      <section className="w-full" id="whoami-terminal-section">
        <div className="border border-primary/30 rounded-lg overflow-hidden phosphor-glow bg-[#18101c]/80 backdrop-blur-md">
          
          {/* Terminal Window Top Bar */}
          <div className="bg-[#353534] px-4 py-2.5 flex justify-between items-center border-b border-primary/30" id="terminal-decor-top">
            <div className="flex gap-2">
              <div id="term-dot-red" className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"></div>
              <div id="term-dot-yellow" className="w-3 h-3 rounded-full bg-[#e9b3ff]/50 hover:bg-primary transition-colors"></div>
              <div id="term-dot-green" className="w-3 h-3 rounded-full bg-[#64e060]/50 hover:bg-secondary transition-colors"></div>
            </div>
            <span className="font-mono text-xs text-on-surface-variant opacity-70" id="terminal-session-label">
              session: anonymous@tor-exit-node
            </span>
            <div className="w-12"></div>
          </div>

          {/* Terminal Main Content Grid */}
          <div className="p-6 sm:p-8 md:p-12 grid md:grid-cols-12 gap-8 md:gap-12" id="terminal-inner-panel">
            
            {/* Biography on Left */}
            <div className="md:col-span-8 space-y-6 flex flex-col justify-between" id="terminal-left-content">
              <div className="space-y-4">
                <h1 className="font-mono text-3xl sm:text-4xl font-bold text-primary uppercase tracking-tight flex items-center gap-1.5" id="whoami-shell-command">
                  <span className="text-secondary select-none">$</span> {t.whoami}
                </h1>
                
                <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed opacity-95" id="whoami-long-bio">
                  {language === 'en' 
                    ? "Independent privacy researcher and digital cartographer. Currently documenting the erosion of anonymity in decentralized networks and building tools for sovereign communication. Based in the metadata-less void."
                    : "Investigador independiente de privacidad y cartógrafo digital. Actualmente documento la erosión de la anonimidad en redes descentralizadas y construyo herramientas para la comunicación soberana. Ubicado en el vacío libre de metadatos."}
                </p>
              </div>

              <div className="space-y-5 pt-4" id="identity-links-and-statuses">
                {/* Active Indicator Status */}
                <div className="flex items-center gap-3 select-none" id="searching-status-badge">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#64e060]"></span>
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
                    {t.statusLabel}: {t.statusTruth}
                  </span>
                </div>

                {/* Cyberpunk Action Buttons */}
                <div className="flex flex-wrap gap-3" id="social-terminal-buttons-container">
                  <a 
                    id="terminal-link-github"
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary/40 text-primary font-mono text-xs hover:bg-primary/10 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <button 
                    id="terminal-link-pgp"
                    onClick={() => setActiveTab('research')}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary/40 text-primary font-mono text-xs hover:bg-primary/10 transition-all cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>PGP Key</span>
                  </button>
                  <a 
                    id="terminal-link-mastodon"
                    href="https://mastodon.social" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary/40 text-primary font-mono text-xs hover:bg-primary/10 transition-all cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Mastodon</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Avatar Graphics on Right */}
            <div className="md:col-span-4 flex flex-col items-center justify-center pt-4 md:pt-0" id="terminal-right-avatar">
              <div className="relative group select-none">
                {/* Outer Glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-55 transition duration-1000"></div>
                
                {/* Hooded Figure Portrait */}
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full border-2 border-primary/30 p-1 bg-[#131313] overflow-hidden">
                  <img 
                    id="cyberpunk-avatar-photo"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdgiLqtYl7PlN2H-sC7jodptewpY7_R53SlEC1SzqAY_vGU1zKhbVCtcQ_eusF0vm_SXZyg2RTFV-f3I1rBYVupcc0_9pTcy1_UO1JeCCRxoZ_yTYYnW_ETaez_N5ursIKnYfIZkcNijCzdr1_DWeIvypKck90Op6c3GJJWFJjB1s947Eivu5_heISS5jvUyNOcpZmllahZ3o6KAfMhFw-G4n67pVODd0eI5SUtFBVKr2ttX8gZd0S8vpudbT4i_UasdtC1ZrJo7A" 
                    alt="Cyberpunk Hooded Portrait" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* User Anonymous Signature Unique Hex Code */}
              <div className="mt-4 text-center select-all cursor-help" title="Cryptographical signature unique ID">
                <span className="font-mono text-[11px] text-on-surface-variant/60 tracking-wider">
                  ID: #0x8F22A17E4CDF0022
                </span>
              </div>
            </div>

          </div>

          {/* Terminal Console Log Footer */}
          <div className="bg-[#0e0e0e] px-6 py-2.5 border-t border-primary/10 select-none flex items-center justify-between" id="terminal-decor-bottom">
            <p className="font-mono text-xs text-secondary/70 cursor-blink flex items-center gap-1">
              <span>Last login: Fri Oct 13 03:22:11 on ttys001</span>
            </p>
            <span className="hidden sm:block text-[10px] text-on-surface-variant/30 font-mono tracking-widest uppercase font-bold">
              SYS_LEVEL_DECRYPTED
            </span>
          </div>

        </div>
      </section>

      {/* LATEST INTEL: Grid representing Blog posts catalog */}
      <section className="space-y-8" id="latest-intel-section">
        <div className="flex items-center justify-between border-b border-primary/20 pb-4" id="latest-intel-header">
          <h2 className="font-mono text-2xl font-bold text-primary flex items-center gap-3 tracking-tight">
            <span className="text-secondary select-none">#</span> {t.latestIntel}
          </h2>
          
          <button 
            id="view-all-logs-btn"
            onClick={() => setActiveTab('blog')}
            className="font-mono text-xs text-on-surface-variant hover:text-secondary hover:glow-secondary transition-all cursor-pointer underline decoration-primary/30 underline-offset-4"
          >
            {t.viewAllLogs}
          </button>
        </div>

        {/* Thumbnail grid cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" id="latest-intel-cards-grid">
          
          {latestIntel.map((post, idx) => {
            const dateStr = post.date;
            const readTimeStr = language === 'en' ? post.readTime : post.readTimeEs;
            const titleStr = language === 'en' ? post.title : post.titleEs;
            const summaryStr = language === 'en' ? post.summary : post.summaryEs;

            // Distinct images based on indices (Zero-Knowledge, Router, Abstract visualization)
            const imgUrls = [
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAe1k8Ei3H4uSCjtBOxg8MH-7f9bv3TfLUABkVtY9TgyRQH_ln8tTThYXzoS4Ti0FmaFavhisM0N_iVTvIAocBxIS0NkNqZ1tc4Ye4dBBpCc60Z2eL8lSYQxD4Ioj28qy43gLqJjxVW9GyYE04DFZkF2-_dQGccglPD7P3zNP3WFgSPW28821q-m1xR7dvCFVhuyO0Y_QH7wFfkRHBo_r5vzJI9NQuuRoDf1qiOqE3UbDFl75Rmp40Rc6gXUwO7-Z6kvFsxJVVEKvg", // Post 1
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBTORvCslA2U5FgNOFDYcc1iVdRvSjt4K1umT_7eLqxzRpsYMnINRfjKFI4hQeiQc5IfOEZCx_sQcuczKTKOKorhxRkUceJRcLXqlznTJBLpHwXX7RIjdPtkFvk4LYfn1u2eX3VPjUoYRbuEJ9MCB3MQCU-J9OSmCq0he8a-qYbdKb8TjdFKt4ZTpfrilNoFx2RWvVWOUlzqkXqalw18Ej1xBJTegqO6itk_IpNNOPWArmN5TfYGtD0RtVky-VpMjIBSuQyQtDcBn0", // Post 2
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBqG1aRUWni7HpX3mQiIJtEe-sxSRy8rcZrb3Oi0nmvKZ6Y6O-qwLJHAH36Dj7OjIHUCMGBLkId-tBf_XA7h21n8qJh6OSLjLGnNBUg8bQ0nf9GW1cSYFXYXdxZv9_eKCG9SIDrUUkZ4dBkt0PO9l6G2Y_WOCbdqm90Z-wXaZMXmH2FX3QQV-mJd-9vQ2if9bto_-7AXVs3Van8MGemov5glEpQVxI-y4Sc4-8tBHi7SYOyvjSsVf_RotmYTV7aqP1Lv5NORPhzoIM"  // Post 3
            ];

            return (
              <article 
                id={`intel-card-${post.id}`}
                key={post.id} 
                onClick={() => handleCardClick(post.id)}
                className="group relative flex flex-col bg-[#131313] border border-primary/25 hover:border-secondary overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,224,96,0.15)] cursor-pointer"
              >
                {/* Thumbnail Layer */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-black" id={`intel-card-img-parent-${post.id}`}>
                  <img 
                    id={`intel-card-img-${post.id}`}
                    src={imgUrls[idx % imgUrls.length]} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between" id={`intel-card-content-${post.id}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono text-secondary/80" id={`intel-card-meta-${post.id}`}>
                      <span>[ {dateStr} ]</span>
                      <span className="opacity-80">{readTimeStr}</span>
                    </div>

                    <h3 className="font-mono text-base font-semibold text-on-surface group-hover:text-secondary transition-colors duration-200 line-clamp-2 leading-snug">
                      {titleStr}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant opacity-80 line-clamp-3 leading-relaxed">
                      {summaryStr}
                    </p>
                  </div>

                  <div className="pt-5" id={`intel-card-link-wrapper-${post.id}`}>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-secondary uppercase hover:translate-x-1 transition-transform duration-200">
                      READ_LOG <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </article>
            );
          })}

        </div>
      </section>

    </motion.div>
  );
}
