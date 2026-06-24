/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BottomNavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function BottomNavBar({ currentTab, setTab }: BottomNavBarProps) {
  // Hide bottom navigation on landing page or let's keep it styled nicely for all screens
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#050505] shadow-[0px_-4px_24px_rgba(0,0,0,0.8)] border-t border-white/10 flex justify-around items-center px-4 py-2 pb-safe rounded-t-2xl">
      {/* Schedule Tab */}
      <button
        onClick={() => setTab('schedule')}
        className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl active:scale-90 transition-all duration-200 cursor-pointer ${
          currentTab === 'schedule'
            ? 'bg-primary text-black font-black'
            : 'text-white/60 hover:text-white'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[20px]" 
          style={{ fontVariationSettings: currentTab === 'schedule' ? "'FILL' 1" : "'FILL' 0" }}
        >
          calendar_today
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">Schedule</span>
      </button>

      {/* Input Tab */}
      <button
        onClick={() => setTab('input')}
        className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl active:scale-90 transition-all duration-200 cursor-pointer ${
          currentTab === 'input'
            ? 'bg-primary text-black font-black'
            : 'text-white/60 hover:text-white'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[20px]" 
          style={{ fontVariationSettings: currentTab === 'input' ? "'FILL' 1" : "'FILL' 0" }}
        >
          add_circle
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">Input</span>
      </button>

      {/* Settings Tab */}
      <button
        onClick={() => setTab('settings')}
        className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl active:scale-90 transition-all duration-200 cursor-pointer ${
          currentTab === 'settings'
            ? 'bg-primary text-black font-black'
            : 'text-white/60 hover:text-white'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[20px]" 
          style={{ fontVariationSettings: currentTab === 'settings' ? "'FILL' 1" : "'FILL' 0" }}
        >
          settings
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">Settings</span>
      </button>
    </nav>
  );
}
