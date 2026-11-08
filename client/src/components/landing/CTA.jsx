import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white py-14 lg:py-20">
      <div aria-hidden="true" className="absolute rounded-full bg-brand-red w-72 h-72 lg:w-[28rem] lg:h-[28rem] -right-24 -bottom-24 lg:-bottom-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-display font-extrabold text-[clamp(28px,3.8vw,46px)] tracking-tight leading-[1.12]">
          {t('cta_title')}
        </h2>
        <p className="mt-4 max-w-xl text-white/80 text-[15px] sm:text-base leading-relaxed">{t('cta_desc')}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="bg-white text-brand-dark text-sm font-bold px-6 py-3 rounded-md hover:bg-brand-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('cta_btn_signup')}
          </Link>
          <a
            href="tel:09612880088"
            className="border-2 border-white/60 text-sm font-bold px-6 py-3 rounded-md hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('cta_btn_call')}
          </a>
        </div>
      </div>
    </section>
  );
}
