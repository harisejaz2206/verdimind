import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';

interface Quote {
  content: string;
  author: string;
}

export function Quote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(setQuote)
      .catch(console.error);
  }, []);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 text-white"
    >
      <div className="flex items-center gap-2 mb-2">
        <QuoteIcon className="w-5 h-5" />
        <h2 className="text-lg font-medium">Quote of the Day</h2>
      </div>
      <blockquote className="text-lg italic">"{quote.content}"</blockquote>
      <cite className="block mt-2 text-sm text-gray-300">— {quote.author}</cite>
    </motion.div>
  );
}