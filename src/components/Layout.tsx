import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme } from '../contexts/ThemeContext';

export function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-bg-dark' : 'bg-bg-light'}`}>
      <Navbar />
      <main className="flex-grow w-full max-w-none p-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}