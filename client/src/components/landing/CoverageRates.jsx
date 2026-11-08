import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// Mirrors server/controllers/parcelController.js calculateRate + 1% COD fee
const ZONES = [
  { id: 'inside_dhaka', base: 60, tag: 'rate1_tag', desc: 'rate1_desc', time: 'rate1_time' },
  { id: 'dhaka_suburb', base: 100, tag: 'rate2_tag', desc: 'rate2_desc', time: 'rate2_time' },
  { id: 'outside_dhaka', base: 130, tag: 'rate3_tag', desc: 'rate3_desc', time: 'rate3_time' },
];

function ZoneSelect({ value, onChange, label, options }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const selectedIndex = options.findIndex((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const choose = (i) => {
    onChange(options[i].id);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return setOpen(false);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      if (!open) {
        setActive(selectedIndex);
        return setOpen(true);
      }
      return setActive((a) => (a + dir + options.length) % options.length);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(active);
    }
  };

  return (
    <div className="text-sm font-semibold text-slate-700" ref={ref}>
      <span id="zone-label">{label}</span>
      <div className="relative mt-1.5">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="zone-label zone-button"
          id="zone-button"
          onClick={() => {
            setActive(selectedIndex);
            setOpen((o) => !o);
          }}
          onKeyDown={onKeyDown}
          className="w-full flex items-center justify-between bg-white text-brand-ink border border-slate-300 rounded-md px-3 py-2.5 text-left focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30"
        >
          <span>{options[selectedIndex].label}</span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby="zone-label"
            className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg py-1"
          >
            {options.map((o, i) => (
              <li
                key={o.id}
                role="option"
                aria-selected={o.id === value}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex items-center justify-between px-3 py-2.5 cursor-pointer text-brand-ink ${
                  i === active ? 'bg-brand-paper' : ''
                }`}
              >
                <span className={o.id === value ? 'font-bold' : 'font-medium'}>{o.label}</span>
                {o.id === value && <Check className="w-4 h-4 text-brand-green" aria-hidden="true" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CoverageRates() {
  const { t, lang } = useLanguage();
  const [zoneId, setZoneId] = useState('inside_dhaka');
  const [weight, setWeight] = useState(1);
  const [cod, setCod] = useState(1000);
  const [cover, setCover] = useState(false);

  const fmt = (n) => Number(n).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');
  const zone = ZONES.find((z) => z.id === zoneId);
  const kg = Math.max(0.1, parseFloat(weight) || 1);
  const delivery = zone.base + Math.max(0, Math.ceil(kg - 1)) * 20;
  const codFee = Math.round((parseFloat(cod) || 0) * 0.01);
  const coverFee = cover ? 1 : 0;

  const field =
    'w-full mt-1.5 bg-white text-brand-ink border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30';

  return (
    <section id="coverage" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-brand-ink">
          {t('coverage_title')}
        </h2>
        <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">{t('coverage_desc')}</p>

        <div className="mt-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Rate card */}
          <div className="lg:col-span-7">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-brand-ink text-sm text-slate-500">
                  <th scope="col" className="py-3 pr-4 font-semibold">{t('rates_zone')}</th>
                  <th scope="col" className="py-3 pr-4 font-semibold hidden sm:table-cell">{t('rates_time')}</th>
                  <th scope="col" className="py-3 font-semibold text-right">{t('rates_price')}</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map((z) => (
                  <tr key={z.id} className="border-b border-slate-200 align-top">
                    <th scope="row" className="py-6 pr-4 font-normal">
                      <span className="block font-display font-bold text-xl text-brand-ink">{t(z.tag)}</span>
                      <span className="block mt-1 text-sm text-slate-600 leading-relaxed max-w-sm">{t(z.desc)}</span>
                      <span className="block mt-1 text-sm font-semibold text-brand-green sm:hidden">{t(z.time)}</span>
                    </th>
                    <td className="py-6 pr-4 hidden sm:table-cell font-semibold text-brand-ink whitespace-nowrap">
                      {t(z.time)}
                    </td>
                    <td className="py-6 text-right font-display font-extrabold text-3xl text-brand-ink whitespace-nowrap">
                      ৳ {fmt(z.base)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-slate-600">{t('rates_note')}</p>
          </div>

          {/* Calculator */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="lg:col-span-5 bg-brand-paper rounded-lg p-6 sm:p-8 border-l-4 border-brand-green"
          >
            <h3 className="font-display font-bold text-2xl text-brand-ink">{t('calc_title')}</h3>

            <div className="mt-5 space-y-4">
              <ZoneSelect
                value={zoneId}
                onChange={setZoneId}
                label={t('calc_zone')}
                options={ZONES.map((z) => ({ id: z.id, label: t(z.tag) }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-slate-700">
                  {t('calc_weight')}
                  <input type="number" min="0.1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className={field} />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  {t('calc_cod')}
                  <input type="number" min="0" step="50" value={cod} onChange={(e) => setCod(e.target.value)} className={field} />
                </label>
              </div>
            </div>
            <label className="mt-4 flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={cover}
                onChange={(e) => setCover(e.target.checked)}
                className="w-4 h-4 accent-brand-green"
              />
              {t('calc_cover')}
            </label>

            <dl className="mt-6 pt-5 border-t border-slate-300 space-y-2 text-sm" aria-live="polite">
              <div className="flex justify-between">
                <dt className="text-slate-600">{t('calc_delivery')}</dt>
                <dd className="font-semibold">৳ {fmt(delivery)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">{t('calc_codfee')}</dt>
                <dd className="font-semibold">৳ {fmt(codFee)}</dd>
              </div>
              {cover && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">{t('calc_covfee')}</dt>
                  <dd className="font-semibold">৳ {fmt(coverFee)}</dd>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2">
                <dt className="font-bold text-brand-ink">{t('calc_total')}</dt>
                <dd className="font-display font-extrabold text-3xl text-brand-green">৳ {fmt(delivery + codFee + coverFee)}</dd>
              </div>
            </dl>

            <Link
              to="/register"
              className="mt-6 block text-center bg-brand-green text-white font-bold py-3 rounded-md hover:bg-brand-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              {t('calc_cta')}
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
