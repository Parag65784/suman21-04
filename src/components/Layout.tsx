import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-dark">
      <Navbar />
      <main className="flex-grow w-full max-w-none p-0"> {/* Removed padding to eliminate gaps */}
        {/* The Outlet renders the nested route components */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
