import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white py-20 lg:py-28">
      <div aria-hidden="true" className="absolute rounded-full bg-brand-red w-72 h-72 lg:w-[28rem] lg:h-[28rem] -right-24 -bottom-24 lg:-bottom-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
          {t('cta_title')}
        </h2>
        <p className="mt-5 max-w-xl text-white/80 text-lg leading-relaxed">{t('cta_desc')}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="bg-white text-brand-dark font-bold px-7 py-3.5 rounded-md hover:bg-brand-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('cta_btn_signup')}
          </Link>
          <a
            href="tel:09612880088"
            className="border-2 border-white/60 font-bold px-7 py-3.5 rounded-md hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('cta_btn_call')}
          </a>
        </div>
      </div>
    </section>
  );
}
