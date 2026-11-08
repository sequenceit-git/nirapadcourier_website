import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutWhy() {
  const { t } = useLanguage();
  const promises = [
    ['about_f1_title', 'about_f1_desc'],
    ['about_f2_title', 'about_f2_desc'],
    ['about_f3_title', 'about_f3_desc'],
    ['about_f4_title', 'about_f4_desc'],
  ];

  return (
    <section id="about" className="bg-brand-paper py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display font-extrabold text-[clamp(26px,3.6vw,42px)] tracking-tight leading-[1.15] text-brand-ink">
            {t('about_title')}
          </h2>
          <p className="mt-4 text-[15px] text-slate-600 leading-relaxed">{t('about_desc')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="bg-brand-green text-white text-sm font-bold px-5 py-3 rounded-md hover:bg-brand-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              {t('about_btn_merchant')}
            </Link>
            <a
              href="tel:09612880088"
              className="border-2 border-brand-ink text-brand-ink text-sm font-bold px-5 py-3 rounded-md hover:bg-brand-ink hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
            >
              {t('about_btn_helpline')} 09612-880088
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-slate-500 mb-3">{t('about_promise')}</p>
          <ul className="border-t-2 border-brand-ink">
            {promises.map(([title, desc]) => (
              <li key={title} className="py-5 border-b border-slate-300">
                <h3 className="font-display font-bold text-lg sm:text-xl text-brand-ink">{t(title)}</h3>
                <p className="mt-1.5 text-[14.5px] text-slate-600 leading-relaxed max-w-xl">{t(desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
