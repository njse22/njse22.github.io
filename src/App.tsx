import React, { useState } from 'react';
import { TabType, LanguageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';
import BlogDetailView from './components/BlogDetailView';
import ResearchView from './components/ResearchView';
import { Shield, KeyRound, Globe, Terminal, X, WifiOff, FileText, Check, Copy } from 'lucide-react';
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
    viewAllLogs: "VIEW_ALL_LOGS",
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
    langLabel: "IDIO",
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
    viewAllLogs: "VER_TODOS_LOS_LOGS",
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

  // Interactive Popup Modal Triggers
  const [gpgModalOpen, setGpgModalOpen] = useState(false);
  const [onionModalOpen, setOnionModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Copy state variables inside modals
  const [copiedText, setCopiedText] = useState(false);

  const t = TRANSLATIONS[language];

  const handleEnlist = (email: string) => {
    console.log(`Secured newsletter subscriber registration requested for address: ${email}`);
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

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
              onEnlist={handleEnlist}
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

      {/* NAVIGATION FOOTER */}
      <Footer 
        language={language}
        onViewGpg={() => setGpgModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenOnionModal={() => setOnionModalOpen(true)}
      />

      {/* INTERACTIVE COMPONENT: Onion Private Link Popup Modal */}
      {onionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="onion-service-modal">
          <div className="bg-[#18101c] border-2 border-secondary p-6 sm:p-8 max-w-lg w-full relative phosphor-glow rounded-none">
            
            <button 
              id="onion-close-btn"
              onClick={() => setOnionModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white cursor-pointer p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 font-mono" id="onion-modal-content">
              <div className="flex items-center gap-3 text-secondary">
                <Globe className="w-5 h-5 text-secondary animate-pulse" />
                <h3 className="font-bold text-base uppercase text-secondary">Secure Onion Service Location</h3>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                To browse this publishing ledger with state-of-the-art anonymity and protection, toggle a compatible Tor browser and establish a link directly to our v3 routing node:
              </p>

              {/* Encoded private link address */}
              <div className="p-4 bg-black border border-primary/25 text-xs text-secondary/90 flex justify-between items-center break-all select-all gap-4">
                <span>oniontchn7fx3b91zpy72gwnz0192laospx7y19axp28cxq92.onion</span>
                <button 
                  id="onion-copy-btn"
                  onClick={() => handleCopyText('oniontchn7fx3b91zpy72gwnz0192laospx7y19axp28cxq92.onion')}
                  className="p-1.5 bg-secondary/15 hover:bg-secondary/30 text-secondary hover:text-white transition-colors cursor-pointer border border-secondary/35 rounded-none flex-shrink-0"
                  title="Copy Onion Link"
                >
                  {copiedText ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-3 pt-3 border-t border-primary/10 text-xs">
                <div className="flex gap-2 text-[10px] text-on-surface-variant/50">
                  <span className="text-secondary">[!]</span>
                  <span>WARNING: onion directories are exclusively routable within decentralized hidden layers. Clearweb browser engines will raise resolving alerts.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* INTERACTIVE COMPONENT: Full GPG Public Key ASCII block popup modal */}
      {gpgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="gpg-payload-modal">
          <div className="bg-[#18101c] border-2 border-primary/60 p-6 sm:p-8 max-w-2xl w-full relative phosphor-glow rounded-none">
            
            <button 
              id="gpg-close-btn"
              onClick={() => setGpgModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white cursor-pointer p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 font-mono" id="gpg-modal-content">
              <div className="flex items-center gap-3 text-primary">
                <KeyRound className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base uppercase text-primary">GPG PUBLIC KEY BLOCK</h3>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Use the public key block below to verify cryptographic publication signatures or transmit encrypted envelopes safely:
              </p>

              {/* Raw printable PGP box with copy triggers */}
              <div className="relative" id="raw-gpg-payload-parent">
                <button
                  id="gpg-copy-payload-btn"
                  onClick={() => handleCopyText(`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2.4.0 (GNU/Linux)

mQINBFmNfBEBEADcv9Gg4pS4m7x6L8Y7HPr27O5kY/9s2D7Z8A9F3hJ6b2v9N3u2
g9eYF/0D7W2qXg8mS8K1F8S20U3k/u3g0mSeFnsmSe28sN9v2K9sU80f8/J3SNe2
EF82312199A2018462D4C7E100224FF392B18E30v8f9sU20snSe20vX8vX2snS8
=y3x0
-----END PGP PUBLIC KEY BLOCK-----`)}
                  className="absolute top-3 right-3 text-secondary bg-[#131113] hover:bg-secondary/20 border border-secondary/40 px-2 py-1 text-xs cursor-pointer select-none transition-all flex items-center gap-1 font-bold"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-secondary" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copy}</span>
                    </>
                  )}
                </button>

                <textarea
                  readOnly
                  rows={8}
                  className="w-full bg-[#0e0e0e] border border-primary/25 text-on-surface-variant/80 p-4 font-mono text-[10px] leading-tight select-all focus:outline-none resize-none cursor-text pt-10"
                  value={`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2.4.0 (GNU/Linux)

mQINBFmNfBEBEADcv9Gg4pS4m7x6L8Y7HPr27O5kY/9s2D7Z8A9F3hJ6b2v9N3u2
g9eYF/0D7W2qXg8mS8K1F8S20U3k/u3g0mSeFnsmSe28sN9v2K9sU80f8/J3SNe2
EF82312199A2018462D4C7E100224FF392B18E30v8f9sU20snSe20vX8vX2snS8
=y3x0
-----END PGP PUBLIC KEY BLOCK-----`}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-on-surface-variant/40 pt-2 border-t border-primary/10">
                <span>FINGERPRINT: EF82312199A2018462D4C7E100224FF392B18E30</span>
                <span className="text-secondary">[OK_VERIFIED]</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* INTERACTIVE COMPONENT: Privacy policy detail modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="privacy-policy-modal">
          <div className="bg-[#18101c] border-2 border-primary/60 p-6 sm:p-8 max-w-xl w-full relative phosphor-glow rounded-none">
            
            <button 
              id="privacy-close-btn"
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white cursor-pointer p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5 font-mono" id="privacy-modal-content">
              <div className="flex items-center gap-3 text-primary">
                <FileText className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="font-bold text-base uppercase text-primary">PRIVACY_AUDIT_LOGS</h3>
              </div>

              <p className="text-sm text-on-surface font-semibold underline decoration-secondary tracking-wide">
                No Trackers. No Cookies. No Third-Party Integrations.
              </p>

              <div className="text-xs text-on-surface-variant/80 space-y-4 max-h-72 overflow-y-auto pr-2" id="privacy-scrollable">
                <p>
                  1. **ANONYMINITY DESIGN**: This station is explicitly optimized to ensure user payloads are not logged. All analytical monitoring code has been bypassed.
                </p>
                <p>
                  2. **METADATA FORENSICS**: Our publications guide individuals on sanitizing Exif and system fingerprints. In accordance, we gather zero location matrices, resolution parameters, or software identifiers.
                </p>
                <p>
                  3. **DECENTRALIZED COMPATIBILITY**: Serving requests from tor relays means we are isolated from clearweb tracking tunnels. Connection handshakes are ephemeral and decay instantly upon session endings.
                </p>
                <p>
                  4. **LOG ARCHIVE PURGE**: Contact messages sent via our secure relay pipe are encrypted symmetrically immediately. No plaintext payloads linger in permanent database repositories.
                </p>
              </div>

              <div className="pt-3 border-t border-primary/10 flex justify-end">
                <button
                  id="privacy-ack-btn"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="px-5 py-2 bg-secondary text-on-secondary hover:scale-103 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer transition-all"
                >
                  ACKNOWLEDGE_POLICIES
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
