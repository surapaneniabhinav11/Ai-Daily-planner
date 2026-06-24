/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface LandingTabProps {
  onGetStarted: () => void;
}

export default function LandingTab({ onGetStarted }: LandingTabProps) {
  const clockRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-16 overflow-hidden relative">
      {/* Background Graphic watermark */}
      <div className="absolute -left-16 top-1/3 -translate-y-1/2 opacity-4 select-none pointer-events-none z-0 hidden lg:block">
        <h2 className="text-[24rem] font-black leading-none uppercase italic tracking-tighter text-white">
          2026
        </h2>
      </div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6"
        >
          {/* Tagline Badge */}
          <div className="text-primary text-xs font-black tracking-[0.3em] uppercase">
            // AI-POWERED PRODUCTIVITY SYSTEMS
          </div>

          <h2 className="text-6xl md:text-[90px] font-black leading-[0.85] tracking-[-0.04em] uppercase italic">
            THE<br />
            ART OF<br />
            <span className="text-primary text-glow">FOCUS.</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed font-light">
            Forging optimal layouts where cognitive precision meets automated flow. We don't just schedule hours; we architect moments.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-primary text-black font-black text-xs tracking-widest uppercase transition-all hover:bg-white hover:text-black cursor-pointer active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 border border-white/20 text-white font-black text-xs tracking-widest uppercase transition-all hover:bg-white hover:text-black cursor-pointer active:scale-95"
            >
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-3">
              <img
                className="w-9 h-9 rounded-full border-2 border-background object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBudbhyBBmwQP_u2G8y4wNNyX4LyfX-_IxmlZrvrsO0m29m5AMVIhx8Avq-ozwOx56u5bRF1PRbpkB1zqVcTuMbau1K32cFKUHPpvIe717POOINKeRpcrrW_0mhwUeHlASKYgoxngg20u1nfhHwtA_9Dqy7KHsyh6Qs5F9m51o4IDzNVch2JpqBJu0z5LAgfAkr8djMYgDMc0XwBcf49xbtIxwk0FDYPtLxug3BpVN9m5Q5XwX__vNYoMEUKF-jve4K36V3SVvJ4p8"
                alt="User portrait"
                referrerPolicy="no-referrer"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-background object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLGqgt1U27yd_i3VfGY0NgsOhXI_lpt0FxjBwtfJCXtOL4oHXOic1Op8p_BYCfOYRYaPX7NOv-nXX03QBa2sNSdYHPRTHT9cJUa2Q27lnsps7JX78FhoKb0qCSm4gaUIPn0EgkhBc1vehIzK4E1Mx9qcbpl3hOGWTQTkaGpDxDsw2SUZiqmbIAdvASFhsBeuIRU15qra6tLZ44Ay2N-OoWr8Gp7izcM1K8aDIltGLxYPYhQ5hFSosf669furo-ZJ2USBWYBPoJKSc"
                alt="User portrait"
                referrerPolicy="no-referrer"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-background object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-4pOu9rrpaMhWC-Jp5OuRH4sgkWSsB77cjR-77XWfM1PI0P98JbEq8EMUvlQD-baPDlwqdHVIc7K7LMSsTi2e9jHSbBdLJjvXPs1jtWaXFSbqVdPFj-Af_gT9Qk1wp5vVPVhbA2iYS1vHQCr9g195cBQg5u0upX09WGF9eCQD00IjQDpVbJ_kt0x68okV9lV6fnVdtnEh7628HgWBJmv5Uf27JXwS4jZCsTwQECwiPq_Zx5a6PtAxdHtDT3j6c4NJm0oNSydFF1Q"
                alt="User portrait"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Joined by <span className="text-white font-black">10k+</span> High Achievers
            </span>
          </div>
        </motion.div>

        {/* Hero Interactive Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center"
        >
          {/* Main Clock Card */}
          <div
            ref={clockRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
            className="w-full max-w-[340px] aspect-square bg-[#0D0D0D] p-6 flex flex-col justify-center items-center gap-6 z-20 select-none border border-white/10"
          >
            {/* Clock circle */}
            <div className="relative w-44 h-44 rounded-full border-4 border-white/5 flex items-center justify-center">
              {/* Hands */}
              <div className="absolute w-1 h-16 bg-primary rounded-full origin-bottom -translate-y-1/2 rotate-[45deg]" />
              <div className="absolute w-1.5 h-12 bg-white/40 rounded-full origin-bottom -translate-y-1/2 rotate-[180deg]" />
              <div className="w-4 h-4 rounded-full bg-white z-10 border-2 border-[#0D0D0D]" />

              {/* Decorative timeline nodes inside clock */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-tertiary" />
            </div>

            <div className="text-center">
              <p className="text-sm font-black tracking-widest uppercase">Optimal Focus</p>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">// NEXT AT 10:00 AM</p>
            </div>
          </div>

          {/* Floating badge 1: Deep Work Done */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-4 md:right-12 w-44 bg-[#0D0D0D]/90 p-4 z-30 flex items-center gap-2.5 border border-white/10"
          >
            <span className="material-symbols-outlined text-tertiary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Focus Session</p>
              <p className="text-[11px] text-white/50 mt-0.5">COMPLETED: 2h 30m</p>
            </div>
          </motion.div>

          {/* Floating badge 2: Scheduling Loader */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 left-4 md:left-12 w-48 bg-[#0D0D0D]/90 p-4 z-30 flex flex-col gap-2 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">AI OPTIMIZING...</span>
              </div>
              <span className="text-[10px] font-bold text-primary">70%</span>
            </div>
            <div className="h-1 w-full bg-white/10 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '70%' }} />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <section className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 border-l-2 border-primary pl-3">
          // Smart Performance Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Adaptive Planning */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-[#0D0D0D] p-6 flex flex-col md:flex-row items-center gap-6 overflow-hidden border border-white/10 hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-black tracking-widest uppercase text-white">Adaptive Planning</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Our AI learns your neural rhythms and adapts your schedule dynamically when tasks shift.
              </p>
            </div>
            
            {/* Visual Block inside card */}
            <div className="w-full md:w-56 h-32 bg-[#050505] rounded-none p-4 flex flex-col justify-center gap-3 overflow-hidden relative border border-white/5">
              <div className="h-4 bg-[#111] w-full group-hover:translate-x-1 transition-transform flex items-center px-2">
                <div className="w-1.5 h-1.5 bg-primary mr-2" />
                <div className="h-1 bg-white/20 w-24" />
              </div>
              <div className="h-4 bg-primary/10 w-4/5 border border-primary/20 flex items-center px-2">
                <div className="w-1.5 h-1.5 bg-primary mr-2" />
                <div className="h-1 bg-primary/40 w-20" />
              </div>
              <div className="h-4 bg-[#111] w-full group-hover:-translate-x-1 transition-transform flex items-center px-2">
                <div className="w-1.5 h-1.5 bg-tertiary mr-2" />
                <div className="h-1 bg-white/20 w-32" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Energy Tracking */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0D0D0D] p-6 border border-white/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col justify-between gap-6"
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                analytics
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black tracking-widest uppercase text-white mb-1">Energy Synced</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Map peak complex tasks directly into high cognitive hours automatically.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
