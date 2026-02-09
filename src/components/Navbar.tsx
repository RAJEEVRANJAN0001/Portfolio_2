import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu when clicking on nav items
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        isDark 
          ? 'bg-gray-900/90 backdrop-blur-xl border-gray-800/50 shadow-lg shadow-black/10' 
          : 'bg-white/95 backdrop-blur-xl border-gray-200/60 shadow-lg shadow-gray-200/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-bold text-xl sm:text-2xl flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
              R
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 font-extrabold tracking-tight">
              Rajeev
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 relative group py-1 ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </motion.a>
            ))}

            {/* Theme Toggle - Desktop */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800/80 hover:bg-gray-700 text-cyan-400 border border-gray-700/50' 
                    : 'bg-gray-100 hover:bg-gray-200 text-cyan-600 border border-gray-200'
                }`}
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Theme Toggle - Mobile */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-cyan-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-cyan-600'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </motion.button>

            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-10 h-10 rounded-lg transition-colors duration-300 focus:outline-none flex items-center justify-center ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 relative">
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300"
                  animate={{
                    top: isOpen ? '50%' : '0%',
                    rotate: isOpen ? '45deg' : '0deg',
                    y: isOpen ? '-50%' : '0%'
                  }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 w-5 h-0.5 bg-current rounded-full transform -translate-y-1/2 transition-all duration-300"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300"
                  animate={{
                    bottom: isOpen ? '50%' : '0%',
                    rotate: isOpen ? '-45deg' : '0deg',
                    y: isOpen ? '50%' : '0%'
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ top: '72px' }}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className={`fixed left-0 right-0 lg:hidden border-b shadow-2xl ${
                isDark 
                  ? 'bg-gray-900/95 backdrop-blur-xl border-gray-800' 
                  : 'bg-white/95 backdrop-blur-xl border-gray-200'
              }`}
              style={{ top: '72px' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
