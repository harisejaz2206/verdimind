import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Coffee, Zap } from 'lucide-react';
import { Background } from './components/Background';
import { Clock } from './components/Clock';
import { WeatherWidget } from './components/Weather';
import { TodoList } from './components/TodoList';
import { Quote } from './components/Quote';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Soundscapes } from './components/Soundscapes';
import { Achievements } from './components/Achievements';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import type { Mood } from './types';

function App() {
  const [mood, setMood] = useState<Mood>('focused');
  const timeOfDay = useTimeOfDay();

  const moodButtons = [
    { mood: 'focused' as const, icon: Brain, label: 'Focused', color: 'blue' },
    { mood: 'chill' as const, icon: Coffee, label: 'Chill', color: 'emerald' },
    { mood: 'energized' as const, icon: Zap, label: 'Energized', color: 'rose' }
  ];

  // Dynamic theme colors based on time of day
  const timeThemes = {
    morning: 'from-blue-900 to-indigo-900',
    afternoon: 'from-indigo-900 to-purple-900',
    night: 'from-gray-900 to-black'
  };

  return (
    <div className={`min-h-screen text-white overflow-x-hidden bg-gradient-to-br ${timeThemes[timeOfDay]}`}>
      <Background mood={mood} timeOfDay={timeOfDay} />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          {moodButtons.map(({ mood: m, icon: Icon, label, color }) => (
            <motion.button
              key={m}
              onClick={() => setMood(m)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                mood === m
                  ? `glassmorphism neon-glow border border-${color}-500/30`
                  : 'bg-black/20 hover:bg-white/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${mood === m ? `text-${color}-400` : ''}`} />
              <span className={mood === m ? 'neon-text' : ''}>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mood}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Clock />
            <WeatherWidget />
            <PomodoroTimer />
            <TodoList />
            <Quote />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 space-y-6">
          <Soundscapes />
          <Achievements />
        </div>
      </div>
    </div>
  );
}

export default App;