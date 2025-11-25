'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setDarkMode } from '@/store/features/uiSlice';
import { Moon, Sun, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const now = new Date().toLocaleTimeString();

  return (
    <header className={`sticky top-0 z-50 p-4 flex items-center justify-between ` + (!darkMode ? `bg-black/0 backdrop-blur-md border-b border-gray-800` : 'bg-black/90 backdrop-blur-md border-b border-gray-800')}>
      <motion.div className="flex items-center space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Globe className="w-6 h-6 text-blue-400" />
        <div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Latency Topology Visualizer</h1>
          <p className="text-sm text-gray-600">Crypto Infra Monitor • Live</p>
        </div>
      </motion.div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-green-500 animate-pulse" />
          <span suppressHydrationWarning>{now}</span>
        </div>
        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          className="p-2 rounded-full bg-black/0 hover:bg-black/10 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-black" />}
        </button>
      </div>
    </header>
  );
}