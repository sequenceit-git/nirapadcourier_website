import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const rows = [
    { title: 'service_card1_title', desc: 'service_card1_desc', link: 'service_card1_link', href: '#coverage' },
    { title: 'service_card2_title', desc: 'service_card2_desc', link: 'service_card2_link', to: '/register' },
    { title: 'service_card3_title', desc: 'service_card3_desc', link: 'service_card3_link', href: 'tel:09612880088' },
  ];

  const linkClass =
    'inline-block font-bold text-brand-green underline underline-offset-4 decoration-brand-green/30 hover:decoration-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green';

  return (
    <section id="services" className="bg-brand-paper py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 mb-12 lg:mb-16">
          <h2 className="lg:col-span-7 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-brand-ink">
            {t('services_title')}
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 text-slate-600 leading-relaxed self-end">
            {t('services_desc')}
          </p>
        </div>

        <div className="border-t-2 border-brand-ink">
          {rows.map((r) => (
            <div
              key={r.title}
              className="grid lg:grid-cols-12 gap-3 lg:gap-8 py-8 lg:py-10 border-b border-slate-300"
            >
              <h3 className="lg:col-span-5 font-display font-bold text-2xl lg:text-3xl tracking-tight text-brand-ink">
                {t(r.title)}
              </h3>
              <p className="lg:col-span-5 text-slate-600 leading-relaxed">{t(r.desc)}</p>
              <div className="lg:col-span-2 lg:text-right">
                {r.to ? (
                  <Link to={r.to} className={linkClass}>{t(r.link)}</Link>
                ) : (
                  <a href={r.href} className={linkClass}>{t(r.link)}</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
