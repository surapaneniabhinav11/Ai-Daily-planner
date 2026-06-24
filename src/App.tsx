/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import LandingTab from './components/LandingTab';
import ScheduleTab from './components/ScheduleTab';
import InputTab from './components/InputTab';
import SettingsTab from './components/SettingsTab';
import { Task, UserProfile } from './types';
import {
  INITIAL_SCHEDULE,
  INITIAL_QUEUE,
  DEFAULT_USER_PROFILE,
  runAiScheduler,
} from './data/defaultData';

export default function App() {
  const [currentTab, setTab] = useState<string>('landing');

  // Load from local storage or fallback to defaults
  const [schedule, setSchedule] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ai_timetable_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const [queue, setQueue] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ai_timetable_queue');
    return saved ? JSON.parse(saved) : INITIAL_QUEUE;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ai_timetable_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('ai_timetable_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('ai_timetable_queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem('ai_timetable_profile', JSON.stringify(profile));
  }, [profile]);

  // Callbacks
  const handleAddTaskToQueue = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setQueue((prev) => [...prev, task]);
  };

  const handleDeleteTaskFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((t) => t.id !== id));
  };

  const handleGenerateSchedule = () => {
    // Run AI deterministic scheduler
    const newSchedule = runAiScheduler(queue, profile);
    setSchedule(newSchedule);
    setQueue([]); // Clear queue after generating
    setTab('schedule'); // Transition to Schedule tab
  };

  const handleRegenerateSchedule = () => {
    // Regenerate simulation: shuffle or re-prioritize schedule based on current tasks
    const activeTasks = schedule.filter((t) => !t.id.startsWith('rest-') && t.id !== 'lunch');
    const newSchedule = runAiScheduler(activeTasks, profile);
    setSchedule(newSchedule);
  };

  const handleToggleTaskComplete = (id: string) => {
    setSchedule((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleLogOut = () => {
    // Reset state to defaults
    setSchedule(INITIAL_SCHEDULE);
    setQueue(INITIAL_QUEUE);
    setProfile(DEFAULT_USER_PROFILE);
    setTab('landing');
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header currentTab={currentTab} setTab={setTab} />

      {/* Main Container */}
      <main className="flex-grow pt-20 pb-24 md:pb-8">
        {currentTab === 'landing' && (
          <LandingTab onGetStarted={() => setTab('schedule')} />
        )}
        {currentTab === 'schedule' && (
          <ScheduleTab
            tasks={schedule}
            onAddTaskClick={() => setTab('input')}
            onRegenerate={handleRegenerateSchedule}
            onToggleComplete={handleToggleTaskComplete}
          />
        )}
        {currentTab === 'input' && (
          <InputTab
            queue={queue}
            onAddTask={handleAddTaskToQueue}
            onDeleteTask={handleDeleteTaskFromQueue}
            onGenerateSchedule={handleGenerateSchedule}
          />
        )}
        {currentTab === 'settings' && (
          <SettingsTab
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onLogOut={handleLogOut}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavBar currentTab={currentTab} setTab={setTab} />
    </div>
  );
}
