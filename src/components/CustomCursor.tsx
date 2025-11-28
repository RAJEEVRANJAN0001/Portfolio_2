'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; color: string }>>([]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let trailId = 0;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create trail effect
      setTrail((prev) => {
        const newTrail = [{ x: e.clientX, y: e.clientY, id: trailId++ }, ...prev];
        return newTrail.slice(0, 8); // Keep last 8 trail points
      });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') !== null || 
                           target.closest('button') !== null ||
                           target.style.cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Create particle burst on click
      const colors = ['#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        id: particleId++,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
      setParticles((prev) => [...prev, ...newParticles]);
      
      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1000);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail Effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: 8 - index * 0.5,
            height: 8 - index * 0.5,
            x: '-50%',
            y: '-50%',
            background: `rgba(6, 182, 212, ${0.5 - index * 0.06})`,
            boxShadow: `0 0 ${8 - index}px rgba(6, 182, 212, ${0.6 - index * 0.07})`,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Click Particles */}
      {particles.map((particle, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const distance = 50;
        
        return (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-50 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: 8,
              height: 8,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            initial={{ 
              scale: 0,
              x: 0,
              y: 0,
              opacity: 1
            }}
            animate={{ 
              scale: [0, 1, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        );
      })}

      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: isHovering ? 50 : 40,
            height: isHovering ? 50 : 40,
            x: '-50%',
            y: '-50%',
            borderColor: isHovering ? '#EC4899' : '#06B6D4',
            boxShadow: isHovering 
              ? '0 0 20px rgba(236, 72, 153, 0.6)' 
              : '0 0 15px rgba(6, 182, 212, 0.5)',
          }}
          animate={{
            scale: isClicking ? 0.8 : 1,
            rotate: 360,
          }}
          transition={{
            scale: { duration: 0.1 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Inner Dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            x: '-50%',
            y: '-50%',
            background: isHovering 
              ? 'linear-gradient(135deg, #EC4899, #F59E0B)' 
              : 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
            boxShadow: isHovering 
              ? '0 0 15px rgba(236, 72, 153, 0.8)' 
              : '0 0 10px rgba(6, 182, 212, 0.8)',
          }}
          animate={{
            scale: isClicking ? 1.5 : 1,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Click Ripple */}
        {isClicking && (
          <motion.div
            className="absolute rounded-full border-2 border-cyan-400"
            style={{
              width: 40,
              height: 40,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Hover Sparkles */}
        {isHovering && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: 0,
                  top: 0,
                }}
                animate={{
                  x: [0, Math.cos((i * Math.PI) / 2) * 30],
                  y: [0, Math.sin((i * Math.PI) / 2) * 30],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 20 20">
                  <path
                    d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                    fill="#FFD700"
                  />
                </svg>
              </motion.div>
            ))}
          </>
        )}

        {/* Text labels */}
        {isHovering && (
          <motion.div
            className="absolute left-12 top-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            Click me! ✨
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
