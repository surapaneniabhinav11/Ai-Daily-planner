/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, UserProfile } from '../types';

export const INITIAL_SCHEDULE: Task[] = [
  {
    id: '1',
    name: 'Architecture Review',
    duration: 150, // 2.5h
    energy: 'High',
    priority: 'High',
    category: 'Deep Work',
    startTime: '09:00',
    endTime: '11:30',
    icon: 'psychology',
    isCompleted: false,
  },
  {
    id: '2',
    name: 'Mindful Break & Walk',
    duration: 30, // 30m
    energy: 'Low',
    priority: 'Low',
    category: 'Rest',
    startTime: '11:30',
    endTime: '12:00',
    icon: 'coffee',
    isCompleted: false,
  },
  {
    id: '3',
    name: 'Product Sync: Q4 Goals',
    duration: 60, // 1h
    energy: 'Mid',
    priority: 'High', // Critical in mockup
    category: 'Meeting',
    startTime: '13:00',
    endTime: '14:00',
    location: 'Meeting Room B',
    icon: 'groups',
    isCompleted: false,
  },
  {
    id: '4',
    name: 'Component Refactoring',
    duration: 150, // 2.5h
    energy: 'High',
    priority: 'Medium',
    category: 'Deep Work',
    startTime: '14:15',
    endTime: '16:45',
    icon: 'code',
    isCompleted: false,
  }
];

export const INITIAL_QUEUE: Task[] = [
  {
    id: 'q1',
    name: 'Financial Audit Review',
    duration: 90,
    energy: 'High',
    priority: 'High',
    category: 'Deep Work',
    icon: 'analytics',
    isCompleted: false,
  },
  {
    id: 'q2',
    name: 'Inbox Zero Sprint',
    duration: 30,
    energy: 'Mid',
    priority: 'Medium',
    category: 'Task',
    icon: 'mail',
    isCompleted: false,
  },
  {
    id: 'q3',
    name: 'Project Team Sync',
    duration: 45,
    energy: 'Low',
    priority: 'Low',
    category: 'Meeting',
    icon: 'groups',
    isCompleted: false,
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@design.co',
  optimizationGoal: 'Productivity',
  precisionScheduling: true,
  chronotype: 'Morning',
  dailyBriefing: true,
  taskReminders: false,
  theme: 'Light',
  language: 'English (United States)',
};

// Simple utility to format minutes back to HH:MM format
export function minutesToTimeStr(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  const hStr = hours.toString().padStart(2, '0');
  const mStr = mins.toString().padStart(2, '0');
  return `${hStr}:${mStr}`;
}

// Simple utility to convert HH:MM string to total minutes
export function timeStrToMinutes(timeStr: string): number {
  const [hoursStr, minutesStr] = timeStr.split(':');
  return parseInt(hoursStr, 10) * 60 + parseInt(minutesStr, 10);
}

// Simple deterministic scheduling algorithm simulating AI scheduling
export function runAiScheduler(
  queueTasks: Task[],
  profile: UserProfile,
  startHour: number = 9
): Task[] {
  let currentMinutes = startHour * 60; // 09:00 AM in minutes
  const scheduled: Task[] = [];

  // Sort queue by priority: Critical/High -> Medium -> Low
  const priorityMap = { High: 3, Medium: 2, Low: 1 };
  const energyMap = { High: 3, Mid: 2, Low: 1 };

  const sortedTasks = [...queueTasks].sort((a, b) => {
    const pDiff = priorityMap[b.priority] - priorityMap[a.priority];
    if (pDiff !== 0) return pDiff;
    return energyMap[b.energy] - energyMap[a.energy]; // higher energy first
  });

  sortedTasks.forEach((task, idx) => {
    // If chronotype is Night, maybe we shift high-energy tasks later, but let's keep it simple:
    // Schedule sequentially with lunch break or quick rest blocks.
    
    // Add rest break before high energy tasks if there was a previous intense task
    if (idx > 0 && task.energy === 'High' && scheduled[scheduled.length - 1].energy === 'High') {
      const restDuration = 15;
      scheduled.push({
        id: `rest-${idx}`,
        name: 'Quick Rest & Hydrate',
        duration: restDuration,
        energy: 'Low',
        priority: 'Low',
        category: 'Rest',
        startTime: minutesToTimeStr(currentMinutes),
        endTime: minutesToTimeStr(currentMinutes + restDuration),
        icon: 'coffee',
        isCompleted: false,
      });
      currentMinutes += restDuration;
    }

    // Schedule the actual task
    const startTime = minutesToTimeStr(currentMinutes);
    const endTime = minutesToTimeStr(currentMinutes + task.duration);
    
    let defaultIcon = task.icon || 'task';
    if (!task.icon) {
      if (task.name.toLowerCase().includes('sync') || task.name.toLowerCase().includes('meeting')) {
        defaultIcon = 'groups';
      } else if (task.name.toLowerCase().includes('code') || task.name.toLowerCase().includes('refactor')) {
        defaultIcon = 'code';
      } else if (task.name.toLowerCase().includes('audit') || task.name.toLowerCase().includes('financial')) {
        defaultIcon = 'analytics';
      } else if (task.category === 'Deep Work') {
        defaultIcon = 'psychology';
      } else if (task.category === 'Rest') {
        defaultIcon = 'coffee';
      }
    }

    scheduled.push({
      ...task,
      category: task.category || (task.energy === 'High' ? 'Deep Work' : 'Task'),
      startTime,
      endTime,
      icon: defaultIcon,
    });

    currentMinutes += task.duration;

    // Insert a mindful lunch/rest around 12:00 - 13:00 if crossed
    if (currentMinutes >= 12 * 60 && currentMinutes < 13 * 60 && !scheduled.some(s => s.name === 'Lunch Break')) {
      scheduled.push({
        id: 'lunch',
        name: 'Mindful Lunch Break',
        duration: 45,
        energy: 'Low',
        priority: 'Medium',
        category: 'Rest',
        startTime: minutesToTimeStr(currentMinutes),
        endTime: minutesToTimeStr(currentMinutes + 45),
        icon: 'restaurant',
        isCompleted: false,
      });
      currentMinutes += 45;
    }
  });

  return scheduled;
}
