import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-2xl border border-[#1A3A5C]">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl text-[#004aad]">
              <img className="w-14 h-14" src='https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/teamlogo/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtbG9nby9sb2dvLnBuZyIsImlhdCI6MTc0NjUxNTc5MiwiZXhwIjoxNzc4MDUxNzkyfQ.msQqgUyvfmrQLL0KB2Z-uWvIySbOQqV8CBXX0RPaoHA'/>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h2>
          
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#0A1929] border border-[#1A3A5C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#cb6ce6] transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#0A1929] border border-[#1A3A5C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[cb6ce6] transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#004aad] text-white font-bold rounded-lg hover:bg-[#cb6ce6] transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-[#0A2540] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#F5B729] hover:text-[#E3A82A] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}