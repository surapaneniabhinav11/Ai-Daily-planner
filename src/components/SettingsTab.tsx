/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface SettingsTabProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onLogOut: () => void;
}

export default function SettingsTab({
  profile,
  onUpdateProfile,
  onLogOut,
}: SettingsTabProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-20">
      <section className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">// USER PREFERENCES</span>
        <h2 className="text-3xl font-black uppercase tracking-tight italic">SETTINGS_ENGINE</h2>
      </section>

      {/* Bento Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 select-none">
        {/* User Profile Section */}
        <div className="md:col-span-8 bg-[#0D0D0D] border border-white/10 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/25">
              <span className="material-symbols-outlined text-primary font-bold text-[18px]">
                person
              </span>
            </div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white">User Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => onUpdateProfile({ fullName: e.target.value })}
                className="bg-[#050505] border border-white/10 px-4 py-2.5 focus:border-primary transition-all text-xs font-bold uppercase tracking-wider text-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onUpdateProfile({ email: e.target.value })}
                className="bg-[#050505] border border-white/10 px-4 py-2.5 focus:border-primary transition-all text-xs font-bold uppercase tracking-wider text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI Focus - Productivity vs Balance */}
        <div className="md:col-span-4 bg-[#0D0D0D] border border-white/10 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-tertiary/10 border border-tertiary/25">
                <span className="material-symbols-outlined text-tertiary font-bold text-[18px]">
                  psychology
                </span>
              </div>
              <h3 className="text-xs font-black tracking-widest uppercase text-white">AI Focus</h3>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
                Optimization Goal
              </label>
              <div className="flex p-1 bg-[#050505] border border-white/5">
                {(['Productivity', 'Balance'] as const).map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => onUpdateProfile({ optimizationGoal: goal })}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      profile.optimizationGoal === goal
                        ? 'bg-primary text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-[11px] font-black uppercase tracking-wider text-white/70">Precision Scheduling</span>
            <button
              type="button"
              onClick={() => onUpdateProfile({ precisionScheduling: !profile.precisionScheduling })}
              className={`w-12 h-6 p-1 transition-colors cursor-pointer border ${
                profile.precisionScheduling ? 'bg-primary border-primary' : 'bg-[#050505] border-white/20'
              }`}
            >
              <div
                className={`w-4.5 h-4 transition-all ${
                  profile.precisionScheduling ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white/50'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Chronotype Rhythms */}
        <div className="md:col-span-5 bg-[#0D0D0D] border border-white/10 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white mb-1">Daily Rhythms</h3>
            <p className="text-[11px] text-white/50 font-light leading-relaxed">
              Tell the AI when your cognitive energy peak occurs.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onUpdateProfile({ chronotype: 'Morning' })}
              className={`flex-1 flex flex-col items-center gap-2 p-4 border transition-all cursor-pointer ${
                profile.chronotype === 'Morning'
                  ? 'border-primary bg-primary/5'
                  : 'border-white/10 bg-[#050505] hover:border-white/35'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${profile.chronotype === 'Morning' ? 'text-primary' : 'text-white/50'}`}>
                light_mode
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider ${profile.chronotype === 'Morning' ? 'text-primary' : 'text-white/50'}`}>
                Morning Peak
              </span>
            </button>
            <button
              onClick={() => onUpdateProfile({ chronotype: 'Night' })}
              className={`flex-1 flex flex-col items-center gap-2 p-4 border transition-all cursor-pointer ${
                profile.chronotype === 'Night'
                  ? 'border-primary bg-primary/5'
                  : 'border-white/10 bg-[#050505] hover:border-white/35'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${profile.chronotype === 'Night' ? 'text-primary' : 'text-white/50'}`}>
                dark_mode
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider ${profile.chronotype === 'Night' ? 'text-primary' : 'text-white/50'}`}>
                Night Peak
              </span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="md:col-span-7 bg-[#0D0D0D] border border-white/10 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-container rounded-none border border-white/15">
              <span className="material-symbols-outlined text-white font-bold text-[18px]">
                notifications
              </span>
            </div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Daily Briefing</span>
                <span className="text-[10px] text-white/50 font-light mt-0.5">Receive an AI summary every morning</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateProfile({ dailyBriefing: !profile.dailyBriefing })}
                className={`w-12 h-6 p-1 transition-colors cursor-pointer border ${
                  profile.dailyBriefing ? 'bg-primary border-primary' : 'bg-[#050505] border-white/20'
                }`}
              >
                <div
                  className={`w-4.5 h-4 transition-all ${
                    profile.dailyBriefing ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white/50'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Task Reminders</span>
                <span className="text-[10px] text-white/50 font-light mt-0.5">Get notified 10m before task shifts</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateProfile({ taskReminders: !profile.taskReminders })}
                className={`w-12 h-6 p-1 transition-colors cursor-pointer border ${
                  profile.taskReminders ? 'bg-primary border-primary' : 'bg-[#050505] border-white/20'
                }`}
              >
                <div
                  className={`w-4.5 h-4 transition-all ${
                    profile.taskReminders ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white/50'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="md:col-span-12 bg-[#0D0D0D] border border-white/10 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-white font-bold text-[18px]">
                settings_suggest
              </span>
            </div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white">General</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
                Interface Theme
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['Light', 'Dark', 'System'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => onUpdateProfile({ theme: t })}
                    className={`flex items-center gap-1.5 px-4 py-2 border font-black text-[10px] tracking-wider uppercase cursor-pointer active:scale-95 transition-all ${
                      profile.theme === t
                        ? 'bg-primary border-primary text-black'
                        : 'border-white/10 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {t === 'Light' ? 'light_mode' : t === 'Dark' ? 'dark_mode' : 'settings_brightness'}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
                System Language
              </label>
              <select
                value={profile.language}
                onChange={(e) => onUpdateProfile({ language: e.target.value })}
                className="bg-[#050505] border border-white/10 px-4 py-2.5 focus:border-primary text-xs font-bold uppercase tracking-wider text-white w-full outline-none"
              >
                <option>English (United States)</option>
                <option>Deutsch (Deutschland)</option>
                <option>Français (France)</option>
                <option>日本語 (日本)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Log Out Box */}
        <div className="md:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <button
            onClick={onLogOut}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-error text-white font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all active:scale-95 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Log Out
          </button>
          <span className="text-[9px] font-black tracking-wider uppercase text-white/30 text-center sm:text-right">
            App Version 2.4.1 (Stable Build)
          </span>
        </div>
      </div>
    </div>
  );
}
