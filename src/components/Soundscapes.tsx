import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, Cloud, Coffee, TreePine, Waves, Radio } from 'lucide-react';
import { Howl } from 'howler';
import type { Soundscape } from '../types';

const soundscapes: Soundscape[] = [
  {
    id: 'rain',
    name: 'Rain & Thunder',
    icon: 'Cloud',
    description: 'Gentle rain with distant thunder',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-rain-and-thunder-1255.mp3',
    color: 'blue'
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    icon: 'Coffee',
    description: 'Cozy cafe ambience',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-coffee-shop-atmosphere-183.mp3',
    color: 'amber'
  },
  {
    id: 'forest',
    name: 'Forest Sounds',
    icon: 'TreePine',
    description: 'Peaceful nature sounds',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-forest-stream-1186.mp3',
    color: 'emerald'
  },
  {
    id: 'waves',
    name: 'Ocean Waves',
    icon: 'Waves',
    description: 'Calming ocean sounds',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-ocean-waves-1185.mp3',
    color: 'cyan'
  },
  {
    id: 'lofi',
    name: 'Lo-Fi Beats',
    icon: 'Music',
    description: 'Chill study beats',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    color: 'purple'
  }
];

const iconComponents = {
  Cloud,
  Coffee,
  TreePine,
  Waves,
  Music,
  Radio
};

export function Soundscapes() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);

  const toggleSound = (soundscape: Soundscape) => {
    if (activeSound === soundscape.id) {
      sound?.stop();
      setActiveSound(null);
      setSound(null);
    } else {
      sound?.stop();
      const newSound = new Howl({
        src: [soundscape.audioUrl],
        loop: true,
        volume: 0.5,
      });
      newSound.play();
      setSound(newSound);
      setActiveSound(soundscape.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="widget col-span-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-5 h-5" />
        <h2 className="text-lg font-medium">Soundscapes</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {soundscapes.map((soundscape) => {
          const Icon = iconComponents[soundscape.icon as keyof typeof iconComponents];
          const isActive = activeSound === soundscape.id;

          return (
            <motion.button
              key={soundscape.id}
              onClick={() => toggleSound(soundscape)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg glassmorphism flex flex-col items-center gap-2 transition-all ${
                isActive ? `border-${soundscape.color}-500/50 neon-glow` : ''
              }`}
            >
              <Icon className={`w-8 h-8 ${isActive ? `text-${soundscape.color}-400` : ''}`} />
              <span className={`text-sm ${isActive ? 'neon-text' : ''}`}>{soundscape.name}</span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex gap-1 mt-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scaleY: [1, 1.5, 1],
                        transition: {
                          repeat: Infinity,
                          duration: 1,
                          delay: i * 0.2,
                        },
                      }}
                      className={`w-1 h-3 rounded-full bg-${soundscape.color}-400`}
                    />
                  ))}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}