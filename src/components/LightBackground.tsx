"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function LightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef = useRef<number>();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    // ========== COLOR PALETTE ==========
    const C = {
      cyan: "rgba(8,145,178,",     // cyan-600
      blue: "rgba(37,99,235,",     // blue-600
      indigo: "rgba(79,70,229,",   // indigo-600
      violet: "rgba(124,58,237,",  // violet-600
      emerald: "rgba(5,150,105,",  // emerald-600
      amber: "rgba(217,119,6,",    // amber-600
      rose: "rgba(225,29,72,",     // rose-600
      slate: "rgba(100,116,139,",  // slate-500
    };

    // ========== 1. NEURAL NETWORK DIAGRAM (left side) ==========
    const drawNeuralNet = (t: number) => {
      const baseX = W * 0.08;
      const baseY = H * 0.12;
      const layers = [3, 5, 6, 4, 2];
      const layerGap = W * 0.065;
      const neuronGap = 28;
      const neurons: { x: number; y: number; layer: number }[] = [];

      // Draw neurons
      layers.forEach((count, li) => {
        const lx = baseX + li * layerGap;
        const startY = baseY - ((count - 1) * neuronGap) / 2;
        for (let ni = 0; ni < count; ni++) {
          const ny = startY + ni * neuronGap;
          neurons.push({ x: lx, y: ny, layer: li });
        }
      });

      // Draw connections
      let idx = 0;
      for (let li = 0; li < layers.length - 1; li++) {
        const start = idx;
        const nextStart = start + layers[li];
        for (let a = start; a < start + layers[li]; a++) {
          for (let b = nextStart; b < nextStart + layers[li + 1]; b++) {
            const nA = neurons[a];
            const nB = neurons[b];
            const pulse = Math.sin(t * 0.001 + a * 0.5 + b * 0.3) * 0.5 + 0.5;
            ctx.strokeStyle = C.indigo + (0.04 + pulse * 0.04) + ")";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nA.x, nA.y);
            ctx.lineTo(nB.x, nB.y);
            ctx.stroke();
          }
        }
        idx += layers[li];
      }

      // Draw neuron circles
      neurons.forEach((n, i) => {
        const pulse = Math.sin(t * 0.002 + i * 0.7) * 0.5 + 0.5;
        const colors = [C.cyan, C.blue, C.indigo, C.violet, C.emerald];
        const c = colors[n.layer];

        // Glow
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
        gr.addColorStop(0, c + (0.08 + pulse * 0.06) + ")");
        gr.addColorStop(1, c + "0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = c + (0.2 + pulse * 0.15) + ")";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer labels
      ctx.font = "8px monospace";
      const labelNames = ["Input", "Dense", "Hidden", "Dense", "Output"];
      layers.forEach((_, li) => {
        const lx = baseX + li * layerGap;
        ctx.fillStyle = C.slate + "0.12)";
        ctx.textAlign = "center";
        ctx.fillText(labelNames[li], lx, baseY + (layers[li] * neuronGap) / 2 + 18);
      });
    };

    // ========== 2. SCATTER PLOT with DECISION BOUNDARY (right side) ==========
    const scatterPoints = Array.from({ length: 60 }, () => ({
      x: Math.random() * 160 - 80,
      y: Math.random() * 120 - 60,
      cls: Math.random() > 0.5 ? 0 : 1,
    }));

    const drawScatterPlot = (t: number) => {
      const cx = W * 0.82;
      const cy = H * 0.2;

      // Axes
      ctx.strokeStyle = C.slate + "0.08)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 90, cy + 70);
      ctx.lineTo(cx + 90, cy + 70);
      ctx.moveTo(cx - 90, cy + 70);
      ctx.lineTo(cx - 90, cy - 70);
      ctx.stroke();

      // Axis labels
      ctx.font = "7px monospace";
      ctx.fillStyle = C.slate + "0.1)";
      ctx.textAlign = "center";
      ctx.fillText("Feature 1", cx, cy + 82);
      ctx.save();
      ctx.translate(cx - 100, cy);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("Feature 2", 0, 0);
      ctx.restore();

      // Decision boundary (animated curve)
      ctx.strokeStyle = C.violet + "0.1)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = -85; x < 85; x += 3) {
        const by = Math.sin((x + t * 0.01) * 0.05) * 30 + Math.cos(x * 0.03) * 15;
        x === -85
          ? ctx.moveTo(cx + x, cy + by)
          : ctx.lineTo(cx + x, cy + by);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Data points
      scatterPoints.forEach((p) => {
        const px = cx + p.x;
        const py = cy + p.y;
        const c = p.cls === 0 ? C.cyan : C.rose;
        ctx.fillStyle = c + "0.18)";
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = c + "0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    };

    // ========== 3. LOSS / ACCURACY CURVES (bottom-left) ==========
    const drawTrainingCurves = (t: number) => {
      const bx = W * 0.06;
      const by = H * 0.82;
      const cw = W * 0.22;
      const ch = 60;

      // Chart box
      ctx.strokeStyle = C.slate + "0.06)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bx, by - ch, cw, ch);

      // Grid lines
      for (let i = 1; i < 4; i++) {
        ctx.strokeStyle = C.slate + "0.03)";
        ctx.beginPath();
        ctx.moveTo(bx, by - (ch * i) / 4);
        ctx.lineTo(bx + cw, by - (ch * i) / 4);
        ctx.stroke();
      }

      // Label
      ctx.font = "8px monospace";
      ctx.fillStyle = C.slate + "0.1)";
      ctx.textAlign = "left";
      ctx.fillText("Training Loss", bx, by - ch - 5);

      // Loss curve (exponential decay)
      ctx.strokeStyle = C.rose + "0.15)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const animProgress = Math.min(1, (t % 12000) / 12000);
      for (let i = 0; i < cw * animProgress; i += 2) {
        const prog = i / cw;
        const loss = Math.exp(-prog * 3.5) * ch * 0.85;
        const noise = Math.sin(i * 0.15 + t * 0.001) * 3 * Math.exp(-prog * 2);
        const y = by - loss - noise - 5;
        i === 0 ? ctx.moveTo(bx + i, y) : ctx.lineTo(bx + i, y);
      }
      ctx.stroke();

      // Accuracy curve
      ctx.strokeStyle = C.emerald + "0.15)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < cw * animProgress; i += 2) {
        const prog = i / cw;
        const acc = (1 - Math.exp(-prog * 4)) * ch * 0.82;
        const noise = Math.sin(i * 0.12 + t * 0.0008) * 2 * Math.exp(-prog * 2);
        const y = by - acc - noise - 5;
        i === 0 ? ctx.moveTo(bx + i, y) : ctx.lineTo(bx + i, y);
      }
      ctx.stroke();

      // Legend
      ctx.fillStyle = C.rose + "0.12)";
      ctx.fillRect(bx + cw - 70, by - ch - 12, 6, 6);
      ctx.fillStyle = C.slate + "0.1)";
      ctx.font = "6px monospace";
      ctx.fillText("loss", bx + cw - 62, by - ch - 7);

      ctx.fillStyle = C.emerald + "0.12)";
      ctx.fillRect(bx + cw - 38, by - ch - 12, 6, 6);
      ctx.fillStyle = C.slate + "0.1)";
      ctx.fillText("acc", bx + cw - 30, by - ch - 7);

      // Epoch counter
      const epoch = Math.floor(animProgress * 100);
      ctx.fillStyle = C.slate + "0.08)";
      ctx.font = "7px monospace";
      ctx.textAlign = "right";
      ctx.fillText("epoch: " + epoch + "/100", bx + cw, by + 12);
    };

    // ========== 4. CONFUSION MATRIX (bottom-right) ==========
    const drawConfusionMatrix = (t: number) => {
      const bx = W * 0.78;
      const by = H * 0.78;
      const cellSize = 22;
      const matrix = [
        [0.92, 0.03, 0.05],
        [0.04, 0.88, 0.08],
        [0.02, 0.06, 0.92],
      ];
      const labels = ["Cat", "Dog", "Bird"];

      // Title
      ctx.font = "8px monospace";
      ctx.fillStyle = C.slate + "0.1)";
      ctx.textAlign = "center";
      ctx.fillText("Confusion Matrix", bx + cellSize * 1.5, by - 10);

      // Draw cells
      matrix.forEach((row, ri) => {
        row.forEach((val, ci) => {
          const x = bx + ci * cellSize;
          const y = by + ri * cellSize;
          const intensity = val;

          // Cell fill
          const color = ri === ci ? C.cyan : C.rose;
          ctx.fillStyle = color + (intensity * 0.12) + ")";
          ctx.fillRect(x, y, cellSize - 1, cellSize - 1);

          // Cell border
          ctx.strokeStyle = C.slate + "0.05)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cellSize - 1, cellSize - 1);

          // Value
          ctx.fillStyle = C.slate + "0.15)";
          ctx.font = "7px monospace";
          ctx.textAlign = "center";
          ctx.fillText(val.toFixed(2), x + cellSize / 2, y + cellSize / 2 + 2.5);
        });
      });

      // Row/Col labels
      ctx.fillStyle = C.slate + "0.08)";
      ctx.font = "6px monospace";
      labels.forEach((l, i) => {
        ctx.textAlign = "right";
        ctx.fillText(l, bx - 4, by + i * cellSize + cellSize / 2 + 2);
        ctx.textAlign = "center";
        ctx.fillText(l, bx + i * cellSize + cellSize / 2, by + cellSize * 3 + 10);
      });
    };

    // ========== 5. FLOATING ML FORMULAS ==========
    interface Formula {
      x: number;
      y: number;
      text: string;
      speed: number;
      alpha: number;
      alphaDir: number;
      size: number;
    }

    const formulas: Formula[] = [];
    const formulaTexts = [
      "\u2207L = 1/n \u2211(y\u0302-y)\u00B2",
      "P(A|B) = P(B|A)P(A)/P(B)",
      "\u03C3(z) = 1/(1+e\u207B\u1DBF)",
      "f(x) = max(0, x)",
      "L = -\u2211 y\u1D62 log(p\u1D62)",
      "w \u2190 w - \u03B1\u2207L",
      "softmax(z\u1D62) = e^z\u1D62/\u2211e^z",
      "MSE = 1/n\u2211(y-\u0177)\u00B2",
      "F\u2081 = 2\u00B7P\u00B7R/(P+R)",
      "y = Wx + b",
      "KL(P||Q) = \u2211P ln(P/Q)",
      "H(X) = -\u2211p(x)log p(x)",
      "\u03B8* = argmin L(\u03B8)",
      "Var(X) = E[X\u00B2] - (E[X])\u00B2",
      "R\u00B2 = 1 - SS_res/SS_tot",
      "AUC \u2248 0.96",
    ];
    for (let i = 0; i < 22; i++) {
      formulas.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        text: formulaTexts[i % formulaTexts.length],
        speed: 0.08 + Math.random() * 0.18,
        alpha: 0.03 + Math.random() * 0.04,
        alphaDir: (Math.random() < 0.5 ? 1 : -1) * (0.0002 + Math.random() * 0.0003),
        size: 8 + Math.random() * 3,
      });
    }

    const drawFormulas = () => {
      formulas.forEach((f) => {
        f.y -= f.speed;
        if (f.y < -20) {
          f.y = H + 20;
          f.x = Math.random() * W;
        }
        f.alpha += f.alphaDir;
        if (f.alpha > 0.07 || f.alpha < 0.02) f.alphaDir *= -1;

        ctx.font = f.size + "px monospace";
        ctx.fillStyle = C.indigo + f.alpha + ")";
        ctx.textAlign = "left";
        ctx.fillText(f.text, f.x, f.y);
      });
    };

    // ========== 6. DATA PIPELINE FLOW (center) ==========
    const drawDataPipeline = (t: number) => {
      const stages = [
        { label: "Raw Data", icon: "\u{1F4CA}" },
        { label: "Preprocess", icon: "\u2699" },
        { label: "Feature Eng", icon: "\u{1F527}" },
        { label: "Train", icon: "\u{1F9E0}" },
        { label: "Evaluate", icon: "\u2705" },
        { label: "Deploy", icon: "\u{1F680}" },
      ];
      const startX = W * 0.25;
      const y = H * 0.52;
      const gap = W * 0.09;

      stages.forEach((stage, i) => {
        const sx = startX + i * gap;

        // Box
        const pulse = Math.sin(t * 0.001 + i * 0.8) * 0.02;
        ctx.strokeStyle = C.cyan + (0.06 + pulse) + ")";
        ctx.lineWidth = 0.8;
        const bw = 48;
        const bh = 26;
        const rx = sx - bw / 2;
        const ry = y - bh / 2;

        // Rounded rect
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(rx + r, ry);
        ctx.lineTo(rx + bw - r, ry);
        ctx.quadraticCurveTo(rx + bw, ry, rx + bw, ry + r);
        ctx.lineTo(rx + bw, ry + bh - r);
        ctx.quadraticCurveTo(rx + bw, ry + bh, rx + bw - r, ry + bh);
        ctx.lineTo(rx + r, ry + bh);
        ctx.quadraticCurveTo(rx, ry + bh, rx, ry + bh - r);
        ctx.lineTo(rx, ry + r);
        ctx.quadraticCurveTo(rx, ry, rx + r, ry);
        ctx.closePath();
        ctx.stroke();

        // Fill
        ctx.fillStyle = C.cyan + "0.015)";
        ctx.fill();

        // Label
        ctx.font = "7px monospace";
        ctx.fillStyle = C.slate + "0.12)";
        ctx.textAlign = "center";
        ctx.fillText(stage.label, sx, y + 3);

        // Arrow to next
        if (i < stages.length - 1) {
          const arrowStart = sx + bw / 2 + 3;
          const arrowEnd = sx + gap - bw / 2 - 3;
          const arrowMid = (arrowStart + arrowEnd) / 2;

          // Animated data flow dot
          const progress = ((t * 0.0008 + i * 0.3) % 1);
          const dotX = arrowStart + (arrowEnd - arrowStart) * progress;

          ctx.strokeStyle = C.blue + "0.06)";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(arrowStart, y);
          ctx.lineTo(arrowEnd, y);
          ctx.stroke();

          // Arrow head
          ctx.fillStyle = C.blue + "0.06)";
          ctx.beginPath();
          ctx.moveTo(arrowEnd, y);
          ctx.lineTo(arrowEnd - 4, y - 2);
          ctx.lineTo(arrowEnd - 4, y + 2);
          ctx.closePath();
          ctx.fill();

          // Flow dot
          ctx.fillStyle = C.cyan + "0.25)";
          ctx.beginPath();
          ctx.arc(dotX, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // ========== 7. FEATURE IMPORTANCE BAR CHART (mid-right) ==========
    const drawFeatureImportance = (t: number) => {
      const bx = W * 0.72;
      const by = H * 0.5;
      const features = [
        { name: "age", val: 0.85 },
        { name: "bmi", val: 0.72 },
        { name: "gluc", val: 0.65 },
        { name: "bp", val: 0.48 },
        { name: "chol", val: 0.35 },
      ];
      const barH = 8;
      const barGap = 14;
      const maxW = 80;

      ctx.font = "7px monospace";
      ctx.fillStyle = C.slate + "0.1)";
      ctx.textAlign = "center";
      ctx.fillText("Feature Importance", bx + 20, by - 10);

      features.forEach((f, i) => {
        const y = by + i * barGap;
        const animProgress = Math.min(1, (t % 10000) / 4000);
        const bw = f.val * maxW * animProgress;

        // Label
        ctx.textAlign = "right";
        ctx.fillStyle = C.slate + "0.1)";
        ctx.fillText(f.name, bx - 8, y + barH / 2 + 2);

        // Bar background
        ctx.fillStyle = C.slate + "0.03)";
        ctx.fillRect(bx, y, maxW, barH);

        // Bar fill
        const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
        grad.addColorStop(0, C.cyan + "0.12)");
        grad.addColorStop(1, C.blue + "0.08)");
        ctx.fillStyle = grad;
        ctx.fillRect(bx, y, bw, barH);

        // Value
        if (animProgress > 0.5) {
          ctx.textAlign = "left";
          ctx.fillStyle = C.slate + "0.08)";
          ctx.font = "6px monospace";
          ctx.fillText(f.val.toFixed(2), bx + bw + 4, y + barH / 2 + 2);
        }
      });
    };

    // ========== 8. GRADIENT DESCENT VISUALIZATION (mid-left) ==========
    const drawGradientDescent = (t: number) => {
      const cx = W * 0.15;
      const cy = H * 0.55;
      const size = 60;

      // Title
      ctx.font = "8px monospace";
      ctx.fillStyle = C.slate + "0.1)";
      ctx.textAlign = "center";
      ctx.fillText("Gradient Descent", cx, cy - size - 8);

      // Draw contour lines (concentric ellipses)
      for (let r = 1; r <= 5; r++) {
        ctx.strokeStyle = C.blue + (0.04 + (5 - r) * 0.01) + ")";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * size / 5, r * (size * 0.6) / 5, 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Animated descent path (spiral towards center)
      const steps = 12;
      const animStep = (t * 0.0005) % steps;
      ctx.strokeStyle = C.amber + "0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i <= Math.min(animStep, steps); i++) {
        const prog = i / steps;
        const angle = prog * Math.PI * 3.5;
        const radius = (1 - prog) * size * 0.9;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius * 0.6;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Current position dot
      const curProg = Math.min(animStep, steps) / steps;
      const curAngle = curProg * Math.PI * 3.5;
      const curR = (1 - curProg) * size * 0.9;
      const dotX = cx + Math.cos(curAngle) * curR;
      const dotY = cy + Math.sin(curAngle) * curR * 0.6;

      ctx.fillStyle = C.amber + "0.3)";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Minimum star
      ctx.fillStyle = C.emerald + "0.15)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("\u2605", cx, cy + 4);
    };

    // ========== 9. SUBTLE BACKGROUND GRID ==========
    const drawSubtleGrid = () => {
      ctx.strokeStyle = "rgba(148,163,184,0.025)";
      ctx.lineWidth = 0.5;
      const spacing = 80;
      for (let x = 0; x < W; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    // ========== 10. SOFT GRADIENT ORBS ==========
    const drawOrbs = (t: number) => {
      const orbs = [
        { x: 0.85, y: 0.15, r: 300, c1: "rgba(8,145,178,0.04)", c2: "rgba(8,145,178,0)" },
        { x: 0.1, y: 0.85, r: 280, c1: "rgba(79,70,229,0.035)", c2: "rgba(79,70,229,0)" },
        { x: 0.5, y: 0.4, r: 250, c1: "rgba(124,58,237,0.025)", c2: "rgba(124,58,237,0)" },
      ];
      orbs.forEach((o, i) => {
        const ox = o.x * W + Math.sin(t * 0.0002 + i) * 40;
        const oy = o.y * H + Math.cos(t * 0.00025 + i) * 30;
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        gr.addColorStop(0, o.c1);
        gr.addColorStop(1, o.c2);
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      });
    };

    // ========== ANIMATION LOOP ==========
    const animate = () => {
      timeRef.current += 16;
      const t = timeRef.current;

      // Clear
      ctx.fillStyle = "rgba(248,250,252,0.12)";
      ctx.fillRect(0, 0, W, H);

      drawOrbs(t);
      drawSubtleGrid();
      drawNeuralNet(t);
      drawScatterPlot(t);
      drawTrainingCurves(t);
      drawConfusionMatrix(t);
      drawFormulas();
      drawDataPipeline(t);
      drawFeatureImportance(t);
      drawGradientDescent(t);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isDark]);

  if (isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1, transition: "opacity 1s ease-in-out" }}
    />
  );
}
