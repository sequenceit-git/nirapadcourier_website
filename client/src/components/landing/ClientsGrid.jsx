import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ClientsGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-brand-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
            {t('brands_title')}
          </h2>
          <p className="text-slate-500 text-xs sm:text-[13px] max-w-xs mt-2 md:mt-0 leading-relaxed font-normal">
            {t('brands_desc')}
          </p>
        </div>

        {/* 14 Top Bangladeshi Brand SVGs in Grid */}
        <div className="bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-slate-200/80">
          
          {/* 1. WALTON */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[140px] group-hover:scale-105 transition-transform" viewBox="0 0 160 40" fill="none">
              <path d="M12 4L4 20L12 36L20 20L12 4Z" fill="#004B93"/>
              <path d="M28 4L20 20L28 36L36 20L28 4Z" fill="#004B93"/>
              <text x="44" y="27" fill="#004B93" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20" letterSpacing="0.5">WALTON</text>
            </svg>
          </div>

          {/* 2. Apex */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[130px] group-hover:scale-105 transition-transform" viewBox="0 0 130 40" fill="none">
              <path d="M14 6L6 20L10 20L14 12L18 20L22 20L14 6Z" fill="#22B14C"/>
              <text x="8" y="30" fill="#E31B23" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5">Apex</text>
            </svg>
          </div>

          {/* 3. Rokomari */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[130px] group-hover:scale-105 transition-transform" viewBox="0 0 130 40" fill="none">
              <text x="6" y="27" fill="#2D3748" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="22">রকমারি</text>
              <circle cx="17" cy="11" r="3.5" fill="#E52D27"/>
              <text x="84" y="18" fill="#718096" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="10">.com</text>
            </svg>
          </div>

          {/* 4. Othoba */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[135px] group-hover:scale-105 transition-transform" viewBox="0 0 135 40" fill="none">
              <g transform="translate(6, 7)">
                <path d="M5 9C5 5.5 8 3 12 3C16 3 19 5.5 19 9V11H5V9Z" stroke="#00AEEF" strokeWidth="2.2" fill="none"/>
                <rect x="2" y="10" width="20" height="15" rx="3" fill="#00AEEF"/>
                <circle cx="12" cy="17" r="3" fill="white"/>
              </g>
              <text x="36" y="27" fill="#334155" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="20">othoba</text>
              <text x="105" y="27" fill="#94A3B8" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="12">.com</text>
            </svg>
          </div>

          {/* 5. LOTTO */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-7 sm:h-8 w-auto max-w-[140px] group-hover:scale-105 transition-transform" viewBox="0 0 145 36" fill="none">
              <rect width="36" height="36" rx="4" fill="#D41421"/>
              <path d="M18 7L27 18L18 29L9 18L18 7Z" fill="white"/>
              <path d="M18 12L22 18L18 24L14 18L18 12Z" fill="#D41421"/>
              <rect x="40" width="105" height="36" rx="3" fill="#18181B"/>
              <text x="49" y="27" fill="white" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontStyle="italic" fontSize="22" letterSpacing="1">LOTTO</text>
            </svg>
          </div>

          {/* 6. Sailor */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <span className="font-serif font-black text-2xl sm:text-3xl text-slate-900 tracking-[-0.05em] group-hover:scale-105 transition-transform select-none">
              sailor
            </span>
          </div>

          {/* 7. JAMUNA */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[145px] group-hover:scale-105 transition-transform" viewBox="0 0 160 45" fill="none">
              <path d="M4 14L16 6L14 16L4 14Z" fill="#C4161C"/>
              <text x="22" y="18" fill="#C4161C" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.5">JAMUNA</text>
              <text x="23" y="27" fill="#18181B" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="6.5" letterSpacing="0.5">ELECTRONICS & AUTOMOBILES</text>
              <text x="23" y="37" fill="#C4161C" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7">দেশের জন্য, মানুষের পণ্য</text>
            </svg>
          </div>

          {/* 8. IFAD */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[140px] group-hover:scale-105 transition-transform" viewBox="0 0 145 42" fill="none">
              <path d="M12 24L18 8H24L18 24H12Z" fill="#EE5922"/>
              <text x="6" y="24" fill="#EE5922" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" letterSpacing="-0.5">IFAD</text>
              <text x="7" y="36" fill="#1E293B" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8.5" letterSpacing="1">MOTORS LIMITED</text>
            </svg>
          </div>

          {/* 9. NATURO */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[125px] group-hover:scale-105 transition-transform" viewBox="0 0 120 45" fill="none">
              <circle cx="60" cy="11" r="7" fill="#00A651"/>
              <path d="M60 7C62 9 63 12 60 14C57 12 58 9 60 7Z" fill="white"/>
              <text x="60" y="28" textAnchor="middle" fill="#00A651" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5">NATURO</text>
              <text x="60" y="37" textAnchor="middle" fill="#64748B" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6" letterSpacing="0.5">BACK TO NATURE</text>
            </svg>
          </div>

          {/* 10. Halal Food */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-9 sm:h-10 w-auto max-w-[80px] group-hover:scale-105 transition-transform" viewBox="0 0 80 50" fill="none">
              <path d="M40 3L68 25L40 47L12 25L40 3Z" fill="#18181B" stroke="#D4AF37" strokeWidth="2"/>
              <text x="40" y="25" textAnchor="middle" fill="#D4AF37" fontFamily="'Times New Roman', serif" fontWeight="900" fontSize="14">HF</text>
              <rect x="23" y="29" width="34" height="9" rx="1.5" fill="#D4AF37"/>
              <text x="40" y="36" textAnchor="middle" fill="#18181B" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="5">Halal Food</text>
            </svg>
          </div>

          {/* 11. GHORER BAZAR */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[130px] group-hover:scale-105 transition-transform" viewBox="0 0 135 45" fill="none">
              <g transform="translate(6, 8)">
                <path d="M12 2L2 9V24C2 25 3 26 4 26H20C21 26 22 25 22 24V9L12 2Z" stroke="#E85D04" strokeWidth="2.5" fill="none"/>
                <path d="M9 19C9 14 12 11 15 10C15 14 12 17 9 19Z" fill="#2E7D32"/>
                <path d="M15 19C15 15 13 13 10 12C10 16 13 18 15 19Z" fill="#4CAF50"/>
              </g>
              <text x="36" y="21" fill="#E85D04" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12">GHORER</text>
              <text x="36" y="33" fill="#E85D04" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12">BAZAR</text>
            </svg>
          </div>

          {/* 12. Akash */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[125px] group-hover:scale-105 transition-transform" viewBox="0 0 120 45" fill="none">
              <path d="M60 8C78 8 98 16 104 28" stroke="#E52D27" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <text x="8" y="32" fill="#009FE3" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28">আকাশ</text>
            </svg>
          </div>

          {/* 13. SANVEE'S */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[145px] group-hover:scale-105 transition-transform" viewBox="0 0 150 40" fill="none">
              <text x="34" y="26" fill="#782839" fontFamily="'Times New Roman', serif" fontWeight="900" fontSize="18" letterSpacing="1.5">SANVEE'S</text>
            </svg>
          </div>

          {/* 14. Aponzone */}
          <div className="h-28 sm:h-32 flex items-center justify-center p-6 hover:bg-slate-50/80 transition-colors group">
            <svg className="h-8 sm:h-9 w-auto max-w-[130px] group-hover:scale-105 transition-transform" viewBox="0 0 130 40" fill="none">
              <path d="M12 18C12 10 18 6 24 5C24 13 18 17 12 18Z" fill="#4CAF50"/>
              <text x="26" y="22" fill="#2E7D32" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="17">aponzone</text>
              <text x="65" y="32" fill="#81C784" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="9" fontStyle="italic">Agro</text>
            </svg>
          </div>

          {/* 15. Empty Tinted Cell */}
          <div className="h-28 sm:h-32 bg-slate-100/70 hidden lg:flex items-center justify-center p-6">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          </div>

        </div>
      </div>
    </section>
  );
}

