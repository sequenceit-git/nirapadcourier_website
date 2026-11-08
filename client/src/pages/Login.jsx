import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginMerchantApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginMerchantApi(formData);
      if (res.data.success) {
        login(res.data.data, res.data.data.token);
        navigate('/merchant');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Nirapad Courier" className="h-9 mx-auto mb-3 object-contain" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Merchant Login</h2>
          <p className="text-xs text-slate-500 mt-1">Access your deliveries, pickups, and payouts</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-brand-red rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                placeholder="01712345678 or merchant@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-green text-white font-bold text-xs rounded-xl hover:bg-brand-dark transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Logging in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-brand-green hover:underline">
            Register free
          </Link>
        </p>
      </div>
    </div>
  );
}

