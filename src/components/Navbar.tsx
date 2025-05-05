import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, User, LogOut, LogIn, UserPlus, Home, Wallet, Info, HelpCircle, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, userRole, signOut } = useAuth(); // ✅ include userRole
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#0A2540] relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-[#1A8754]" />
            <span className="text-2xl font-bold text-[#F5B729]">CrickWin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
              <Info size={20} />
              <span>About</span>
            </Link>
            <Link to="/how-to-play" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
              <HelpCircle size={20} />
              <span>How to Play</span>
            </Link>
            <Link to="/matches" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
              <Trophy size={20} />
              <span>Matches</span>
            </Link>
            <Link to="/highlights" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
              <Bell size={20} />
              <span>Highlights</span>
            </Link>
            {user && (
              <Link to="/deposit" className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">
                <Wallet size={20} />
                <span>Deposit</span>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-2 text-[#F5B729] font-semibold hover:text-yellow-400 transition-colors duration-300">
                <User size={20} />
                <span>Admin Panel</span>
              </Link>
            )}

          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300"
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-300"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-6 py-2 bg-[#F5B729] text-[#0A2540] rounded-lg hover:bg-[#E3A82A] transition-colors duration-300"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-300 hover:text-[#F5B729] transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">About</Link>
              <Link to="/how-to-play" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">How to Play</Link>
              <Link to="/matches" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Matches</Link>
              <Link to="/highlights" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Highlights</Link>
              {user && (
                <Link to="/deposit" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Deposit</Link>
              )}
              {userRole === 'admin' && (
                <Link to="/admin" className="block px-3 py-2 text-[#F5B729] font-semibold hover:text-yellow-400 transition-colors duration-300">
                  Admin Panel
                </Link>
              )}

              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Dashboard</Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-red-500 hover:text-red-400 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-300 hover:text-[#F5B729] transition-colors duration-300">Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-[#F5B729] hover:text-[#E3A82A] transition-colors duration-300">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}