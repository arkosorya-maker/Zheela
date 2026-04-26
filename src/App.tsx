/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronDown, ArrowRight, ArrowLeft,
  BookOpen, MessageCircle, Video, PenTool,
  Facebook, Instagram, Linkedin, Send, Award, ArrowUpLeft
} from 'lucide-react';
import { translations, Language } from './lib/i18n';
import { supabase } from './lib/supabase';
import { AdminPanel } from './components/AdminPanel';

// Component for Neomorphic Cards
const NeoCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-[#ecf0f3] rounded-2xl p-8 neo-shadow transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-[inset_10px_10px_19px_#d1d9e6,inset_-10px_-10px_19px_#ffffff] hover:-translate-y-2 group' : ''} ${className}`}
  >
    {children}
  </div>
);

const NeoButton: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <button 
    onClick={onClick}
    className={`bg-[#ecf0f3] text-slate-600 rounded-xl px-6 py-3 font-semibold uppercase tracking-wider neo-btn transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

const NeoIconBtn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button className="w-14 h-14 bg-[#ecf0f3] text-slate-700 flex items-center justify-center rounded-xl neo-btn hover:text-primary-600 transition-colors duration-300">
    {children}
  </button>
);

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('preferred_language') as Language) || 'ku';
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('preferred_language', newLang);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'books' | 'consulting' | 'courses' | 'faq' | 'certificates' | 'contact' | 'admin'>('home');

  const [customContent, setCustomContent] = useState<any>({});
  const [profileImg, setProfileImg] = useState<string>('/profile.png');

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const profileInfo = data.find((d: any) => d.section_key === 'profile');
        if (profileInfo && profileInfo.content?.image_url) {
          setProfileImg(profileInfo.content.image_url);
        }
        
        const transInfo = data.find((d: any) => d.section_key === 'translations');
        if (transInfo && transInfo.content) {
          setCustomContent(transInfo.content);
        }
      }
    };
    fetchContent();
  }, []);

  const baseT = translations[lang];
  const customT = customContent[lang] || {};
  const t = {
    ...baseT,
    ...customT,
    nav: { ...baseT.nav, ...(customT.nav || {}) },
    hero: { ...baseT.hero, ...(customT.hero || {}) },
    about: { ...baseT.about, ...(customT.about || {}) },
    services: { ...baseT.services, ...(customT.services || {}) },
    books: { ...baseT.books, ...(customT.books || {}) },
    consulting: { ...baseT.consulting, ...(customT.consulting || {}) },
    courses: { ...baseT.courses, ...(customT.courses || {}) },
    faq: { ...baseT.faq, ...(customT.faq || {}) },
    certificates: { ...baseT.certificates, ...(customT.certificates || {}) },
    contact: { ...baseT.contact, ...(customT.contact || {}) },
    common: { ...baseT.common, ...(customT.common || {}) },
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    if (isRtl) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [lang, isRtl]);

  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
     { id: 'services', key: 'services', icon: PenTool },
     { id: 'books', key: 'books', icon: BookOpen },
     { id: 'consulting', key: 'consulting', icon: MessageCircle },
     { id: 'faq', key: 'faq', icon: MessageCircle },
     { id: 'courses', key: 'courses', icon: Video }
  ];

  return (
    <div className="min-h-screen text-[#3c3e41] selection:bg-primary-200 selection:text-primary-900 overflow-x-hidden font-sans pb-10">
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#ecf0f3]/80 backdrop-blur-md border-b border-transparent shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex items-center space-x-3 space-x-reverse">
                 <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white neo-shadow">
                    <img src={profileImg} alt="Zheela" className="w-full h-full object-cover" />
                 </div>
                 <span className="font-bold text-2xl tracking-tighter uppercase text-[#3c3e41] opacity-90 tracking-widest pl-2">{t.hero.name}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              <button onClick={() => navigateTo('home')} className="text-sm font-semibold uppercase tracking-widest text-[#3c3e41] hover:text-primary-600 transition-colors">
                {lang === 'en' ? 'Home' : (lang === 'ku' ? 'سەرەتا' : 'الرئيسية')}
              </button>
              {/* Language Switcher */}
              <div className="flex bg-[#ecf0f3] neo-shadow-inner rounded-full p-1 ms-4 space-x-1 space-x-reverse">
                <button onClick={() => handleSetLang('en')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${lang === 'en' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'}`}>EN</button>
                <button onClick={() => handleSetLang('ku')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${lang === 'ku' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'}`}>KU</button>
                <button onClick={() => handleSetLang('ar')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${lang === 'ar' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'}`}>AR</button>
              </div>
              <NeoButton onClick={() => navigateTo('contact')} className="text-primary-600 font-bold whitespace-nowrap">
                {t.nav.contact}
              </NeoButton>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="neo-icon-btn p-3 rounded-xl neo-shadow text-[#primary-600]">
                {isMenuOpen ? <X className="w-6 h-6 text-primary-600" /> : <Menu className="w-6 h-6 text-primary-600" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#ecf0f3]"
            >
              <div className="px-6 pt-4 pb-8 space-y-4">
                 <div className="flex bg-[#ecf0f3] neo-shadow-inner rounded-xl p-2 justify-center mb-6 space-x-2 space-x-reverse">
                   <button onClick={() => handleSetLang('en')} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${lang === 'en' ? 'bg-primary-600 text-white' : 'text-slate-500'}`}>EN</button>
                   <button onClick={() => handleSetLang('ku')} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${lang === 'ku' ? 'bg-primary-600 text-white' : 'text-slate-500'}`}>KU</button>
                   <button onClick={() => handleSetLang('ar')} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${lang === 'ar' ? 'bg-primary-600 text-white' : 'text-slate-500'}`}>AR</button>
                 </div>
                <button onClick={() => navigateTo('home')} className="block w-full text-start text-base font-bold text-slate-800 uppercase p-2">
                   {lang === 'en' ? 'Home' : (lang === 'ku' ? 'سەرەتا' : 'الرئيسية')}
                </button>
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => navigateTo(item.id as any)} className="block w-full text-start text-base font-bold text-slate-800 uppercase p-2 hover:text-primary-600">
                    {t.nav[item.key as keyof typeof t.nav]}
                  </button>
                ))}
                <button onClick={() => navigateTo('certificates')} className="block w-full text-start text-base font-bold text-slate-800 uppercase p-2 hover:text-primary-600">
                  {t.nav.certificates}
                </button>
                <button onClick={() => navigateTo('contact')} className="block w-full text-start text-base font-bold text-slate-800 uppercase p-2 hover:text-primary-600">
                  {t.nav.contact}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Main Content --- */}
      <main className="pt-32 min-h-[80vh] flex flex-col items-center">
        <AnimatePresence mode="wait">
          
          {currentPage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              {/* Hero Section */}
              <section className="flex flex-col-reverse lg:flex-row items-center border-b border-gray-300/30 pb-20 mb-20 gap-16 lg:gap-8 pt-10">
                <div className="w-full lg:w-3/5 text-center lg:text-start lg:pe-16 relative z-10">
                  <div className="text-sm font-bold tracking-[0.2em] uppercase text-slate-500 mb-6">
                    {lang === 'en' ? 'Welcome to my world' : (lang === 'ku' ? 'بەخێربێیت بۆ جیهانەکەم' : 'أهلاً بك في عالمي')}
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1e2125] leading-tight mb-8">
                    {lang === 'en' ? "Hi, I'm " : (lang === 'ku' ? "سڵاو، من " : "مرحباً، أنا ")}
                    <span className="text-primary-600">{t.hero.name}</span><br />
                    <span className="text-4xl md:text-5xl lg:text-6xl mt-4 block">{t.hero.title}.</span>
                  </h1>
                  <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {t.hero.tagline}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-12 sm:gap-24">
                    <div>
                      <span className="block text-xs uppercase tracking-[0.2em] text-[#1e2125] font-bold mb-6">{t.common.findWithMe}</span>
                      <div className="flex space-x-6 space-x-reverse justify-center lg:justify-start">
                        <NeoIconBtn><Facebook className="w-5 h-5" /></NeoIconBtn>
                        <NeoIconBtn><Instagram className="w-5 h-5" /></NeoIconBtn>
                        <NeoIconBtn><Linkedin className="w-5 h-5" /></NeoIconBtn>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/5 flex justify-center relative z-0">
                  <div 
                    onClick={() => navigateTo('admin')}
                    className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-full lg:max-w-md aspect-[3/4] sm:aspect-auto sm:h-[400px] lg:h-[500px] neo-shadow rounded-2xl bg-[#ecf0f3] overflow-hidden group cursor-pointer"
                  >
                     <div className="absolute inset-x-4 sm:inset-x-8 bottom-0 h-[85%] sm:h-[90%] pt-6 sm:pt-10 rounded-t-xl overflow-hidden shadow-inner bg-gradient-to-t from-slate-200 to-transparent flex items-end justify-center transition-all duration-500 group-hover:-translate-y-2">
                        <img src={profileImg} alt="Zheela Portrait" className="w-full h-full object-cover object-bottom" />
                     </div>
                  </div>
                </div>
              </section>

              {/* What I Do Section */}
              <section className="pb-24">
                <div className="text-center lg:text-start mb-16">
                  <span className="text-primary-600 font-bold uppercase tracking-[0.2em] text-sm block mb-4">{t.common.features}</span>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#1e2125]">{t.common.whatIDo}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <NeoCard key={idx} onClick={() => navigateTo(item.id as any)} className="min-h-[280px] flex flex-col justify-start">
                        <div className="mb-8 self-start text-primary-600">
                          <Icon className="w-12 h-12 stroke-[1.5]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1e2125] mb-4 group-hover:text-primary-600 transition-colors duration-300">
                          {t.nav[item.key as keyof typeof t.nav]}
                        </h3>
                        {/* Placeholder descriptions for the grid, wait we can extract from i18n */}
                        <p className="text-slate-500 leading-relaxed text-sm">
                           {item.key === 'services' && t.services.subtitle}
                           {item.key === 'books' && t.books.subtitle}
                           {item.key === 'consulting' && t.consulting.subtitle}
                           {item.key === 'courses' && t.courses.subtitle}
                           {item.key === 'faq' && t.faq.title}
                        </p>
                        <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <ArrowUpLeft className={`w-6 h-6 text-primary-600 ${isRtl ? 'rotate-90' : 'rotate-90'}`} />
                        </div>
                      </NeoCard>
                    );
                  })}
                </div>
              </section>

              {/* Certificates and Contact Section */}
              <section className="pb-24">
                <div className="text-center lg:text-start mb-16">
                  <span className="text-primary-600 font-bold uppercase tracking-[0.2em] text-sm block mb-4">
                    {lang === 'en' ? 'More content' : (lang === 'ku' ? 'زیاتر' : 'المزيد')}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#1e2125]">
                     {lang === 'en' ? 'Information' : (lang === 'ku' ? 'زانیاری' : 'معلومات')}
                  </h2>
                </div>
                 <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <NeoCard onClick={() => navigateTo('certificates')} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 sm:space-x-reverse border border-transparent hover:border-primary-200 p-6 md:p-8">
                       <div className="bg-[#ecf0f3] neo-shadow-inner p-3 md:p-4 rounded-xl text-primary-600 flex-shrink-0">
                          <Award className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
                       </div>
                       <div className="flex-1 w-full">
                          <h3 className="text-xl md:text-2xl font-bold text-[#1e2125] mb-2 group-hover:text-primary-600 transition-colors duration-300">{t.nav.certificates}</h3>
                          <p className="text-slate-500 text-xs md:text-sm hidden sm:block">{t.certificates?.subtitle}</p>
                       </div>
                    </NeoCard>

                    <NeoCard onClick={() => navigateTo('contact')} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 sm:space-x-reverse border border-transparent hover:border-primary-200 p-6 md:p-8">
                       <div className="bg-[#ecf0f3] neo-shadow-inner p-3 md:p-4 rounded-xl text-primary-600 flex-shrink-0">
                          <Send className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
                       </div>
                       <div className="flex-1 w-full">
                          <h3 className="text-xl md:text-2xl font-bold text-[#1e2125] mb-2 group-hover:text-primary-600 transition-colors duration-300">{t.nav.contact}</h3>
                          <p className="text-slate-500 text-xs md:text-sm hidden sm:block">{t.contact.subtitle}</p>
                       </div>
                    </NeoCard>
                 </div>
              </section>
            </motion.div>
          )}

          {/* Subpages logic: simple rendering of components from I18N */}
          {currentPage !== 'home' && (
             <motion.div 
              key="detail_page"
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
             >
                <div className="mb-12">
                   <NeoButton onClick={() => navigateTo('home')} className="flex items-center space-x-2 space-x-reverse px-4 py-2">
                      {isRtl ? <ArrowRight className="w-5 h-5 mr-0 ml-2" /> : <ArrowLeft className="w-5 h-5 mr-2 ml-0" />}
                      <span>{lang === 'en' ? 'Back to Home' : (lang === 'ku' ? 'گەڕانەوە بۆ پێشەوە' : 'العودة للرئيسية')}</span>
                   </NeoButton>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-[#1e2125] mb-4">
                   {t.nav[currentPage as keyof typeof t.nav]}
                </h1>
                
                {/* Dynamically render the content based on current page */}
                <div className="mt-12 bg-[#ecf0f3] neo-shadow rounded-3xl p-8 md:p-12">
                   {currentPage === 'services' && (
                      <div className="space-y-8">
                         <p className="text-lg text-slate-500 mb-8">{t.services.subtitle}</p>
                         {t.services.items.map((srv, idx) => (
                           <div key={idx} className="border-b border-gray-300/30 pb-6 last:border-0 last:pb-0">
                              <h3 className="text-2xl font-bold text-[#1e2125] mb-3 text-primary-600">{srv.title}</h3>
                              <p className="text-slate-600 leading-relaxed">{srv.description}</p>
                           </div>
                         ))}
                      </div>
                   )}

                   {currentPage === 'books' && (
                      <div className="space-y-8">
                         <p className="text-lg text-slate-500 mb-8">{t.books.subtitle}</p>
                         <div className="grid md:grid-cols-2 gap-8">
                            {t.books.items.map((book: any, idx: number) => (
                              <div key={idx} className="bg-[#ecf0f3] neo-shadow pb-6 rounded-2xl flex flex-col justify-start items-center text-center overflow-hidden">
                                 {book.image_url ? (
                                    <div className="w-48 sm:w-56 aspect-[3/4] bg-gray-200 mt-8 mb-6 mx-auto rounded overflow-hidden shadow-lg border border-gray-100">
                                       <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                 ) : (
                                    <div className="pt-8">
                                       <BookOpen className="w-12 h-12 text-primary-400 mb-4 mx-auto" />
                                    </div>
                                 )}
                                 <div className="px-6 space-y-2">
                                    <h3 className="text-xl font-bold text-[#1e2125]">{book.title}</h3>
                                    {(book.description || book.status) && (
                                       <p className="text-sm text-slate-500 mt-2">{book.description || book.status}</p>
                                    )}
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {currentPage === 'consulting' && (
                      <div className="space-y-8">
                         <p className="text-lg text-slate-500 mb-8">{t.consulting.subtitle}</p>
                         <div className="grid md:grid-cols-2 gap-8">
                            {t.consulting.items.map((pkg, idx) => (
                              <div key={idx} className="bg-[#ecf0f3] neo-shadow p-8 rounded-2xl">
                                 <h3 className="text-2xl font-bold text-[#1e2125] mb-2">{pkg.title}</h3>
                                 <div className="text-3xl font-bold text-primary-600 mb-6">{pkg.price}</div>
                                 <ul className="space-y-3 mb-8">
                                    {pkg.features.map((ft, i) => (
                                       <li key={i} className="flex items-start text-slate-600">
                                          <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 me-3 flex-shrink-0" />
                                          {ft}
                                       </li>
                                    ))}
                                 </ul>
                                 <NeoButton className="w-full text-xs">{t.common.choosePlan}</NeoButton>
                              </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {currentPage === 'courses' && (
                      <div className="space-y-8">
                         <p className="text-lg text-slate-500 mb-8">{t.courses.subtitle}</p>
                         <div className="space-y-6">
                            {t.courses.items.map((crs, idx) => (
                               <div key={idx} className="flex flex-col md:flex-row gap-6 bg-[#ecf0f3] neo-shadow-inner p-6 rounded-2xl items-center">
                                  <div className="w-full md:w-1/3 aspect-video bg-slate-300 rounded-xl flex items-center justify-center neo-shadow">
                                     <Video className="w-10 h-10 text-white" />
                                  </div>
                                  <div className="w-full md:w-2/3">
                                     <h3 className="text-2xl font-bold text-[#1e2125] mb-3">{crs.title}</h3>
                                     <p className="text-slate-600 mb-6">{crs.description}</p>
                                     <NeoButton className="text-xs">{crs.cta}</NeoButton>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {currentPage === 'faq' && (
                      <div className="space-y-6">
                         {t.faq.items.map((item, idx) => (
                            <div key={idx} className="bg-[#ecf0f3] neo-shadow rounded-2xl overflow-hidden">
                               <button 
                                 onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                 className="w-full flex justify-between items-center p-6 text-start"
                               >
                                  <span className="font-bold text-[#1e2125]">{item.question}</span>
                                  <ChevronDown className={`w-5 h-5 text-primary-600 transition-transform ${activeFaq === idx ? (isRtl ? 'rotate-180' : 'rotate-180') : ''}`} />
                               </button>
                               <AnimatePresence>
                                  {activeFaq === idx && (
                                     <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: 'auto', opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                     >
                                        <div className="px-6 pb-6 text-slate-600 border-t border-gray-300/30 pt-4">
                                           {item.answer}
                                        </div>
                                     </motion.div>
                                  )}
                               </AnimatePresence>
                            </div>
                         ))}
                      </div>
                   )}

                   {currentPage === 'certificates' && t.certificates && (
                      <div className="space-y-8">
                         <p className="text-lg text-slate-500 mb-8">{t.certificates.subtitle}</p>
                         <div className="grid md:grid-cols-2 gap-8">
                            {t.certificates.items.map((cert: any, idx: number) => (
                               <div key={idx} className="bg-[#ecf0f3] neo-shadow pb-8 rounded-2xl flex flex-col justify-start overflow-hidden">
                                  {cert.image_url ? (
                                     <div className="w-full aspect-[4/3] bg-gray-200 mb-6">
                                        <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                                     </div>
                                  ) : (
                                     <div className="pt-8 px-8">
                                        <Award className="w-12 h-12 text-primary-400 mb-6" />
                                     </div>
                                  )}
                                  <div className="px-8 flex-1 flex flex-col">
                                     <h3 className="text-xl font-bold text-[#1e2125] mb-2">{cert.title}</h3>
                                     {cert.issuer && <p className="text-slate-600 text-sm mb-6">{cert.issuer}</p>}
                                     {(cert.year || cert.issuer) && (
                                        <div className="text-primary-600 font-bold text-lg mt-auto pt-4 border-t border-gray-300/30">
                                           {cert.year || cert.issuer}
                                        </div>
                                     )}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {currentPage === 'contact' && (
                      <div className="space-y-8 max-w-2xl mx-auto">
                         <div className="text-center mb-12">
                            <p className="text-lg text-slate-500">{t.contact.subtitle}</p>
                         </div>
                         <div className="grid sm:grid-cols-2 gap-8 mb-12">
                            <a href={t.contact.links?.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="block text-inherit">
                              <NeoCard className="flex flex-col items-center justify-center p-10 hover:text-primary-600 border border-transparent hover:border-primary-200 group">
                                 <Instagram className="w-16 h-16 mb-6 stroke-[1.5] group-hover:-translate-y-1 transition-transform" />
                                 <h3 className="text-xl font-bold mb-2">{t.contact.social?.instagram}</h3>
                              </NeoCard>
                            </a>
                            <a href={t.contact.links?.telegram || "https://t.me/"} target="_blank" rel="noopener noreferrer" className="block text-inherit">
                              <NeoCard className="flex flex-col items-center justify-center p-10 hover:text-primary-600 border border-transparent hover:border-primary-200 group">
                                 <Send className="w-16 h-16 mb-6 stroke-[1.5] group-hover:-translate-y-1 transition-transform" />
                                 <h3 className="text-xl font-bold mb-2">{t.contact.social?.telegram}</h3>
                              </NeoCard>
                            </a>
                         </div>

                         <NeoCard className="p-8">
                            <form 
                              className="space-y-6"
                              onSubmit={async (e) => {
                                 e.preventDefault();
                                 const btn = e.currentTarget.querySelector('button[type="submit"]');
                                 if (btn) btn.textContent = '...';
                                 
                                 const formData = new FormData(e.currentTarget);
                                 const res = await supabase.from('messages').insert({
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    message: formData.get('message')
                                 });

                                 if (btn) btn.textContent = t.contact.form?.submit || t.common.sent;
                                 if (!res.error) {
                                    alert(t.common.messageSent);
                                    e.currentTarget.reset();
                                 } else {
                                    alert(t.common.messageFailed);
                                    console.error(res.error);
                                 }
                              }}
                            >
                               <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">{t.contact.form?.name}</label>
                                  <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl bg-[#ecf0f3] neo-shadow-inner text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/50" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">{t.contact.form?.email}</label>
                                  <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl bg-[#ecf0f3] neo-shadow-inner text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/50" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-sm font-bold text-gray-700">{t.contact.form?.message}</label>
                                  <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-[#ecf0f3] neo-shadow-inner text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/50"></textarea>
                               </div>
                               <button type="submit" className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold neo-shadow hover:-translate-y-1 transition-transform">
                                  {t.contact.form?.submit}
                               </button>
                            </form>
                         </NeoCard>
                      </div>
                   )}

                   {currentPage === 'admin' && (
                      <AdminPanel currentLang={lang} />
                   )}
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- Footer --- */}
      {currentPage === 'home' && (
         <footer className="w-full text-center py-12 mt-12 border-t border-gray-300/30">
            <p className="text-slate-500 font-medium">
               © {new Date().getFullYear()} Zheela. {t.common.allRightsReserved}
            </p>
         </footer>
      )}
    </div>
  );
}
