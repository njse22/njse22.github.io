import React, { useState, useMemo } from 'react';
import { TabType, LanguageType } from '../types';
import { getBlogPosts } from '../lib/posts';
import { TRANSLATIONS } from '../App';
import { motion } from 'motion/react';
import { Timer, ArrowRight, HelpCircle } from 'lucide-react';

interface BlogViewProps {
  key?: string;
  setActiveTab: (tab: TabType) => void;
  setSelectedPostId: (id: string) => void;
  language: LanguageType;
}

export default function BlogView({ setActiveTab, setSelectedPostId, language }: BlogViewProps) {
  const t = TRANSLATIONS[language];
  const posts = getBlogPosts();
  const [selectedTag, setSelectedTag] = useState<string>('ALL_POSTS');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === 'ALL_POSTS') return posts;
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [selectedTag, posts]);

  const handleReadPost = (postId: string) => {
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
      className="space-y-12 pt-8"
      id="blog-index-view-parent"
    >
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12" id="blog-grid-root">
        
        {/* TAG FILTERS: Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1" id="filter-sidebar">
          <div className="sticky top-24 p-6 border border-primary/20 bg-[#1c1b1b] rounded-none" id="sidebar-filter-panel">
            
            <h2 className="font-mono text-xs text-primary uppercase tracking-widest mb-6 font-bold">
              {t.filterTags}
            </h2>

            <div className="flex flex-row flex-wrap lg:flex-col gap-3" id="tags-selector-buttons">
              <button
                id={`filter-tag-ALL_POSTS`}
                onClick={() => setSelectedTag('ALL_POSTS')}
                className={`flex items-center justify-between gap-4 px-3 py-2 cursor-pointer transition-all duration-200 font-mono text-xs text-left grow lg:grow-0 ${
                  selectedTag === 'ALL_POSTS'
                    ? 'bg-secondary/15 border border-secondary text-secondary glow-secondary'
                    : 'border border-primary/10 text-on-surface-variant hover:border-secondary hover:text-secondary'
                }`}
              >
                <span>[{selectedTag === 'ALL_POSTS' ? 'X' : ' '}] {t.allPosts}</span>
                <span className={`text-[10px] ${selectedTag === 'ALL_POSTS' ? 'text-secondary/70' : 'opacity-40'}`}>
                  {String(posts.length).padStart(2, '0')}
                </span>
              </button>

              {allTags.map(tag => {
                const tagCount = posts.filter(p => p.tags.includes(tag)).length;
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    id={`filter-tag-${tag}`}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex items-center justify-between gap-4 px-3 py-2 cursor-pointer transition-all duration-200 font-mono text-xs text-left grow lg:grow-0 ${
                      isActive
                        ? 'bg-secondary/15 border border-secondary text-secondary glow-secondary'
                        : 'border border-primary/10 text-on-surface-variant hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    <span>[{isActive ? 'X' : ' '}] {tag}</span>
                    <span className={`text-[10px] ${isActive ? 'text-secondary/70' : 'opacity-40'}`}>
                      {String(tagCount).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-primary/10 space-y-3" id="connection-status-module">
              <div className="flex items-center gap-2" id="conn-active-indicator">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(100,224,96,0.8)] animate-pulse"></span>
                <span className="font-mono text-[11px] text-secondary uppercase font-semibold">
                  {t.connectionActive}
                </span>
              </div>
              <p className="font-mono text-[10px] text-on-surface-variant/60 break-all" id="conn-node-name">
                {t.nodeLabel}: <span className="text-primary select-all">njse22.github.io</span>
              </p>
            </div>

          </div>
        </aside>

        {/* BLOG POSTS LIST */}
        <div className="flex-grow order-1 lg:order-2 space-y-12" id="blog-logs-ledger-parent">
          
          <header className="space-y-2" id="blog-header-box">
            <h1 className="font-mono text-3xl sm:text-4xl font-bold text-on-surface tracking-tight uppercase" id="blog-title">
              Blog
            </h1>
            <p className="font-sans text-base text-on-surface-variant opacity-85" id="blog-subtitle">
              Posts about networking, automation, and telematics engineering.
            </p>
          </header>

          <div className="space-y-6" id="logs-cards-envelope">
            {filteredPosts.map(post => {
              const titleStr = language === 'en' ? post.title : post.titleEs;
              const summaryStr = language === 'en' ? post.summary : post.summaryEs;
              const readTimeStr = language === 'en' ? post.readTime : post.readTimeEs;

              return (
                <article 
                  id={`post-row-${post.id}`}
                  key={post.id}
                  className="group relative bg-[#0e0e0e] border border-primary/20 p-6 sm:p-8 hover:border-secondary transition-all duration-300 rounded-none cursor-pointer"
                  onClick={() => handleReadPost(post.id)}
                >
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5" id={`post-row-meta-${post.id}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      {post.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] text-secondary py-0.5 px-2 bg-secondary/10 border border-secondary/20 font-bold uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                      <span className="font-mono text-[11px] text-on-surface-variant/50">
                        {post.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant/40" id={`post-row-timer-${post.id}`}>
                      <Timer className="w-3.5 h-3.5" />
                      <span>{readTimeStr}</span>
                    </div>
                  </div>

                  <div className="block mb-4" id={`post-row-command-link-${post.id}`}>
                    <h3 className="font-mono text-lg sm:text-xl text-primary group-hover:text-secondary group-hover:glow-secondary transition-colors duration-200">
                      &gt; {post.id}
                      <span className="w-1.5 h-4 inline-block bg-primary/20 group-hover:bg-secondary ml-1 animate-pulse"></span>
                    </h3>
                  </div>

                  <h4 className="font-mono text-sm text-on-surface mb-2 font-semibold">
                    {titleStr}
                  </h4>

                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6 opacity-90 max-w-3xl">
                    {summaryStr}
                  </p>

                  <div className="flex items-center justify-between" id={`post-row-footer-${post.id}`}>
                    <button 
                      id={`post-row-init-btn-${post.id}`}
                      className="font-mono text-xs text-secondary border-b border-transparent hover:border-secondary pb-0.5 uppercase tracking-widest font-semibold transition-all cursor-pointer"
                    >
                      Read Post &gt;&gt;
                    </button>
                    
                    <div className="flex gap-1.5 pointer-events-none opacity-50" id={`post-row-dots-decor-${post.id}`}>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                      <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                    </div>
                  </div>

                </article>
              );
            })}

            {/* Empty filter fallback */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 border border-dashed border-primary/20 space-y-3" id="filters-empty-fallback">
                <HelpCircle className="w-8 h-8 text-primary/40 mx-auto" />
                <p className="font-mono text-xs text-on-surface-variant opacity-50">
                  [REDUX] NO RECORDS RETRIEVED // TAG IS STALE
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </motion.div>
  );
}
