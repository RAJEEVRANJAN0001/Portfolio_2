'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create stars with varying properties for realism
    const createStars = () => {
      const stars: Star[] = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000); // Density based on screen size
      
      // Star color palette (various shades of white, blue, and warm tones)
      const colors = [
        'rgba(255, 255, 255, ', // Pure white
        'rgba(200, 220, 255, ', // Cool blue-white
        'rgba(255, 240, 220, ', // Warm white
        'rgba(220, 230, 255, ', // Pale blue
        'rgba(255, 250, 240, ', // Ivory
      ];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Variable star sizes
          opacity: Math.random() * 0.5 + 0.3, // Base opacity
          twinkleSpeed: Math.random() * 0.02 + 0.005, // Different twinkle rates
          twinkleOffset: Math.random() * Math.PI * 2, // Random phase offset
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      starsRef.current = stars;
    };

    // Create shooting star
    const createShootingStar = () => {
      if (Math.random() > 0.98) { // 2% chance per frame
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5, // Upper half of screen
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.random() * Math.PI / 6 + Math.PI / 4, // Diagonal direction
          opacity: 1
        });
      }
    };

    // Draw stars with twinkling effect
    const drawStars = (time: number) => {
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity + twinkle * 0.3;
        
        // Create glow effect for larger stars
        if (star.size > 1.5) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
          gradient.addColorStop(0, `${star.color}${currentOpacity})`);
          gradient.addColorStop(0.5, `${star.color}${currentOpacity * 0.5})`);
          gradient.addColorStop(1, `${star.color}0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw star core
        ctx.fillStyle = `${star.color}${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add cross pattern for brighter stars
        if (star.size > 1.2 && currentOpacity > 0.6) {
          ctx.strokeStyle = `${star.color}${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
        }
      });
    };

    // Draw shooting stars
    const drawShootingStars = () => {
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.opacity -= 0.01;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.opacity > 0 && star.x < canvas.width && star.y < canvas.height) {
          // Create gradient tail
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(0.3, `rgba(200, 220, 255, ${star.opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          ctx.stroke();

          // Add glow to head
          const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 4);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });
    };

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars(currentTime);
      drawShootingStars();
      createShootingStar();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    createStars();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark, mounted]);

  if (!mounted || !isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: isDark ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    />
  );
}
