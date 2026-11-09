import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trackParcelApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Box, MapPin, CheckCircle2, Clock, Truck, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export default function TrackResult() {
  const { code } = useParams();
  const { t } = useLanguage();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTracking() {
      setLoading(true);
      setError('');
      try {
        const res = await trackParcelApi(code);
        if (res.data.success) {
          setParcel(res.data.data);
        } else {
          setError(res.data.message || 'Consignment not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || `Consignment '${code}' could not be located.`);
      } finally {
        setLoading(false);
      }
    }
    if (code) {
      fetchTracking();
    }
  }, [code]);

  return (
    <div className="pt-24 sm:pt-28 pb-12 sm:pb-20 min-h-screen max-w-5xl mx-auto px-4 sm:px-6">
      <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-brand-green hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {loading ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-slate-200">
          <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold text-sm">Searching Nirapad Logistics Network for {code}...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 text-center shadow-sm border border-red-100 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-800 mb-2">Tracking ID Not Found</h2>
          <p className="text-xs text-slate-500 mb-6 break-words">{error}</p>
          <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 mb-6 text-left">
            <p className="font-bold mb-1">Try one of our active demo consignments:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link to="/track/NC-202611" className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-mono font-bold text-brand-green">
                NC-202611
              </Link>
              <Link to="/track/NC-778899" className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-mono font-bold text-brand-green">
                NC-778899
              </Link>
            </div>
          </div>
          <Link to="/" className="px-6 py-2.5 bg-brand-green text-white text-xs font-bold rounded-full">
            Try Another Search
          </Link>
        </div>
      ) : parcel ? (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Box className="w-3.5 h-3.5" />
                <span>Tracking Number</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono break-all">
                {parcel.trackingCode}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Destination: <span className="font-bold text-slate-700">{parcel.recipient?.district || 'Bangladesh'}</span> • COD Amount: <span className="font-bold text-brand-green">৳ {parcel.packageDetails?.codAmount}</span>
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                parcel.status === 'delivered' ? 'bg-green-100 text-brand-green' : 'bg-amber-100 text-amber-800'
              }`}>
                {parcel.status.replace('_', ' ')}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                OTP Status: {parcel.isOtpVerified ? 'Verified ✓' : 'Secured'}
              </span>
            </div>
          </div>

          {/* Timeline and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline Column */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 mb-6 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-green" />
                <span>Consignment Journey Timeline</span>
              </h3>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {parcel.timeline?.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[10px] ring-4 ring-green-100">
                      ✓
                    </span>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-3">
                        <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                        <span className="text-[11px] text-slate-400">
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      {item.location && (
                        <div className="inline-flex items-center space-x-1 text-[11px] text-slate-400 mt-1.5">
                          <MapPin className="w-3 h-3 text-brand-red" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Shipment Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">Recipient Details</h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Name:</span>
                    <strong className="text-slate-900">{parcel.recipient?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact:</span>
                    <span className="font-mono text-slate-800">{parcel.recipient?.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Delivery Address:</span>
                    <p className="text-slate-700 leading-relaxed">{parcel.recipient?.address}, {parcel.recipient?.upazila}, {parcel.recipient?.district}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4">Charges & Safety</h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee:</span>
                    <strong className="text-slate-900">৳ {parcel.packageDetails?.deliveryFee}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>COD Commission (1%):</span>
                    <strong className="text-slate-900">৳ {parcel.packageDetails?.codFee}</strong>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-sm text-brand-dark">
                    <span>Total Cash to Collect:</span>
                    <span className="text-brand-red">৳ {parcel.packageDetails?.codAmount}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : null}
    </div>
  );
}

