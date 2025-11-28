'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function AnimeCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNearMouse, setIsNearMouse] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  const messages = [
    "Let's code something awesome! 🚀",
    "Super developer powers activated! ⚡",
    "Ready to build amazing things! 🎯",
    "Your portfolio is heroic! 🌟",
    "Keep pushing forward! 💪",
    "Innovation mode: ON! ✨",
    "Debugging with super speed! 🐛",
    "Creating magic with code! "
  ];

  // Smooth spring animations for character position
  const characterX = useSpring(200, { stiffness: 60, damping: 25 });
  const characterY = useSpring(200, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (characterRef.current) {
        const rect = characterRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        // Character reacts when mouse is within 250px
        if (distance < 250) {
          setIsNearMouse(true);
        } else {
          setIsNearMouse(false);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Superhero flies towards click
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 80;
      
      characterX.set(e.clientX + offsetX);
      characterY.set(e.clientY + offsetY);
      
      // Show random message
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);
      setShowMessage(true);
      setIsFlying(true);
      
      setTimeout(() => setShowMessage(false), 3000);
      setTimeout(() => {
        setIsFlying(false);
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isNearMouse, showMessage, characterX, characterY]);

  return (
    <motion.div
      ref={characterRef}
      className="fixed pointer-events-none z-40"
      style={{
        x: characterX,
        y: characterY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: isNearMouse ? 1.15 : 1,
        rotate: isFlying ? 360 : 0,
      }}
      transition={{ 
        scale: { duration: 0.3 },
        rotate: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      {/* Superhero Boy Character using SVG */}
      <motion.div
        className="relative"
        animate={{
          y: isFlying ? [-5, -15, -5] : [-3, 3, -3],
        }}
        transition={{
          duration: isFlying ? 0.8 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glow effect when near mouse */}
        {isNearMouse && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}

        {/* Superhero Character SVG */}
        <svg
          width="120"
          height="140"
          viewBox="0 0 120 140"
          className="relative z-10 drop-shadow-2xl"
        >
          {/* Cape */}
          <motion.path
            d="M 40 35 Q 30 40 25 55 L 20 85 Q 18 95 25 100 L 30 90 L 35 70 L 38 50 Z"
            fill="url(#capeGradient)"
            animate={{
              d: isFlying 
                ? "M 40 35 Q 15 30 10 50 L 5 90 Q 3 100 15 105 L 25 85 L 35 65 L 38 50 Z"
                : "M 40 35 Q 30 40 25 55 L 20 85 Q 18 95 25 100 L 30 90 L 35 70 L 38 50 Z"
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M 80 35 Q 90 40 95 55 L 100 85 Q 102 95 95 100 L 90 90 L 85 70 L 82 50 Z"
            fill="url(#capeGradient)"
            animate={{
              d: isFlying 
                ? "M 80 35 Q 105 30 110 50 L 115 90 Q 117 100 105 105 L 95 85 L 85 65 L 82 50 Z"
                : "M 80 35 Q 90 40 95 55 L 100 85 Q 102 95 95 100 L 90 90 L 85 70 L 82 50 Z"
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Body - Superhero Suit */}
          <ellipse cx="60" cy="70" rx="20" ry="28" fill="url(#suitGradient)" />
          
          {/* Belt */}
          <rect x="45" y="75" width="30" height="5" fill="#FFD700" rx="2" />
          <circle cx="60" cy="77.5" r="4" fill="#FFA500" />
          
          {/* Chest Emblem - Lightning Bolt */}
          <path
            d="M 60 55 L 57 62 L 61 62 L 58 70 L 65 60 L 61 60 L 64 52 Z"
            fill="#FFD700"
            stroke="#FFA500"
            strokeWidth="0.5"
          />

          {/* Arms */}
          <motion.ellipse
            cx={isFlying ? "42" : "45"}
            cy={isFlying ? "62" : "65"}
            rx="6"
            ry="16"
            fill="url(#suitGradient)"
            transform={`rotate(${isFlying ? -45 : -25} 45 65)`}
            transition={{ duration: 0.5 }}
          />
          <motion.ellipse
            cx={isFlying ? "78" : "75"}
            cy={isFlying ? "62" : "65"}
            rx="6"
            ry="16"
            fill="url(#suitGradient)"
            transform={`rotate(${isFlying ? 45 : 25} 75 65)`}
            transition={{ duration: 0.5 }}
          />
          
          {/* Hands - Fists */}
          <motion.circle
            cx={isFlying ? "38" : "42"}
            cy={isFlying ? "75" : "78"}
            r="5"
            fill="#FFD4A3"
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx={isFlying ? "82" : "78"}
            cy={isFlying ? "75" : "78"}
            r="5"
            fill="#FFD4A3"
            transition={{ duration: 0.5 }}
          />

          {/* Legs */}
          <ellipse cx="53" cy="95" rx="5" ry="18" fill="#1E40AF" />
          <ellipse cx="67" cy="95" rx="5" ry="18" fill="#1E40AF" />
          
          {/* Boots */}
          <ellipse cx="53" cy="110" rx="6" ry="8" fill="#FFD700" />
          <ellipse cx="67" cy="110" rx="6" ry="8" fill="#FFD700" />

          {/* Head */}
          <circle cx="60" cy="35" r="18" fill="#FFD4A3" />
          
          {/* Hair - Spiky */}
          <path
            d="M 45 28 Q 42 22 45 18 L 48 20 Q 50 15 52 12 L 54 18 Q 57 12 60 10 Q 63 12 66 18 L 68 12 Q 70 15 72 20 L 75 18 Q 78 22 75 28 Q 72 32 68 34 Q 64 28 60 26 Q 56 28 52 34 Q 48 32 45 28 Z"
            fill="#4A3728"
          />

          {/* Eyes */}
          <motion.circle
            cx="53"
            cy="35"
            r="3"
            fill="#00D4FF"
            animate={{
              scale: isNearMouse ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: isNearMouse ? Infinity : 0 }}
          />
          <motion.circle
            cx="67"
            cy="35"
            r="3"
            fill="#00D4FF"
            animate={{
              scale: isNearMouse ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: isNearMouse ? Infinity : 0 }}
          />
          
          {/* Eye shine */}
          <circle cx="54" cy="34" r="1" fill="white" />
          <circle cx="68" cy="34" r="1" fill="white" />

          {/* Eyebrows */}
          <path d="M 49 31 Q 53 30 57 31" stroke="#3A2818" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 63 31 Q 67 30 71 31" stroke="#3A2818" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Smile */}
          <motion.path
            d={isNearMouse ? "M 52 42 Q 60 46 68 42" : "M 52 41 Q 60 43 68 41"}
            stroke="#3A2818"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            transition={{ duration: 0.3 }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="capeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C2D12" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Energy particles when flying */}
        <AnimatePresence>
          {isFlying && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    boxShadow: '0 0 10px #FFD700',
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i / 8) * Math.PI * 2) * 40,
                    y: Math.sin((i / 8) * Math.PI * 2) * 40,
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-2xl shadow-2xl">
              <div className="font-bold text-sm">{message}</div>
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-yellow-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Power aura when near mouse */}
      <AnimatePresence>
        {isNearMouse && (
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-yellow-400"
                style={{
                  left: '50%',
                  top: '50%',
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                animate={{
                  scale: [1, 1.8],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
