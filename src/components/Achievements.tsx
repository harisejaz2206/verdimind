import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, CheckCircle, Zap, Star } from 'lucide-react';
import type { Achievement } from '../types';

const achievements: Achievement[] = [
  {
    id: 'focus_master',
    name: 'Focus Master',
    description: 'Complete 5 Pomodoro sessions',
    icon: 'Clock',
    progress: 0,
    maxProgress: 5,
    unlocked: false
  },
  {
    id: 'task_warrior',
    name: 'Task Warrior',
    description: 'Complete 10 tasks',
    icon: 'CheckCircle',
    progress: 0,
    maxProgress: 10,
    unlocked: false
  },
  {
    id: 'productivity_streak',
    name: 'Productivity Streak',
    description: 'Use the app for 5 consecutive days',
    icon: 'Zap',
    progress: 0,
    maxProgress: 5,
    unlocked: false
  }
];

const iconComponents = {
  Clock,
  CheckCircle,
  Zap,
  Star
};

export function Achievements() {
  const [userAchievements, setUserAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : achievements;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
  }, [userAchievements]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="widget col-span-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h2 className="text-lg font-medium">Achievements</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userAchievements.map((achievement) => {
          const Icon = iconComponents[achievement.icon as keyof typeof iconComponents];
          const progress = (achievement.progress / achievement.maxProgress) * 100;

          return (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg glassmorphism ${
                achievement.unlocked ? 'border-yellow-500/50 neon-glow' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-6 h-6 ${
                  achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>

              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full ${
                    achievement.unlocked
                      ? 'bg-yellow-400'
                      : 'bg-blue-500'
                  }`}
                />
              </div>
              <div className="text-right text-sm mt-1 text-gray-400">
                {achievement.progress}/{achievement.maxProgress}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}