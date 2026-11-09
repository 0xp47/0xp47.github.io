"use client";

import { useEffect, useRef } from "react";

interface AnimatedNoiseProps {
  opacity?: number;
  className?: string;
}

const TILE_SIZE = 128;
const FRAME_COUNT = 4;

export function AnimatedNoise({ opacity = 0.05, className }: AnimatedNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Keep the backing buffer compact and let the GPU scale it smoothly;
    // avoids allocating megabytes of ImageData on every frame.
    canvas.width = TILE_SIZE * 2;
    canvas.height = TILE_SIZE * 2;

    // Pre-generate 4 reusable noise tiles ONCE on mount (zero per-frame Math.random/GC).
    const tiles: HTMLCanvasElement[] = [];
    for (let t = 0; t < FRAME_COUNT; t++) {
      const tile = document.createElement("canvas");
      tile.width = TILE_SIZE;
      tile.height = TILE_SIZE;
      const tileCtx = tile.getContext("2d");
      if (tileCtx) {
        const imageData = tileCtx.createImageData(TILE_SIZE, TILE_SIZE);
        const buf32 = new Uint32Array(imageData.data.buffer);
        for (let i = 0; i < buf32.length; i++) {
          const v = (Math.random() * 255) | 0;
          buf32[i] = (255 << 24) | (v << 16) | (v << 8) | v;
        }
        tileCtx.putImageData(imageData, 0, 0);
      }
      tiles.push(tile);
    }

    let animationId = 0;
    let frame = 0;
    let tileIdx = 0;
    let isVisible = true;

    const drawTile = () => {
      const tile = tiles[tileIdx];
      if (!tile) return;
      tileIdx = (tileIdx + 1) % FRAME_COUNT;
      ctx.drawImage(tile, 0, 0, TILE_SIZE, TILE_SIZE);
      ctx.drawImage(tile, TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
      ctx.drawImage(tile, 0, TILE_SIZE, TILE_SIZE, TILE_SIZE);
      ctx.drawImage(tile, TILE_SIZE, TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };

    const startOrStop = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
      if (!isVisible) return;

      const animate = () => {
        if (!isVisible) return;
        frame++;
        if (frame % 4 === 0) {
          drawTile();
        }
        animationId = requestAnimationFrame(animate);
      };
      drawTile();
      animationId = requestAnimationFrame(animate);
    };

    startOrStop();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isVisible = entry.isIntersecting;
          startOrStop();
        },
        { threshold: 0 }
      );
      observer.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      observer?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
    />
  );
}
