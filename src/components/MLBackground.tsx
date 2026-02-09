'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Neuron {
  x: number; y: number;
  targetX: number; targetY: number;
  layer: number; index: number;
  activation: number; activationSpeed: number;
  radius: number; pulsePhase: number;
}

interface Synapse {
  from: number; to: number;
  weight: number; signalProgress: number;
  signalSpeed: number; active: boolean;
}

interface DataParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life: number;
  maxLife: number; hue: number;
}

interface FloatingSymbol {
  x: number; y: number;
  char: string; alpha: number;
  alphaDir: number; speed: number;
  size: number;
}

export default function MLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef = useRef<number>();
  const neuronsRef = useRef<Neuron[]>([]);
  const synapsesRef = useRef<Synapse[]>([]);
  const particlesRef = useRef<DataParticle[]>([]);
  const symbolsRef = useRef<FloatingSymbol[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  const createNetwork = useCallback((w: number, h: number) => {
    const neurons: Neuron[] = [];
    const synapses: Synapse[] = [];
    const layerSizes = [5, 8, 12, 10, 12, 8, 4];
    const layerGap = w / (layerSizes.length + 1);
    let neuronIdx = 0;

    layerSizes.forEach((count, layerI) => {
      const neuronGap = h / (count + 1);
      for (let n = 0; n < count; n++) {
        neurons.push({
          x: layerGap * (layerI + 1),
          y: neuronGap * (n + 1),
          targetX: layerGap * (layerI + 1),
          targetY: neuronGap * (n + 1),
          layer: layerI,
          index: neuronIdx++,
          activation: Math.random(),
          activationSpeed: 0.002 + Math.random() * 0.004,
          radius: 3 + Math.random() * 2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    });

    const layerStart = (li: number) => {
      let s = 0;
      for (let i = 0; i < li; i++) s += layerSizes[i];
      return s;
    };

    for (let li = 0; li < layerSizes.length - 1; li++) {
      const s1 = layerStart(li);
      const s2 = layerStart(li + 1);
      for (let a = 0; a < layerSizes[li]; a++) {
        for (let b = 0; b < layerSizes[li + 1]; b++) {
          if (Math.random() < 0.4) {
            synapses.push({
              from: s1 + a, to: s2 + b,
              weight: Math.random() * 2 - 1,
              signalProgress: Math.random(),
              signalSpeed: 0.003 + Math.random() * 0.008,
              active: Math.random() < 0.6,
            });
          }
        }
      }
      // skip connections
      if (li + 2 < layerSizes.length) {
        const s3 = layerStart(li + 2);
        for (let a = 0; a < layerSizes[li]; a++) {
          if (Math.random() < 0.08) {
            synapses.push({
              from: s1 + a,
              to: s3 + Math.floor(Math.random() * layerSizes[li + 2]),
              weight: Math.random() * 2 - 1,
              signalProgress: Math.random(),
              signalSpeed: 0.002 + Math.random() * 0.005,
              active: true,
            });
          }
        }
      }
    }
    neuronsRef.current = neurons;
    synapsesRef.current = synapses;
  }, []);

  const createSymbols = useCallback((w: number, h: number) => {
    const chars = [
      '\u03A3', '\u2202', '\u2207', '\u222B', '\u03C3', '\u03B8', '\u03BB', '\u03BC', '\u03C0',
      '\u0394', '\u03A9', '\u03C6', '\u03C8', '\u03B5', '\u221E',
      'ReLU', 'softmax', 'conv2d', 'LSTM', 'GAN', 'CNN', 'RNN', 'GPT', 'BERT',
      'loss', 'grad', 'epoch', 'batch', 'W\u00B7x+b', 'f(x)', 'P(y|x)',
      'attention', 'dropout', 'Adam', 'SGD', 'ResNet',
    ];
    const symbols: FloatingSymbol[] = [];
    for (let i = 0; i < 35; i++) {
      symbols.push({
        x: Math.random() * w,
        y: Math.random() * h,
        char: chars[Math.floor(Math.random() * chars.length)],
        alpha: Math.random() * 0.12 + 0.02,
        alphaDir: (Math.random() < 0.5 ? 1 : -1) * (0.0003 + Math.random() * 0.0006),
        speed: 0.12 + Math.random() * 0.25,
        size: 10 + Math.random() * 5,
      });
    }
    symbolsRef.current = symbols;
  }, []);

  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNetwork(window.innerWidth, window.innerHeight);
      createSymbols(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    /* ===== Drawing helpers ===== */

    const drawHexGrid = (time: number) => {
      const s = 65;
      const h = s * Math.sqrt(3);
      const pulse = Math.sin(time * 0.0003) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(6,182,212,${0.02 + pulse * 0.012})`;
      ctx.lineWidth = 0.4;
      for (let row = -1; row < window.innerHeight / h + 1; row++) {
        for (let col = -1; col < window.innerWidth / (s * 1.5) + 1; col++) {
          const cx = col * s * 1.5;
          const cy = row * h + (col % 2 === 0 ? 0 : h / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + (s / 2) * Math.cos(angle);
            const py = cy + (s / 2) * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    const drawSynapses = (time: number) => {
      const neurons = neuronsRef.current;
      synapsesRef.current.forEach((syn) => {
        const nF = neurons[syn.from];
        const nT = neurons[syn.to];
        if (!nF || !nT) return;

        const ba = syn.active ? 0.1 : 0.03;
        const pos = syn.weight > 0;
        const r = pos ? 6 : 168;
        const g = pos ? 182 : 85;
        const b = pos ? 212 : 247;

        ctx.strokeStyle = `rgba(${r},${g},${b},${ba})`;
        ctx.lineWidth = 0.5;
        const mX = (nF.x + nT.x) / 2;
        const mY = (nF.y + nT.y) / 2 + syn.weight * 12;

        ctx.beginPath();
        ctx.moveTo(nF.x, nF.y);
        ctx.quadraticCurveTo(mX, mY, nT.x, nT.y);
        ctx.stroke();

        if (syn.active) {
          syn.signalProgress += syn.signalSpeed;
          if (syn.signalProgress > 1) syn.signalProgress = 0;
          const t = syn.signalProgress;
          const st = 1 - t;
          const sx = st * st * nF.x + 2 * st * t * mX + t * t * nT.x;
          const sy = st * st * nF.y + 2 * st * t * mY + t * t * nT.y;

          const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, 5);
          gr.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
          gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = gr;
          ctx.beginPath();
          ctx.arc(sx, sy, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawNeurons = (time: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      neuronsRef.current.forEach((n) => {
        n.x = lerp(n.x, n.targetX, 0.02);
        n.y = lerp(n.y, n.targetY, 0.02);

        const dx = n.x - mx;
        const dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          const f = (120 - d) / 120;
          n.x += (dx / d) * f * 2.5;
          n.y += (dy / d) * f * 2.5;
        }

        n.activation = (Math.sin(time * n.activationSpeed + n.pulsePhase) + 1) / 2;
        const br = 0.3 + n.activation * 0.7;

        const layerColors = [
          [6, 182, 212],   // cyan
          [99, 102, 241],  // indigo
          [139, 92, 246],  // purple
          [168, 85, 247],  // violet
          [139, 92, 246],  // purple
          [99, 102, 241],  // indigo
          [16, 185, 129],  // emerald
        ];
        const [cr, cg, cb] = layerColors[n.layer] || [6, 182, 212];

        // outer glow
        const oR = n.radius * (3 + n.activation * 4);
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, oR);
        gr.addColorStop(0, `rgba(${cr},${cg},${cb},${br * 0.35})`);
        gr.addColorStop(0.4, `rgba(${cr},${cg},${cb},${br * 0.08})`);
        gr.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(n.x, n.y, oR, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${br})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // activation ring
        if (n.activation > 0.7) {
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(n.activation - 0.7) * 2.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    const spawnParticle = () => {
      if (particlesRef.current.length > 50) return;
      const edge = Math.random();
      let px: number, py: number, pvx: number, pvy: number;
      if (edge < 0.5) {
        px = -10;
        py = Math.random() * window.innerHeight;
        pvx = 0.4 + Math.random() * 0.8;
        pvy = (Math.random() - 0.5) * 0.4;
      } else {
        px = window.innerWidth + 10;
        py = Math.random() * window.innerHeight;
        pvx = -(0.4 + Math.random() * 0.8);
        pvy = (Math.random() - 0.5) * 0.4;
      }
      particlesRef.current.push({
        x: px, y: py, vx: pvx, vy: pvy,
        size: 1 + Math.random() * 1.5,
        life: 0,
        maxLife: 350 + Math.random() * 400,
        hue: [185, 260, 310, 160][Math.floor(Math.random() * 4)],
      });
    };

    const drawParticles = () => {
      const alive: DataParticle[] = [];
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) return;
        const fade =
          p.life < 40
            ? p.life / 40
            : p.life > p.maxLife - 80
              ? (p.maxLife - p.life) / 80
              : 1;
        ctx.fillStyle = `hsla(${p.hue},75%,60%,${0.45 * fade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        alive.push(p);
      });
      particlesRef.current = alive;
    };

    const drawSymbols = () => {
      symbolsRef.current.forEach((s) => {
        s.y -= s.speed;
        if (s.y < -30) {
          s.y = window.innerHeight + 30;
          s.x = Math.random() * window.innerWidth;
        }
        s.alpha += s.alphaDir;
        if (s.alpha > 0.14 || s.alpha < 0.015) s.alphaDir *= -1;
        ctx.fillStyle = `rgba(148,163,184,${s.alpha})`;
        ctx.font = `${s.size}px monospace`;
        ctx.fillText(s.char, s.x, s.y);
      });
    };

    const drawLossCurve = (time: number) => {
      const baseY = window.innerHeight * 0.88;

      // fill
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x < window.innerWidth; x += 3) {
        const p = x / window.innerWidth;
        const decay = Math.exp(-p * 3.5);
        const noise = Math.sin(x * 0.04 + time * 0.0008) * 4 * decay;
        ctx.lineTo(x, baseY - decay * 70 + noise + Math.sin(p * 18 + time * 0.0004) * 2);
      }
      ctx.lineTo(window.innerWidth, baseY + 30);
      ctx.lineTo(0, baseY + 30);
      ctx.closePath();
      const gr = ctx.createLinearGradient(0, baseY - 70, 0, baseY + 10);
      gr.addColorStop(0, 'rgba(16,185,129,0.12)');
      gr.addColorStop(1, 'rgba(16,185,129,0)');
      ctx.fillStyle = gr;
      ctx.fill();

      // stroke
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x < window.innerWidth; x += 3) {
        const p = x / window.innerWidth;
        const decay = Math.exp(-p * 3.5);
        const noise = Math.sin(x * 0.04 + time * 0.0008) * 4 * decay;
        ctx.lineTo(x, baseY - decay * 70 + noise + Math.sin(p * 18 + time * 0.0004) * 2);
      }
      ctx.strokeStyle = 'rgba(16,185,129,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawAttentionRings = (time: number) => {
      const centers = [
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.75 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      ];
      centers.forEach((c, ci) => {
        const ph = time * 0.0008 + ci * 2;
        for (let ring = 0; ring < 4; ring++) {
          const r = 30 + ring * 25 + Math.sin(ph + ring) * 10;
          const a = 0.04 - ring * 0.008;
          if (a <= 0) return;
          ctx.strokeStyle = `rgba(139,92,246,${a})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    /* ===== Animation loop ===== */

    const animate = () => {
      timeRef.current += 16;
      const t = timeRef.current;

      ctx.fillStyle = 'rgba(3,7,18,0.1)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      drawHexGrid(t);
      drawAttentionRings(t);
      drawSynapses(t);
      drawNeurons(t);
      drawLossCurve(t);
      drawSymbols();

      if (Math.random() < 0.06) spawnParticle();
      drawParticles();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isDark, createNetwork, createSymbols, lerp]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1, transition: 'opacity 1s ease-in-out' }}
    />
  );
}
