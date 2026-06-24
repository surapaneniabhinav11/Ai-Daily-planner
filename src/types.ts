/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Task {
  id: string;
  name: string;
  duration: number; // in minutes
  energy: 'Low' | 'Mid' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  category: 'Deep Work' | 'Rest' | 'Meeting' | 'Task';
  startTime?: string;
  endTime?: string;
  location?: string;
  icon?: string;
  isCompleted?: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  optimizationGoal: 'Productivity' | 'Balance';
  precisionScheduling: boolean;
  chronotype: 'Morning' | 'Night';
  dailyBriefing: boolean;
  taskReminders: boolean;
  theme: 'Light' | 'Dark' | 'System';
  language: string;
}
