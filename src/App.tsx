import React, { useState } from 'react';
import { TabType, LanguageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';
import BlogDetailView from './components/BlogDetailView';
import ResearchView from './components/ResearchView';
import { AnimatePresence } from 'motion/react';

// GLOBAL MULTILINGUAL TRANSLATION ENGINE DETECTED PROMINENTLY IN SCENE SECTIONS
export const TRANSLATIONS = {
  en: {
    title: "ROOT@ANONYMOUS",
    home: "Home",
    blog: "Blog",
    research: "Research",
    langLabel: "LANG",
    academicRebel: "Academic Rebel",
    directory: "DIRECTORY",
    systemStatus: "SYSTEM_STATUS",
    encryptedUplink: "ENCRYPTED_UPLINK",
    totalRecords: "TOTAL_RECORDS",
    filenameTitle: "Filename / Title",
    year: "Year",
    venue: "Venue",
    accessPerms: "Access_Perms",
    whoami: "whoami",
    statusLabel: "STATUS",
    statusTruth: "Searching for the truth",
    downloadKey: "Download Public Key",
    latestIntel: "LATEST_INTEL",
    viewAllLogs: "VIEW_ALL_BLOGS",
    joinResistance: "Join the resistance",
    joinText: "Get monthly encrypted digests on privacy, security research, and terminal hacks. No trackers, no bloat.",
    enlist: "ENLIST",
    userLabel: "USER",
    onionService: "Onion Service",
    gpgKey: "GPG Key",
    privacyPolicy: "Privacy Policy",
    uptime: "Uptime",
    systemOnline: "SYSTEM ONLINE",
    contactTitle: "CONTACT_RESEARCH",
    contactText: "Interested in collaborating or requesting specific technical datasets? Reach out via our secure relay.",
    gpgTitle: "GPG_KEY_FINGERPRINT",
    backToIndex: "Back to Index",
    published: "PUBLISHED",
    tagsLabel: "Tags",
    share: "Share",
    copied: "COPIED!",
    copy: "COPY",
    readTimeSub: "min read",
    filterTags: "/Filter_Tags",
    allPosts: "ALL_POSTS",
    connectionActive: "Connection: ACTIVE",
    nodeLabel: "Node",
    loadMore: "LOAD_MORE_RECORDS",
    pageOf: "PAGE",
    estText: "EST. 1994",
    station: "STATION",
  },
  es: {
    title: "ROOT@ANONYMOUS",
    home: "Inicio",
    blog: "Bitácora",
    research: "Investigación",
    langLabel: "IDIOMA",
    academicRebel: "Rebelde Académico",
    directory: "DIRECTORIO",
    systemStatus: "ESTADO_SISTEMA",
    encryptedUplink: "ENLACE_ENCRIPTADO",
    totalRecords: "REGISTROS_TOTALES",
    filenameTitle: "Nombre_Archivo / Título",
    year: "Año",
    venue: "Medio / Foro",
    accessPerms: "Permisos_Acceso",
    whoami: "quiensoy",
    statusLabel: "ESTADO",
    statusTruth: "Buscando la verdad",
    downloadKey: "Descargar Clave Pública",
    latestIntel: "ÚLTIMA_INFORMACIÓN",
    viewAllLogs: "VER_TODOS_LOS_BLOGS",
    joinResistance: "Únete a la resistencia",
    joinText: "Recibe boletines encriptados mensuales sobre privacidad, seguridad e informática de terminal. Sin rastreadores ni de relleno.",
    enlist: "ALISTARSE",
    userLabel: "USUR",
    onionService: "Servicio Onion",
    gpgKey: "Clave GPG",
    privacyPolicy: "Políticas de Privacidad",
    uptime: "Tiempo de actividad",
    systemOnline: "SISTEMA ACTIVO",
    contactTitle: "CONTACTO_INVESTIGACIÓN",
    contactText: "¿Interesado en colaborar o solicitar conjuntos de datos de cifrado? Escríbenos vía canal seguro.",
    gpgTitle: "HUELLA_CLAVE_GPG",
    backToIndex: "Volver al Índice",
    published: "PUBLICADO",
    tagsLabel: "Etiquetas",
    share: "Compartir",
    copied: "¡COPIADO!",
    copy: "COPIAR",
    readTimeSub: "min de lectura",
    filterTags: "/Filtrar_Etiquetas",
    allPosts: "TODOS",
    connectionActive: "Conexión: ACTIVA",
    nodeLabel: "Nodo",
    loadMore: "CARGAR_MAS_REGISTROS",
    pageOf: "PÁGINA",
    estText: "FUNDADO 1994",
    station: "ESTACIÓN",
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedPostId, setSelectedPostId] = useState<string>('zero-knowledge-foundations');
  const [language, setLanguage] = useState<LanguageType>('en');

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-sans transition-colors duration-200 selection:bg-primary/30 selection:text-white pb-0">
      
      {/* Decorative Matrix radial grid backdrop + flickering CRT look */}
      <div className="fixed inset-0 pointer-events-none scanline-overlay z-50"></div>
      <div className="fixed inset-0 pointer-events-none terminal-grid opacity-30 z-0"></div>

      {/* FIXED NAVIGATION HEADER */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }} 
        language={language} 
        setLanguage={setLanguage} 
      />

      {/* CENTRAL LAYOUT PORT */}
      <main className="flex-grow max-w-[1140px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-20 relative z-10" id="main-content-canvas-view">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HomeView 
              key="home" 
              setActiveTab={setActiveTab} 
              setSelectedPostId={setSelectedPostId} 
              language={language}
            />
          )}

          {activeTab === 'blog' && (
            <BlogView 
              key="blog" 
              setActiveTab={setActiveTab} 
              setSelectedPostId={setSelectedPostId} 
              language={language}
            />
          )}

          {activeTab === 'blog-detail' && (
            <BlogDetailView 
              key="blog-detail" 
              postId={selectedPostId} 
              setActiveTab={setActiveTab} 
              language={language}
            />
          )}

          {activeTab === 'research' && (
            <ResearchView 
              key="research" 
              language={language} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer 
        language={language}
      />

    </div>
  );
}
