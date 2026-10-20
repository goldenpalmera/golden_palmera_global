"use client";

import { useEffect, useRef } from "react";

export function MouseGlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");

    if (!canvas || !parent || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = false;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = bounds.width;
      height = bounds.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      animationFrame = 0;

      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;

      context.clearRect(0, 0, width, height);

      if (visible) {
        const radius = 240;
        const gradient = context.createRadialGradient(
          current.x,
          current.y,
          0,
          current.x,
          current.y,
          radius,
        );

        gradient.addColorStop(0, "rgba(201, 168, 76, 0.18)");
        gradient.addColorStop(0.3, "rgba(201, 168, 76, 0.09)");
        gradient.addColorStop(0.65, "rgba(201, 168, 76, 0.025)");
        gradient.addColorStop(1, "rgba(201, 168, 76, 0)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }

      const distance = Math.hypot(
        target.x - current.x,
        target.y - current.y,
      );

      if (visible && distance > 0.5) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const bounds = parent.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!inside) {
        visible = false;
        scheduleDraw();
        return;
      }

      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      visible = true;

      scheduleDraw();
    };

    const handlePointerLeave = () => {
      visible = false;
      scheduleDraw();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      context.clearRect(0, 0, width, height);
    };
  }, []);

  
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}