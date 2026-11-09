import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav id="header" className="fixed w-full z-50 glass border-b border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Nirapad Courier Logo" className="h-9 sm:h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-[13px] font-semibold text-slate-600 hover:text-brand-green transition-colors cursor-pointer"
            >
              {t('nav_services')}
            </a>
            <a
              href="#coverage"
              onClick={(e) => handleNavClick(e, 'coverage')}
              className="text-[13px] font-semibold text-slate-600 hover:text-brand-green transition-colors cursor-pointer"
            >
              {t('nav_coverage')}
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-[13px] font-semibold text-slate-600 hover:text-brand-green transition-colors cursor-pointer"
            >
              {t('nav_about')}
            </a>
            <a
              href="#process"
              onClick={(e) => handleNavClick(e, 'process')}
              className="text-[13px] font-semibold text-slate-600 hover:text-brand-green transition-colors cursor-pointer"
            >
              {t('nav_process')}
            </a>
            <a
              href="#tracking"
              onClick={(e) => handleNavClick(e, 'tracking')}
              className="text-[13px] font-semibold text-slate-600 hover:text-brand-green transition-colors cursor-pointer"
            >
              {t('nav_tracking')}
            </a>

            {/* Language Switcher Pill */}
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en' ? 'text-brand-green bg-white shadow-xs font-black' : 'text-slate-500 hover:text-brand-green'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'bn' ? 'text-brand-green bg-white shadow-xs font-black' : 'text-slate-500 hover:text-brand-green'
                }`}
              >
                বাং
              </button>
            </div>

            {/* Merchant Action Button */}
            {user ? (
              <Link
                to="/merchant"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-dark text-white rounded-full text-xs font-bold hover:bg-black transition-all shadow-md"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{user.businessName || user.name}</span>
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-6 py-2.5 bg-brand-green text-white rounded-full text-xs sm:text-[13px] font-bold hover:bg-brand-dark hover:scale-105 transition-all shadow-xl shadow-green-900/20 active:scale-95"
              >
                {t('nav_merchant_btn')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="text-xs font-extrabold px-3 py-2 bg-slate-100 rounded-full text-brand-green border border-slate-200"
            >
              {lang === 'en' ? 'বাং' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 p-2 -mr-2 focus:outline-none" aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 sm:px-6 py-3 shadow-lg max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="block py-3 text-base font-bold text-slate-700 hover:text-brand-green border-b border-slate-100"
          >
            {t('nav_services')}
          </a>
          <a
            href="#coverage"
            onClick={(e) => handleNavClick(e, 'coverage')}
            className="block py-3 text-base font-bold text-slate-700 hover:text-brand-green border-b border-slate-100"
          >
            {t('nav_coverage')}
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="block py-3 text-base font-bold text-slate-700 hover:text-brand-green border-b border-slate-100"
          >
            {t('nav_about')}
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, 'process')}
            className="block py-3 text-base font-bold text-slate-700 hover:text-brand-green border-b border-slate-100"
          >
            {t('nav_process')}
          </a>
          <a
            href="#tracking"
            onClick={(e) => handleNavClick(e, 'tracking')}
            className="block py-3 text-base font-bold text-slate-700 hover:text-brand-green border-b border-slate-100"
          >
            {t('nav_tracking')}
          </a>
          <Link
            to={user ? "/merchant" : "/register"}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-3 py-3 bg-brand-green text-white rounded-full text-sm font-extrabold shadow-md"
          >
            {user ? (user.businessName || 'Dashboard') : t('nav_merchant_btn')}
          </Link>
        </div>
      )}
    </nav>
  );
}
