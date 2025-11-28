import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ words, delay = 3000 }: { words: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350 + '')));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="inline-block min-w-[200px]">
      {`${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`}
    </span>
  );
};

export default function HeroProfessional() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900" />
        
        {/* Animated Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-6 border border-cyan-500/20"
            >
              Available for Hire
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
                Rajeev Ranjan
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-8 h-[40px]">
              I am a <span className="text-accent-bright"><Typewriter words={['AI & ML Developer', 'Full Stack Engineer', 'Problem Solver', 'Tech Enthusiast']} /></span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
              Building reliable production systems, research prototypes,
              and intuitive web experiences. I focus on practical ML, MLOps, and modern full-stack
              engineering to solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(6, 182, 212, 0.8)",
                  boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all relative group overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">View Projects</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Image / Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Spinning Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-purple-500/30"
              />
              
              {/* Image Container */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 rounded-full overflow-hidden shadow-2xl shadow-cyan-500/20 border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800"
              >
                <img src="/myphoto.png" alt="Rajeev" className="w-full h-full object-cover" />
              </motion.div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-8 bottom-20 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                  <div className="font-bold text-gray-900 dark:text-white">20+ Done</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
