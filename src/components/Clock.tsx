import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-white"
    >
      <div className="flex items-center gap-2 mb-2">
        <ClockIcon className="w-5 h-5" />
        <h2 className="text-lg font-medium">Time</h2>
      </div>
      <div className="text-4xl font-bold font-mono">
        {format(time, 'HH:mm:ss')}
      </div>
      <div className="text-sm text-gray-300 mt-2">
        {format(time, 'EEEE, MMMM do, yyyy')}
      </div>
    </motion.div>
  );
}