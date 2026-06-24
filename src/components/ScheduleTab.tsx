/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';

interface ScheduleTabProps {
  tasks: Task[];
  onAddTaskClick: () => void;
  onRegenerate: () => void;
  onToggleComplete?: (id: string) => void;
}

export default function ScheduleTab({
  tasks,
  onAddTaskClick,
  onRegenerate,
  onToggleComplete,
}: ScheduleTabProps) {
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenStep, setRegenStep] = useState(0);

  const handleRegenerateClick = () => {
    setIsRegenerating(true);
    setRegenStep(0);
    
    // Animate regeneration steps
    const timer1 = setTimeout(() => setRegenStep(1), 500);
    const timer2 = setTimeout(() => setRegenStep(2), 1000);
    const timer3 = setTimeout(() => {
      onRegenerate();
      setIsRegenerating(false);
    }, 1500);
  };

  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-[#FF3E00] border border-[#FF3E00]/30 bg-[#FF3E00]/5';
      case 'Medium':
        return 'text-white/80 border border-white/20 bg-white/5';
      case 'Low':
        return 'text-white/40 border border-white/10';
      default:
        return 'text-white/40 border border-white/10';
    }
  };

  const getIconBgColor = (category: string) => {
    switch (category) {
      case 'Deep Work':
        return 'border border-primary text-primary';
      case 'Rest':
        return 'border border-tertiary text-tertiary';
      case 'Meeting':
        return 'border border-white/30 text-white';
      default:
        return 'border border-white/10 text-white/60';
    }
  };

  const getBorderColor = (category: string) => {
    switch (category) {
      case 'Deep Work':
        return 'border-l-primary hover:border-primary';
      case 'Rest':
        return 'border-l-tertiary hover:border-tertiary';
      case 'Meeting':
        return 'border-l-white hover:border-white';
      default:
        return 'border-l-white/20 hover:border-white/50';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header Info & Actions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">// OCT 24 SCHEDULE</span>
            <h2 className="text-3xl font-black uppercase tracking-tight italic">DAILY_FLOW</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`material-symbols-outlined p-2.5 transition-all cursor-pointer ${
                showSearch ? 'bg-primary text-black' : 'hover:bg-white/10 text-white/60'
              }`}
            >
              search
            </button>
            <button
              onClick={handleRegenerateClick}
              disabled={isRegenerating}
              className="bg-primary hover:bg-white hover:text-black text-black px-4 py-2.5 flex items-center gap-2 transition-all active:scale-95 shadow-md font-black text-[10px] uppercase tracking-widest cursor-pointer select-none"
            >
              <span className={`material-symbols-outlined text-[14px] ${isRegenerating ? 'animate-spin' : ''}`}>
                refresh
              </span>
              Regenerate
            </button>
          </div>
        </div>

        {/* Search input bar */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <input
              type="text"
              placeholder="SEARCH ACTIVE FLOWS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-[#0D0D0D] border border-white/10 px-4 text-xs tracking-widest font-bold uppercase text-white focus:border-primary transition-all outline-none"
            />
          </motion.div>
        )}

        {/* Toggle Switch */}
        <div className="bg-[#0D0D0D] p-1 flex items-center self-start border border-white/10 w-fit select-none">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-5 py-2 font-black text-[10px] tracking-widest uppercase transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-primary text-black'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            TIMELINE
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-5 py-2 font-black text-[10px] tracking-widest uppercase transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-primary text-black'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            LIST VIEW
          </button>
        </div>
      </section>

      {/* Main Schedule Canvas */}
      <section className="relative flex flex-col gap-0">
        {/* Continuous Timeline Line (only visible in Timeline view) */}
        {viewMode === 'timeline' && filteredTasks.length > 0 && (
          <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-white/10 z-0" />
        )}

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {filteredTasks.map((task, index) => {
              const isMeetingNow = task.category === 'Meeting' && index === 2; // Mimic the 'NOW' meeting in the mockup
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex gap-4 group"
                >
                  {/* Timeline icon node */}
                  {viewMode === 'timeline' && (
                    <div className="z-10 flex-shrink-0">
                      <div className={`w-12 h-12 bg-[#050505] flex items-center justify-center ring-4 ring-[#050505] ${getIconBgColor(task.category)}`}>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                          {task.icon || 'task'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Task Card details */}
                  <div
                    onClick={() => onToggleComplete && onToggleComplete(task.id)}
                    className={`flex-1 bg-[#0D0D0D] p-5 border-l-4 hover:border-white/35 transition-all cursor-pointer select-none border border-white/5 ${getBorderColor(
                      task.category
                    )} ${task.isCompleted ? 'opacity-30 line-through italic text-white/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                        task.category === 'Deep Work' ? 'text-primary' : task.category === 'Rest' ? 'text-tertiary' : 'text-white'
                      }`}>
                        // {task.category}
                      </span>
                      {task.category === 'Meeting' ? (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 border border-error/40 bg-error/5 text-error">
                          <span className="text-[9px] uppercase font-black tracking-widest">Critical</span>
                        </div>
                      ) : (
                        <span className={`px-2 py-0.5 font-black text-[8px] uppercase tracking-widest ${getPriorityBadgeColor(task.priority)}`}>
                          {task.priority} Prio
                        </span>
                      )}
                    </div>

                    <h3 className="text-md font-black uppercase tracking-tight text-white mb-2">
                      {task.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/60 font-mono text-[11px] uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        <span>{task.startTime} - {task.endTime}</span>
                      </div>
                      {task.location ? (
                        <div className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{task.location}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">timelapse</span>
                          <span>
                            {task.duration >= 60 ? `${(task.duration / 60).toFixed(1)}h` : `${task.duration}m`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Current Time NOW indicator */}
                  {viewMode === 'timeline' && isMeetingNow && (
                    <div className="absolute w-full flex items-center gap-2 pointer-events-none -top-3 left-0">
                      <div className="w-2.5 h-2.5 bg-primary border border-black shadow-sm z-20" style={{ marginLeft: '18.5px' }} />
                      <div className="h-[1.5px] flex-grow bg-primary/40 relative">
                        <div className="absolute -top-5 left-3 bg-primary text-black text-[8px] px-1.5 py-0.5 font-black uppercase tracking-widest">
                          Active Now
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {filteredTasks.length === 0 && (
              <div className="text-center py-12 bg-[#0D0D0D] border border-dashed border-white/10 p-6">
                <span className="material-symbols-outlined text-3xl text-white/30 mb-2">
                  calendar_today
                </span>
                <p className="text-xs font-black uppercase tracking-widest text-white">No active matches found</p>
                <p className="text-xs text-white/50 font-light mt-1">Refine your search parameters or construct a new flow.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating Action / Contextual Micro-Task Box */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-8 flex flex-col items-center justify-center p-6 bg-[#0D0D0D] border border-dashed border-white/15 text-center"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4">
          // Found an unscheduled slot in your flow?
        </p>
        <button
          onClick={onAddTaskClick}
          className="bg-primary hover:bg-white hover:text-black text-black px-6 py-3 font-black text-[10px] tracking-widest uppercase active:scale-95 transition-all shadow-md cursor-pointer select-none"
        >
          Add Micro-Task
        </button>
      </motion.div>

      {/* Simulated AI Regenerating Modal Overlay */}
      <AnimatePresence>
        {isRegenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0D] p-8 border border-white/15 max-w-sm w-full mx-4 text-center space-y-6"
            >
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
                <span className="material-symbols-outlined text-3xl text-primary font-black">
                  psychology
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">AI Optimizing Schedule</h3>
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {regenStep === 0 && (
                      <motion.p
                        key="step0"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Analyzing cognitive energy levels...
                      </motion.p>
                    )}
                    {regenStep === 1 && (
                      <motion.p
                        key="step1"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Prioritizing deep focus blocks...
                      </motion.p>
                    )}
                    {regenStep === 2 && (
                      <motion.p
                        key="step2"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Balancing meeting buffers...
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
