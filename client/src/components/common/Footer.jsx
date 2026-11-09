import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-white border-t border-slate-100 pt-8 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          
          {/* Column 1: Brand / About */}
          <div className="lg:col-span-1">
            <img src="/logo.png" alt="Nirapad Courier" className="h-8 w-auto mb-3 object-contain" />
            <p className="text-slate-500 text-xs leading-relaxed mb-3 font-normal">
              {t('footer_desc')}
            </p>
            
            <div className="flex space-x-2.5">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all text-xs" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all text-xs" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all text-xs" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all text-xs" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="font-bold text-brand-dark mb-2.5 text-xs uppercase tracking-wider">{t('footer_col_quick')}</h5>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="/#coverage" className="hover:text-brand-green transition-colors">Delivery Rates & Charges</a></li>
              <li><a href="/#about" className="hover:text-brand-green transition-colors">Why Nirapad Courier</a></li>
              <li><a href="/#coverage" className="hover:text-brand-green transition-colors">64 Districts Coverage</a></li>
              <li><a href="/#tracking" className="hover:text-brand-green transition-colors">Track Consignment</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Become a Delivery Rider</a></li>
            </ul>
          </div>

          {/* Column 3: Merchant Services */}
          <div>
            <h5 className="font-bold text-brand-dark mb-2.5 text-xs uppercase tracking-wider">{t('footer_col_merchant')}</h5>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-brand-green transition-colors">E-Commerce Doorstep COD</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Next-Day Payout (bKash/Bank)</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Zero Return Delivery Fee</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Exchange & Reverse Logistics</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Merchant API Integration</a></li>
            </ul>
          </div>

          {/* Column 4: Corporate */}
          <div>
            <h5 className="font-bold text-brand-dark mb-2.5 text-xs uppercase tracking-wider">{t('footer_col_corporate')}</h5>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Merchant Agreement</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Return & Refund Policy</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Corporate Inquiries</a></li>
            </ul>
          </div>

          {/* Column 5: Contact & Hubs */}
          <div>
            <h5 className="font-bold text-brand-dark mb-2.5 text-xs uppercase tracking-wider">{t('footer_col_contact')}</h5>
            <p className="text-xs text-slate-500 mb-1"><strong>Head Office:</strong> Tejgaon I/A, Dhaka-1208</p>
            <p className="text-xs text-slate-500 mb-1"><strong>Helpline:</strong> +880 9612-880088</p>
            <p className="text-xs text-slate-500 mb-2.5"><strong>Support:</strong> <span className="break-all">support@nirapadcourier.com.bd</span></p>
            <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-medium">
              <span className="block text-slate-900 font-bold mb-0.5">{t('footer_payout_title')}</span>
              bKash, Nagad, Rocket, All Scheduled Bangladeshi Banks
            </div>
          </div>
        </div>

        {/* Bottom Middle Copyright Notice */}
        <div className="border-t border-slate-100 pt-3 mt-5 text-center">
          <p className="text-xs text-slate-400 font-normal">
            {t('footer_copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

