import React from 'react';
import { Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProcessSteps() {
  const { t, lang } = useLanguage();
  const n = (i) => (i + 1).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

  return (
    <section id="process" className="bg-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl font-display font-extrabold text-[clamp(26px,3.6vw,42px)] tracking-tight leading-[1.15] text-brand-ink">
          {t('process_title')}
        </h2>

        {/* A route: the stops are a real sequence, so they are numbered */}
        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6 relative">
          <div aria-hidden="true" className="hidden md:block absolute left-0 right-0 top-[19px] border-t-2 border-dashed border-slate-300" />
          <Truck aria-hidden="true" className="route-truck hidden md:block -top-[7px] w-7 h-7 text-brand-red" strokeWidth={1.75} />
          {[1, 2, 3, 4].map((s, i) => (
            <li key={s} className="relative">
              <span className="relative z-10 flex w-10 h-10 items-center justify-center rounded-full bg-brand-green text-white font-display font-extrabold ring-8 ring-white">
                <span className="sr-only">{t('process_stop')} </span>
                {n(i)}
              </span>
              <h3 className="mt-5 font-display font-bold text-[18px] text-brand-ink">{t(`process_s${s}_title`)}</h3>
              <p className="mt-1.5 text-[14.5px] text-slate-600 leading-relaxed">{t(`process_s${s}_desc`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
