import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-white"
    >
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5" />
        <h2 className="text-lg font-medium">Pomodoro Timer</h2>
      </div>

      <div className="text-4xl font-mono font-bold text-center mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 transition-colors"
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-600 hover:bg-gray-700 rounded-full p-3 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}