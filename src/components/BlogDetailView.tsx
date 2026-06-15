import React, { useState } from 'react';
import { TabType, LanguageType } from '../types';
import { getBlogPosts, resolveImagePath } from '../lib/posts';
import { TRANSLATIONS } from '../App';
import { motion } from 'motion/react';
import { Folder, ArrowLeft, Timer, Heart, Share2, Check, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogDetailViewProps {
  key?: string;
  postId: string;
  setActiveTab: (tab: TabType) => void;
  language: LanguageType;
}

export default function BlogDetailView({ postId, setActiveTab, language }: BlogDetailViewProps) {
  const t = TRANSLATIONS[language];

  const posts = getBlogPosts();
  const post = posts.find(p => p.id === postId) || posts[0];

  if (!post) {
    return (
      <div className="text-center py-16 border border-dashed border-primary/20 space-y-3">
        <p className="font-mono text-xs text-on-surface-variant opacity-50">
          [404] POST NOT FOUND IN LEDGER
        </p>
      </div>
    );
  }

  const titleStr = language === 'en' ? post.title : post.titleEs;
  const readTimeStr = language === 'en' ? post.readTime : post.readTimeEs;
  const authorRoleStr = language === 'en' ? post.authorRole : post.authorRoleEs;
  const contentBody = language === 'en' ? post.content : (post.contentEs || post.content);

  const [likesCount, setLikesCount] = useState(128);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(129);
      setIsLiked(true);
    } else {
      setLikesCount(128);
      setIsLiked(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId('circuit');
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12 pt-8"
      id="blog-detail-wrapper"
    >

      {/* BREADCRUMB NAVIGATION */}
      <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" id="detail-breadcrumbs-nav">
        <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant/60" id="breadcrumbs-trail">
          <Folder className="w-3.5 h-3.5" />
          <button
            onClick={() => setActiveTab('home')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            home
          </button>
          <span>/</span>
          <button
            onClick={() => setActiveTab('blog')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            blog
          </button>
          <span>/</span>
          <span className="text-primary truncate max-w-xs">{post.id}.md</span>
        </div>

        <button
          id="detail-back-btn"
          onClick={() => setActiveTab('blog')}
          className="inline-flex items-center px-4 py-2 border border-primary text-primary font-mono text-xs hover:bg-[#e9b3ff]/10 transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          {t.backToIndex}
        </button>
      </nav>

      {/* DETAILED ARTICLE */}
      <article className="max-w-[820px] mx-auto" id="detail-article-root">

        {/* HEADER PANEL */}
        <header className="mb-12 space-y-6" id="detail-article-header">
          <div className="flex flex-wrap gap-2.5" id="detail-header-tags">
            {post.tags.map(tag => (
              <span
                key={tag}
                id={`article-tag-badge-${tag}`}
                className="px-2 py-0.5 bg-secondary/10 text-secondary font-mono text-xs border border-secondary/30 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface leading-tight tracking-tight uppercase" id="detail-article-title">
            {titleStr}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-y border-white/10" id="detail-authors-panel">
            <div className="flex items-center gap-3.5" id="author-profile-box">
              <div className="w-10 h-10 rounded-full border border-primary p-0.5" id="author-avatar-holder">
                <img
                  id="author-avatar-img"
                  src={post.authorAvatar}
                  alt={post.author}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full grayscale contrast-125 object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-mono text-xs text-primary font-semibold" id="author-username-pub">
                  {post.author}
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant/60" id="author-role-pub">
                  {authorRoleStr}
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right flex flex-col justify-center" id="pub-dates-and-read">
              <div className="font-mono text-[11px] text-on-surface-variant/60 uppercase">
                {t.published}: {post.publishedDate}
              </div>
              <div className="font-mono text-xs text-secondary flex items-center justify-start sm:justify-end gap-1 mt-0.5 font-bold" id="detail-readtime-stat">
                <Timer className="w-3.5 h-3.5" />
                <span>{readTimeStr}</span>
              </div>
            </div>
          </div>
        </header>

        {/* MARKDOWN CONTENT */}
        <div className="markdown-body font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed" id="article-markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children, ...props }) => (
                <h2 className="font-mono font-bold text-xl sm:text-2xl text-on-surface mt-12 mb-4 border-b border-primary/20 pb-2 uppercase tracking-wide" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="font-mono font-semibold text-lg text-on-surface mt-10 mb-4 opacity-90 uppercase tracking-wide" {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p className="select-text text-justify" {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-none space-y-4 my-6 pl-1" {...props}>
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li className="flex items-start gap-3 text-sm sm:text-base" {...props}>
                  <span className="text-secondary select-none text-xs block font-bold mt-1 tracking-tighter">[OK]</span>
                  <span className="select-text">{children}</span>
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="italic my-8 border-l-4 border-primary bg-primary/5 p-5 sm:p-6 rounded-none select-text text-justify" {...props}>
                  {children}
                </blockquote>
              ),
              img: ({ src, alt, ...props }) => (
                <div className="relative w-full aspect-[20/13] sm:aspect-[21/9] bg-[#0e0e0e] border border-primary/25 hover:border-secondary my-8 overflow-hidden flex items-center justify-center select-none group">
                  <img
                    src={resolveImagePath(src)}
                    alt={alt}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-opacity duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>

		  {/*
                  <div className="relative z-20 text-center p-6 sm:p-8 bg-[#131313]/90 backdrop-blur-md border border-secondary/40 max-w-sm sm:max-w-md">
                    <div className="text-secondary font-mono text-base sm:text-lg font-bold tracking-wider mb-2 glow-secondary">
                      {alt}
                    </div>
                    <div className="text-on-surface-variant font-mono text-[11px] sm:text-xs cursor-blink">
                      Verifying recursive SNARK proof on-chain...
                    </div>
                  </div>
		*/}
                </div>
              ),
              code: ({ className, children, ...props }: Record<string, unknown> & { className?: string; children?: React.ReactNode }) => {
                if (!className) {
                  return (
                    <code className="bg-[#0e0e0e] border border-primary/20 px-1.5 py-0.5 text-xs font-mono text-[#d0c2d0]" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children, ...props }: Record<string, unknown> & { children?: React.ReactNode }) => {
                const codeEl = children as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
                const className = codeEl?.props?.className || '';
                const match = /language-(\w+)/.exec(className);

                if (match && match[1] === 'circuit') {
                  const codeString = String(codeEl?.props?.children || '').replace(/\n$/, '');
                  return (
                    <div className="relative group my-8">
                      <button
                        onClick={() => handleCopyCode(codeString)}
                        className="absolute top-4 right-4 text-secondary hover:text-white border border-secondary hover:border-white px-2.5 py-1 bg-secondary/15 hover:bg-secondary/35 font-mono text-xs select-none transition-all duration-200 cursor-pointer flex items-center gap-1 z-10"
                      >
                        {copiedCodeId === 'circuit' ? (
                          <>
                            <Check className="w-3 h-3 text-secondary animate-bounce" />
                            <span>COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                      <pre className="p-5 sm:p-6 bg-[#0e0e0e] border border-primary/20 hover:border-secondary transition-all overflow-x-auto text-xs sm:text-sm font-mono text-[#d0c2d0]">
                        <code className="block select-all whitespace-pre">{codeString}</code>
                      </pre>
                    </div>
                  );
                }

                return (
                  <pre className="p-5 sm:p-6 bg-[#0e0e0e] border border-primary/20 hover:border-secondary transition-all overflow-x-auto text-xs sm:text-sm font-mono text-[#d0c2d0] my-8" {...props}>
                    {children}
                  </pre>
                );
              },
            }}
          >
            {contentBody}
          </ReactMarkdown>
        </div>

        {/* FOOTER INTERACTION UTILS 
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6" id="detail-actions-footer">
          <div className="flex items-center gap-6" id="detail-interactive-group">
            <button
              id="like-trigger-btn"
              onClick={handleLike}
              className={`flex items-center gap-2 font-mono text-xs transition-colors cursor-pointer select-none ${
                isLiked ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-secondary text-secondary animate-bounce' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              id="share-trigger-btn"
              onClick={handleShare}
              className="flex items-center gap-2 font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer select-none relative"
            >
              <Share2 className="w-5 h-5" />
              <span>{shareFeedback ? t.copied : t.share}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs" id="detail-bottom-labels">
            <span className="text-on-surface-variant opacity-50 font-bold">{t.tagsLabel}:</span>
            <div className="flex gap-3" id="bottom-tags">
              <span className="text-secondary underline underline-offset-4 hover:glow-secondary cursor-help select-all">#privacy</span>
              <span className="text-secondary underline underline-offset-4 hover:glow-secondary cursor-help select-all">#zkp</span>
              <span className="text-secondary underline underline-offset-4 hover:glow-secondary cursor-help select-all">#identity</span>
            </div>
          </div>
        </div>
	*/}

      </article>

    </motion.div>
  );
}
