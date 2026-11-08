import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyParcelsApi, createParcelApi } from '../services/api';
import { Plus, Package, DollarSign, Clock, CheckCircle, LogOut } from 'lucide-react';

export default function MerchantDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newParcel, setNewParcel] = useState({
    recipient: {
      name: '',
      phone: '',
      address: '',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      zone: 'inside_dhaka'
    },
    packageDetails: {
      weightKg: 1,
      codAmount: 1000
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchParcels();
  }, [user]);

  const fetchParcels = async () => {
    try {
      const res = await getMyParcelsApi();
      if (res.data.success) {
        setParcels(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createParcelApi(newParcel);
      if (res.data.success) {
        setShowModal(false);
        fetchParcels();
      }
    } catch (e) {
      alert(e.response?.data?.message || 'Error booking parcel');
    }
  };

  const totalCOD = parcels.reduce((sum, p) => sum + (p.packageDetails?.codAmount || 0), 0);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider">Merchant Portal</span>
          <h1 className="text-2xl font-black text-slate-900">{user?.businessName || user?.name}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Contact: {user?.phone} • {user?.email}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-brand-green text-white text-xs font-bold rounded-xl hover:bg-brand-dark transition-all flex items-center space-x-2 shadow-md shadow-green-900/10"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Parcel</span>
          </button>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 text-brand-green rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Total Consignments</span>
            <strong className="text-2xl font-black text-slate-900">{parcels.length}</strong>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Total COD Value</span>
            <strong className="text-2xl font-black text-slate-900">৳ {totalCOD.toLocaleString()}</strong>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Next-Day Payout Status</span>
            <strong className="text-base font-extrabold text-brand-green">Active (24h Guaranteed)</strong>
          </div>
        </div>
      </div>

      {/* Consignment Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">Recent Consignments</h3>
          <span className="text-xs text-slate-400 font-medium">Auto-synced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Tracking Code</th>
                <th className="py-3.5 px-6">Recipient</th>
                <th className="py-3.5 px-6">Destination</th>
                <th className="py-3.5 px-6">COD Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {parcels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No consignments found. Click "Book New Parcel" to create your first delivery.
                  </td>
                </tr>
              ) : (
                parcels.map((p) => (
                  <tr key={p.trackingCode} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-brand-green">
                      {p.trackingCode}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{p.recipient?.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{p.recipient?.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>{p.recipient?.district}</div>
                      <div className="text-[11px] text-slate-400">{p.recipient?.upazila}</div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      ৳ {p.packageDetails?.codAmount}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-brand-green">
                        {p.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={`/track/${p.trackingCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-brand-green hover:underline text-xs"
                      >
                        Track Live
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900 mb-4">Book New Consignment</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={newParcel.recipient.name}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      recipient: { ...newParcel.recipient, name: e.target.value }
                    })}
                    placeholder="Customer Name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newParcel.recipient.phone}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      recipient: { ...newParcel.recipient, phone: e.target.value }
                    })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={newParcel.recipient.address}
                  onChange={(e) => setNewParcel({
                    ...newParcel,
                    recipient: { ...newParcel.recipient, address: e.target.value }
                  })}
                  placeholder="House, Road, Area"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={newParcel.recipient.district}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      recipient: { ...newParcel.recipient, district: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Upazila</label>
                  <input
                    type="text"
                    value={newParcel.recipient.upazila}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      recipient: { ...newParcel.recipient, upazila: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zone</label>
                  <select
                    value={newParcel.recipient.zone}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      recipient: { ...newParcel.recipient, zone: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="inside_dhaka">Inside Dhaka (৳60)</option>
                    <option value="dhaka_suburb">Dhaka Suburb (৳100)</option>
                    <option value="outside_dhaka">Outside Dhaka (৳130)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={newParcel.packageDetails.weightKg}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      packageDetails: { ...newParcel.packageDetails, weightKg: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">COD Amount (৳)</label>
                  <input
                    type="number"
                    required
                    value={newParcel.packageDetails.codAmount}
                    onChange={(e) => setNewParcel({
                      ...newParcel,
                      packageDetails: { ...newParcel.packageDetails, codAmount: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-green text-white text-xs font-bold rounded-xl hover:bg-brand-dark"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

