import React, { useState, useMemo } from 'react';
import { LogEntry, TabType, LanguageType } from '../types';
import { SYSTEM_LOG_ENTRIES } from '../data';
import { TRANSLATIONS } from '../App';
import { motion } from 'motion/react';
import { Timer, Radio, HelpCircle, ArrowRight } from 'lucide-react';

interface BlogViewProps {
  key?: string;
  setActiveTab: (tab: TabType) => void;
  setSelectedPostId: (id: string) => void;
  language: LanguageType;
}

type TagType = 'ALL_POSTS' | 'SECURITY' | 'PRIVACY' | 'TOR_NETWORK' | 'CRYPTOGRAPHY';

export default function BlogView({ setActiveTab, setSelectedPostId, language }: BlogViewProps) {
  const t = TRANSLATIONS[language];
  const [selectedTag, setSelectedTag] = useState<TagType>('ALL_POSTS');
  const [recordsCount, setRecordsCount] = useState(3); // Handles simulated 'LOAD_MORE_RECORDS' pagination state

  // Tags item configurations with correct mockup count numbers
  const tagsConfig: { id: TagType; label: string; count: string }[] = [
    { id: 'ALL_POSTS', label: 'ALL_POSTS', count: '12' },
    { id: 'SECURITY', label: 'SECURITY', count: '04' },
    { id: 'PRIVACY', label: 'PRIVACY', count: '03' },
    { id: 'TOR_NETWORK', label: 'TOR_NETWORK', count: '02' },
    { id: 'CRYPTOGRAPHY', label: 'CRYPTOGRAPHY', count: '03' },
  ];

  // Dynamically filter blog post entries based on side tag selection
  const filteredLogs = useMemo(() => {
    if (selectedTag === 'ALL_POSTS') {
      return SYSTEM_LOG_ENTRIES;
    }
    return SYSTEM_LOG_ENTRIES.filter(log => log.tag === selectedTag);
  }, [selectedTag]);

  // Handle paginate action
  const handleLoadMore = () => {
    if (recordsCount < filteredLogs.length) {
      setRecordsCount(prev => prev + 1);
    } else {
      // Just restart or cycle for nice preview interaction
      setRecordsCount(3);
    }
  };

  const handleReadLog = (blogPostId?: string) => {
    if (blogPostId) {
      setSelectedPostId(blogPostId);
      setActiveTab('blog-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-12 pt-8"
      id="blog-index-view-parent"
    >
      
      {/* Blog layouts with Sidebar on the left, posts on the right */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12" id="blog-grid-root">
        
        {/* LOG FILTER TAGS: Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1" id="filter-sidebar">
          <div className="sticky top-24 p-6 border border-primary/20 bg-[#1c1b1b] rounded-none" id="sidebar-filter-panel">
            
            <h2 className="font-mono text-xs text-primary uppercase tracking-widest mb-6 font-bold">
              {t.filterTags}
            </h2>

            {/* Checkbox look selection array */}
            <div className="flex flex-row flex-wrap lg:flex-col gap-3" id="tags-selector-buttons">
              {tagsConfig.map(tag => {
                const isActive = selectedTag === tag.id;
                const isAllPosts = tag.id === 'ALL_POSTS';
                const labelText = isAllPosts ? t.allPosts : tag.id;

                return (
                  <button
                    key={tag.id}
                    id={`filter-tag-${tag.id}`}
                    onClick={() => {
                      setSelectedTag(tag.id);
                      setRecordsCount(3); // Reset pagination on filter change
                    }}
                    className={`flex items-center justify-between gap-4 px-3 py-2 cursor-pointer transition-all duration-200 font-mono text-xs text-left grow lg:grow-0 ${
                      isActive 
                        ? 'bg-secondary/15 border border-secondary text-secondary glow-secondary' 
                        : 'border border-primary/10 text-on-surface-variant hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    <span>
                      [{isActive ? 'X' : ' '}] {labelText}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-secondary/70' : 'opacity-40'}`}>
                      {tag.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active session link diagnostics */}
            <div className="mt-10 pt-8 border-t border-primary/10 space-y-3" id="connection-status-module">
              <div className="flex items-center gap-2" id="conn-active-indicator">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(100,224,96,0.8)] animate-pulse"></span>
                <span className="font-mono text-[11px] text-secondary uppercase font-semibold">
                  {t.connectionActive}
                </span>
              </div>
              <p className="font-mono text-[10px] text-on-surface-variant/60 break-all" id="conn-node-name">
                {t.nodeLabel}: <span className="text-primary select-all">hiddenservice_v3.onion</span>
              </p>
            </div>

          </div>
        </aside>

        {/* LOG SYSTEM LEDGER: List */}
        <div className="flex-grow order-1 lg:order-2 space-y-12" id="blog-logs-ledger-parent">
          
          <header className="space-y-2" id="blog-header-box">
            <h1 className="font-mono text-3xl sm:text-4xl font-bold text-on-surface tracking-tight uppercase" id="blog-title">
              System_Logs
            </h1>
            <p className="font-sans text-base text-on-surface-variant opacity-85" id="blog-subtitle">
              Dispatches from the frontlines of digital sovereignty and cryptographic exploration.
            </p>
          </header>

          {/* List dispatches */}
          <div className="space-y-6" id="logs-cards-envelope">
            {filteredLogs.slice(0, recordsCount).map(log => {
              const readTimeStr = language === 'en' ? log.readTime : log.readTimeEs;
              const descStr = language === 'en' ? log.description : log.descriptionEs;

              return (
                <article 
                  id={`log-row-${log.id}`}
                  key={log.id}
                  className="group relative bg-[#0e0e0e] border border-primary/20 p-6 sm:p-8 hover:border-secondary transition-all duration-300 rounded-none cursor-pointer"
                  onClick={() => handleReadLog(log.blogPostId)}
                >
                  
                  {/* Ledger card metrics header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5" id={`log-row-meta-${log.id}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-secondary py-0.5 px-2 bg-secondary/10 border border-secondary/20 font-bold uppercase tracking-widest">
                        {log.tag}
                      </span>
                      <span className="font-mono text-[11px] text-on-surface-variant/50">
                        {log.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant/40" id={`log-row-timer-${log.id}`}>
                      <Timer className="w-3.5 h-3.5" />
                      <span>{readTimeStr}</span>
                    </div>
                  </div>

                  {/* Title command format */}
                  <div className="block mb-4" id={`log-row-command-link-${log.id}`}>
                    <h3 className="font-mono text-lg sm:text-xl text-primary group-hover:text-secondary group-hover:glow-secondary transition-colors duration-200">
                      &gt; {log.command}
                      <span className="w-1.5 h-4 inline-block bg-primary/20 group-hover:bg-secondary ml-1 animate-pulse"></span>
                    </h3>
                  </div>

                  {/* Context sentence text */}
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6 opacity-90 max-w-3xl">
                    {descStr}
                  </p>

                  {/* Action row footer */}
                  <div className="flex items-center justify-between" id={`log-row-footer-${log.id}`}>
                    <button 
                      id={`log-row-init-btn-${log.id}`}
                      className="font-mono text-xs text-secondary border-b border-transparent hover:border-secondary pb-0.5 uppercase tracking-widest font-semibold transition-all cursor-pointer"
                    >
                      Initialize Read &gt;&gt;
                    </button>
                    
                    {/* Visual spacer indicators */}
                    <div className="flex gap-1.5 pointer-events-none opacity-50" id={`log-row-dots-decor-${log.id}`}>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                    </div>
                  </div>

                </article>
              );
            })}

            {/* Empty filter fallback */}
            {filteredLogs.length === 0 && (
              <div className="text-center py-16 border border-dashed border-primary/20 space-y-3" id="filters-empty-fallback">
                <HelpCircle className="w-8 h-8 text-primary/40 mx-auto" />
                <p className="font-mono text-xs text-on-surface-variant opacity-50">
                  [REDUX] NO RECORDS RETRIEVED // TAG IS STALE
                </p>
              </div>
            )}
          </div>

          {/* Catalog pagination line triggers */}
          {filteredLogs.length > 3 && (
            <div className="pt-8 flex items-center gap-4" id="pagination-panel">
              <button
                id="load-more-records-btn"
                onClick={handleLoadMore}
                className="px-6 py-3 bg-secondary text-on-secondary font-mono font-bold text-xs uppercase tracking-widest hover:scale-102 hover:shadow-[0_0_15px_rgba(100,224,96,0.4)] active:scale-95 transition-all duration-150 cursor-pointer"
              >
                {t.loadMore}
              </button>
              
              <div className="flex-grow border-t border-primary/10"></div>
              
              <span className="font-mono text-xs text-on-surface-variant opacity-40">
                {t.pageOf} 01 / 04
              </span>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}
