import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Truck } from 'lucide-react';

const DEMO_CODE = 'NC-202611';
const STEPS = ['slip_s1', 'slip_s2', 'slip_s3', 'slip_s4', 'slip_s5'];
const REACHED = 3; // the sample slip is "in transit"

function CountUp({ to, suffix = '', duration = 1800 }) {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) return;
    let raf;
    let start;
    const tick = (now) => {
      start = start ?? now;
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, reduce]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function WaybillSlip() {
  const { t, lang } = useLanguage();
  const cod = (1450).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

  return (
    <div className="relative slip-float">
      <div className="slip w-full max-w-[22rem] mx-auto" aria-hidden="true">
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">{t('slip_label')}</p>
              <p className="font-display font-extrabold text-xl tracking-tight">{DEMO_CODE}</p>
            </div>
            <img src="/logo.png" alt="" className="h-8 w-auto" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <p className="text-xs text-slate-500">{t('slip_from')}</p>
              <p className="font-semibold">Tejgaon, Dhaka</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t('slip_to')}</p>
              <p className="font-semibold">Panchlaish, Chattogram</p>
            </div>
          </div>

          <ol className="mt-5 space-y-2.5">
            {STEPS.map((key, i) => {
              const done = i < REACHED;
              return (
                <li key={key} className="flex items-center gap-3 text-sm">
                  <span className="relative w-4 h-4 shrink-0">
                    {i === REACHED - 1 && <span className="slip-ping" />}
                    <span
                      className={`slip-dot relative block w-4 h-4 rounded-full border-2 ${
                        done ? 'bg-brand-green border-brand-green' : 'bg-white border-slate-300'
                      }`}
                      style={done ? { animationDelay: `${0.7 + i * 0.5}s` } : { animation: 'none' }}
                    />
                  </span>
                  <span className={i === REACHED - 1 ? 'font-bold' : done ? '' : 'text-slate-400'}>
                    {t(key)}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="slip-tear px-5 pt-5 pb-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">{t('slip_cod')}</p>
              <p className="font-display font-extrabold text-xl">৳ {cod}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">{t('slip_otp')}</p>
              <p className="font-display font-extrabold text-xl tracking-[0.3em]">••••</p>
            </div>
          </div>
          <div className="barcode mt-4" />
        </div>

        <div className="slip-stamp absolute -bottom-6 -left-2 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-brand-red text-brand-red flex items-center justify-center text-center font-display font-extrabold text-[13px] leading-tight bg-white/80 rotate-[-14deg]">
          নিরাপদ
          <br />
          Nirapad
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    navigate(`/track/${trackingCode.trim().toUpperCase()}`);
  };

  const headLeading = lang === 'bn' ? 'leading-[1.25]' : 'leading-[1.02]';

  return (
    <section id="hero" className="relative overflow-hidden bg-brand-dark text-white pt-24 sm:pt-28 lg:pt-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className={`font-display font-extrabold tracking-tight text-[clamp(34px,4.4vw,54px)] ${headLeading}`}>
              {t('hero_title_1')}
              <br />
              {t('hero_title_2')}
            </h1>

            <p className="mt-5 max-w-xl text-[clamp(15px,1.4vw,17px)] text-white/80 leading-relaxed">
              {t('hero_desc')}
            </p>

            <form
              id="tracking"
              onSubmit={handleTrack}
              className="mt-8 flex flex-col sm:flex-row max-w-xl bg-white rounded-lg p-1.5 gap-1.5 shadow-xl"
            >
              <label htmlFor="track-input" className="sr-only">{t('track_btn')}</label>
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-brand-green shrink-0" aria-hidden="true" />
                <input
                  id="track-input"
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder={t('track_placeholder')}
                  className="w-full py-3 text-[15px] text-slate-900 font-semibold placeholder:font-normal placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-red text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-red-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('track_btn')}
              </button>
            </form>

            <p className="mt-3 text-[13px] text-white/70">
              {t('try_code')}:{' '}
              <button
                type="button"
                onClick={() => setTrackingCode(DEMO_CODE)}
                className="font-bold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
              >
                {DEMO_CODE}
              </button>
            </p>
          </div>

          <div className="relative lg:col-span-5 py-6 lg:py-0">
            {/* The red disc of the flag, anchored behind the slip and cropped by the section */}
            <div
              aria-hidden="true"
              className="absolute rounded-full bg-brand-red w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[620px] lg:h-[620px] right-[-60px] lg:right-[-170px] top-1/2 -translate-y-1/2"
            />
            <WaybillSlip />
          </div>
        </div>

        {/* Promises and reach, one ruled strip */}
        <div className="relative mt-12 lg:mt-16 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6">
          <Truck aria-hidden="true" className="truck-drive -top-[31px] w-8 h-8 text-white/90" strokeWidth={1.5} />
          {['badge_payout', 'badge_cod', 'badge_return', 'badge_cover'].map((k) => (
            <p key={k} className="py-3 sm:py-4 text-sm font-semibold border-b border-white/10 md:border-b-0">
              {t(k)}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-3 border-t border-white/20 divide-x divide-white/20">
          {[
            [495, '+', 'stat_upazilas'],
            [1, 'K+', 'stat_merchants'],
            [20, 'K+', 'stat_delivered'],
          ].map(([n, suffix, k], i) => (
            <div key={k} className={`py-4 sm:py-5 ${i ? 'pl-3 sm:pl-8' : ''}`}>
              <p className="font-display font-extrabold text-xl sm:text-[30px]">
                <CountUp to={n} suffix={suffix} />
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">{t(k)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
