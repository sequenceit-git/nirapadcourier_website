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
    <section id="about" className="bg-brand-paper py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-brand-ink">
            {t('about_title')}
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">{t('about_desc')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="bg-brand-green text-white font-bold px-6 py-3 rounded-md hover:bg-brand-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              {t('about_btn_merchant')}
            </Link>
            <a
              href="tel:09612880088"
              className="border-2 border-brand-ink text-brand-ink font-bold px-6 py-3 rounded-md hover:bg-brand-ink hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
            >
              {t('about_btn_helpline')} 09612-880088
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-semibold text-slate-500 mb-3">{t('about_promise')}</p>
          <ul className="border-t-2 border-brand-ink">
            {promises.map(([title, desc]) => (
              <li key={title} className="py-7 border-b border-slate-300">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-ink">{t(title)}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed max-w-xl">{t(desc)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
