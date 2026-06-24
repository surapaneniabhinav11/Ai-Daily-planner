/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onSearchClick?: () => void;
  avatarUrl?: string;
}

export default function Header({
  currentTab,
  setTab,
  onSearchClick,
  avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1MeOcq8OKPxPgRCVyiI0Tv929GfVYtaEQNSphOVQIsd-cRS2B4q21Z6mnpdeh_iEfz7Bt_hKCKiT5_NIY6y-99pR4zkoJyoqjK1KK1q--ioaX03f0DKq1qqqlZYMCIojfxyKCaHydi3igE_qUHgguS2VHft4kRLiNBi6dGcxSxIRe8JtuPmDxjYU2GfrwNeIhA9WKCSxCEi2U0XelhHbNbTKgICA6xgHeTk7uFEPX-ceGKeLJ7MjVcJ59cuVeddInkJrH1gbgMbg',
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-white/10 h-16 flex justify-between items-center px-4 md:px-12">
      {/* Logo & Brand */}
      <div 
        className="flex items-center gap-2 cursor-pointer select-none active:scale-98 transition-transform"
        onClick={() => setTab('landing')}
      >
        <span className="material-symbols-outlined text-primary text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_schedule
        </span>
        <h1 className="text-lg font-black tracking-tighter uppercase italic text-white hover:text-primary transition-colors">
          AI_TIMETABLE.NOVA
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-10">
        <button
          onClick={() => setTab('schedule')}
          className={`font-bold text-xs tracking-[0.2em] uppercase transition-all cursor-pointer py-1 ${
            currentTab === 'schedule'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => setTab('input')}
          className={`font-bold text-xs tracking-[0.2em] uppercase transition-all cursor-pointer py-1 ${
            currentTab === 'input'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Input Focus
        </button>
        <button
          onClick={() => setTab('settings')}
          className={`font-bold text-xs tracking-[0.2em] uppercase transition-all cursor-pointer py-1 ${
            currentTab === 'settings'
              ? 'text-primary'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Settings
        </button>
      </nav>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-3">
        {currentTab === 'schedule' && onSearchClick && (
          <button
            onClick={onSearchClick}
            className="material-symbols-outlined text-white/60 hover:text-primary p-2 rounded-full active:scale-95 transition-all cursor-pointer"
            style={{ fontSize: '22px' }}
          >
            search
          </button>
        )}
        
        <div 
          onClick={() => setTab('settings')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-primary transition-colors cursor-pointer select-none active:scale-95"
        >
          <img 
            className="w-full h-full object-cover" 
            src={avatarUrl} 
            alt="User avatar" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
