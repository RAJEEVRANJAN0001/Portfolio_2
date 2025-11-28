'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const projects = [
    {
      title: "Brain Tumor Detection Using AI",
      year: "2024",
      description: "Built a deep learning classification pipeline using ResNet50 and DenseNet121, achieving 99.69% accuracy in identifying brain tumors across multiple MRI scan types.",
      technologies: ["Python", "TensorFlow", "ResNet50", "DenseNet121", "OpenCV", "NumPy"],
      achievements: [
        "99.69% accuracy in tumor classification",
        "Processed 3,264 annotated MRI images",
        "18% reduction in model overfitting",
        "Enhanced diagnostic speed for clinical workflows"
      ],
      category: "AI/ML",
      gradient: "from-cyan-500 via-blue-500 to-purple-600",
      glowColor: "cyan",
      github: "https://github.com/RAJEEVRANJAN0001/brainTumor",
      live: ''
    },
    {
      title: "Emotion Detection System",
      year: "2023",
      description: "Developed a real-time emotion recognition system using Convolutional Neural Networks (CNNs), achieving 80% accuracy across 7 emotion classes.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "CNNs", "Computer Vision"],
      achievements: [
        "80% accuracy across 7 emotion classes",
        "Processed over 10,000 facial images",
        "25% reduction in latency",
        "Real-time video streaming integration"
      ],
      category: "Computer Vision",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      glowColor: "purple",
      github: "https://github.com/RAJEEVRANJAN0001/Emotion-recognition",
      live: ''
    },
    {
      title: "Diabetic Retinopathy Detection",
      year: "2025",
      description: "Designed a CNN-based diagnostic pipeline using DenseNet-121 with CBAM attention mechanism to detect 5 DR stages, achieving 80% test accuracy on APTOS 2019 dataset.",
      technologies: ["Python", "DenseNet-121", "CBAM", "OpenCV", "Data Augmentation"],
      achievements: [
        "80% test accuracy on APTOS 2019 dataset",
        "Cohen's Kappa Score of 0.76",
        "Processed 3,662 retinal fundus images",
        "Balanced class distribution through augmentation"
      ],
      category: "Medical AI",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      glowColor: "emerald",
      github: "https://github.com/RAJEEVRANJAN0001/Diabetic-Retinopathy-Classification",
      live: ''
    },
    {
      title: 'App Generator - AI-Powered Code Generation Agent',
      year: '2025',
      description: 'An intelligent code generation system that converts natural language descriptions into complete applications. Uses planner→architect→coder agents and isolates output in agent/generated_project/.',
      technologies: ['Python', 'LangGraph', 'Groq', 'Pydantic'],
      achievements: [
        'Multi-agent pipeline (Planner → Architect → Coder)',
        'Isolates generated code under agent/generated_project/',
        'Programmatic and CLI usage supported'
      ],
      category: 'Tooling',
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      glowColor: "orange",
      github: 'https://github.com/RAJEEVRANJAN0001/Intelligent-code-generation-little-loveable-',
      live: ''
    },
    {
      title: 'Smart Weather Dashboard',
      year: '2024',
      description: 'Modern weather dashboard with glassmorphism UI. Real-time weather, hourly and 10-day forecasts, analytics, and astronomy data. Frontend: React + Tailwind; Backend: Node/Express.',
      technologies: ['React', 'Tailwind CSS', 'Axios', 'Node.js', 'WeatherAPI.com'],
      achievements: [
        'Responsive, glassmorphism-driven design',
        'Accurate forecasts and analytics',
        'Debounced search and geolocation support'
      ],
      category: 'Frontend / Backend',
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      glowColor: "blue",
      github: 'https://github.com/RAJEEVRANJAN0001/-Smart-Weather-Dashboard-tech-1',
      live: 'https://smart-weather-dashboard-tech-1.vercel.app/'
    },
    {
      title: 'Movie Ticket Booking (Full‑stack)',
      year: '2023',
      description: "Full‑stack movie ticket booking app: Django REST backend with JWT + React frontend. Features interactive seat selector, admin tools and integrations with OMDB metadata.",
      technologies: ['Django', 'DRF', 'React', 'Material-UI'],
      achievements: ['Interactive seat selector', 'JWT auth and admin tools', 'Ready for local dev with SQLite'],
      category: 'Full-stack',
      gradient: "from-rose-500 via-fuchsia-500 to-purple-500",
      glowColor: "rose",
      github: 'https://github.com/RAJEEVRANJAN0001/MoiveTicket',
      live: 'https://moive-ticket.vercel.app/'
    }
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = projects.length - 1;
      if (newIndex >= projects.length) newIndex = 0;
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      paginate(1);
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Gradient Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm tracking-wider uppercase">
                Portfolio Showcase
              </span>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient">
              Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Selected projects that demonstrate production-grade AI and web engineering.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative perspective-2000" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
          <div className="relative h-[600px] md:h-[650px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full max-w-5xl"
              >
                <div 
                  className={`group relative mx-auto bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/50 shadow-2xl hover:shadow-${projects[currentIndex].glowColor}-500/50 transition-all duration-500`}
                  onMouseEnter={() => setHoveredProject(currentIndex)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${projects[currentIndex].gradient}`} />
                  
                  {/* Animated Border Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${projects[currentIndex].gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

                  <div className="p-8 md:p-12 relative">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`px-4 py-2 rounded-xl bg-gradient-to-r ${projects[currentIndex].gradient} text-white font-bold text-sm shadow-lg`}
                          >
                            {projects[currentIndex].category}
                          </motion.div>
                          <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                            <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300">
                              {projects[currentIndex].year}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                          {projects[currentIndex].title}
                        </h3>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                          {projects[currentIndex].description}
                        </p>

                        {/* Technologies */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {projects[currentIndex].technologies.map((tech, idx) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-500 shadow-sm hover:scale-105 transition-transform"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <motion.a
                            href={projects[currentIndex].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r ${projects[currentIndex].gradient} text-white font-bold shadow-lg hover:shadow-xl transition-all group/btn`}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>View Code</span>
                            <motion.svg 
                              className="w-5 h-5"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                          </motion.a>
                          
                          {projects[currentIndex].live && (
                            <motion.a
                              href={projects[currentIndex].live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-600 group/live"
                            >
                              <motion.svg 
                                className="w-5 h-5"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </motion.svg>
                              <span>Live Demo</span>
                              <svg className="w-5 h-5 group-hover/live:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Achievements */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {projects[currentIndex].achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-700/30 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all group/achievement"
                            >
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${projects[currentIndex].gradient} flex items-center justify-center text-white text-xs font-bold group-hover/achievement:scale-110 transition-transform`}>
                                {idx + 1}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {achievement}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cyber Corner Decorations */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-purple-500/30 rounded-bl-2xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl text-gray-800 dark:text-white flex items-center justify-center group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl text-gray-800 dark:text-white flex items-center justify-center group"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? `w-12 h-3 bg-gradient-to-r ${projects[currentIndex].gradient}` 
                  : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Project Counter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            {' / '}
            <span className="text-gray-400 dark:text-gray-500">
              {String(projects.length).padStart(2, '0')}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
