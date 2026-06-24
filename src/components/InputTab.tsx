/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';

interface InputTabProps {
  queue: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onDeleteTask: (id: string) => void;
  onGenerateSchedule: () => void;
}

export default function InputTab({
  queue,
  onAddTask,
  onDeleteTask,
  onGenerateSchedule,
}: InputTabProps) {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState(60);
  const [energy, setEnergy] = useState<'Low' | 'Mid' | 'High'>('Mid');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    onAddTask({
      name: taskName,
      duration,
      energy,
      priority,
      category: energy === 'High' ? 'Deep Work' : 'Task',
      isCompleted: false,
    });

    setTaskName('');
    setDuration(60);
    setEnergy('Mid');
    setPriority('Medium');
  };

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setGenStep(0);

    const stepTimer1 = setTimeout(() => setGenStep(1), 600);
    const stepTimer2 = setTimeout(() => setGenStep(2), 1200);
    const stepTimer3 = setTimeout(() => setGenStep(3), 1800);
    const completeTimer = setTimeout(() => {
      onGenerateSchedule();
      setIsGenerating(false);
    }, 2400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8 pb-40 relative">
      {/* Title Header */}
      <section className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">// CREATE FLOW NODES</span>
        <h2 className="text-3xl font-black uppercase tracking-tight italic">TODAYS_FOCUS</h2>
        <p className="text-xs text-white/60 font-light max-w-md">
          Feed the engine with your targeted items, and our intelligence will sequence them based on cognitive load metrics.
        </p>
      </section>

      {/* Input Form Card */}
      <section className="bg-[#0D0D0D] p-6 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
              Task Designation
            </label>
            <input
              type="text"
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., ARCHITECTURE REVIEW SPRINT"
              className="w-full h-12 bg-[#050505] border border-white/15 px-4 text-xs font-bold uppercase tracking-wider text-white focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration Slider */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
                Duration (Minutes)
              </label>
              <div className="flex items-center gap-3 h-12 px-4 bg-[#050505] border border-white/15 select-none">
                <span className="material-symbols-outlined text-white/40 text-[18px]">
                  schedule
                </span>
                <input
                  type="range"
                  min="15"
                  max="240"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="flex-grow accent-primary cursor-pointer h-1"
                />
                <span className="text-xs font-black text-primary font-mono w-12 text-right">
                  {duration}M
                </span>
              </div>
            </div>

            {/* Energy Required */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
                Load Metric
              </label>
              <div className="flex gap-2 h-12 items-center">
                {(['Low', 'Mid', 'High'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setEnergy(lvl)}
                    className={`flex-1 h-10 font-black text-[10px] tracking-wider uppercase transition-all cursor-pointer active:scale-95 ${
                      energy === lvl
                        ? 'bg-primary text-black'
                        : 'bg-[#050505] border border-white/10 text-white/60 hover:border-white/35'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-white/50 block">
              Priority Ranking
            </label>
            <div className="flex gap-2">
              {(['Low', 'Medium', 'High'] as const).map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setPriority(prio)}
                  className={`px-6 h-10 font-black text-[10px] tracking-wider uppercase transition-all cursor-pointer active:scale-95 ${
                    priority === prio
                      ? 'bg-primary text-black'
                      : 'bg-[#050505] border border-white/10 text-white/60 hover:border-white/35'
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-primary transition-all shadow-xs cursor-pointer select-none"
          >
            <span className="material-symbols-outlined font-black text-[18px]">add</span>
            Add to Queue
          </button>
        </form>
      </section>

      {/* Added Tasks Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Flow Queue</h3>
          <span className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white">
            {queue.length} Active Node(s)
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {queue.map((task) => {
              const borderLeftClass =
                task.energy === 'High'
                  ? 'border-l-tertiary'
                  : task.energy === 'Mid'
                  ? 'border-l-primary'
                  : 'border-l-white/40';

              const energyTextClass =
                task.energy === 'High'
                  ? 'text-tertiary'
                  : task.energy === 'Mid'
                  ? 'text-primary'
                  : 'text-white/60';

              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0D0D0D] p-4 flex items-center justify-between border border-white/5 shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-10 ${borderLeftClass}`} />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wide text-white">
                        {task.name}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] font-mono uppercase tracking-wider text-white/50">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">schedule</span>
                          {task.duration}M
                        </span>
                        <span className={`font-bold ${energyTextClass}`}>
                          {task.energy} ENERGY
                        </span>
                        <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-[9px] font-black">
                          {task.priority} PRIO
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="material-symbols-outlined text-white/40 hover:text-error hover:bg-error/10 p-2 transition-all cursor-pointer select-none"
                    style={{ fontSize: '18px' }}
                  >
                    delete
                  </button>
                </motion.div>
              );
            })}

            {queue.length === 0 && (
              <div className="text-center py-10 bg-[#0D0D0D] border border-dashed border-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Queue vacant</p>
                <p className="text-[10px] text-white/40 font-light mt-1">Designate focus metrics above to feed the sequence compiler.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating Action bottom generate button */}
      {queue.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
          <div className="max-w-2xl mx-auto px-4 pb-4 md:pb-6 pointer-events-auto">
            <button
              onClick={handleGenerateClick}
              className="w-full h-14 bg-primary text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-white transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              Compile AI Schedule
            </button>
          </div>
        </div>
      )}

      {/* Full screen simulated AI scheduler generation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D0D0D] p-8 max-w-sm w-full mx-4 text-center space-y-6 border border-white/10"
            >
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-primary/5">
                <span className="material-symbols-outlined text-4xl text-primary font-black animate-pulse">
                  bolt
                </span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    stroke="#FF3E00"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - (genStep + 1) / 4)}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Assembling Timetable</h3>
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {genStep === 0 && (
                      <motion.p
                        key="gen0"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Compiling active tasks queue...
                      </motion.p>
                    )}
                    {genStep === 1 && (
                      <motion.p
                        key="gen1"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Calculating peak energy cycles...
                      </motion.p>
                    )}
                    {genStep === 2 && (
                      <motion.p
                        key="gen2"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-white/50"
                      >
                        Arranging deep focus buffers...
                      </motion.p>
                    )}
                    {genStep === 3 && (
                      <motion.p
                        key="gen3"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        className="text-[10px] font-black uppercase tracking-widest text-tertiary"
                      >
                        Sequence compilation successful!
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
