import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import type { Weather } from '../types';

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code'
        );
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          description: getWeatherDescription(data.current.weather_code),
          icon: getWeatherIcon(data.current.weather_code)
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code: number): string => {
    if (code <= 3) return 'Clear';
    if (code <= 48) return 'Cloudy';
    return 'Rainy';
  };

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return 'sun';
    if (code <= 48) return 'cloud';
    return 'rain';
  };

  const IconComponent = {
    sun: Sun,
    cloud: Cloud,
    rain: CloudRain
  };

  if (loading) return null;
  if (!weather) return null;

  const Icon = IconComponent[weather.icon as keyof typeof IconComponent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-white"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-12 h-12" />
        <div>
          <div className="text-3xl font-bold">{weather.temperature}°C</div>
          <div className="text-gray-300">{weather.description}</div>
        </div>
      </div>
    </motion.div>
  );
}