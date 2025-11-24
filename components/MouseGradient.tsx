'use client';

import { useEffect, useRef } from 'react';

export default function MouseGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            targetPos.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            // Smooth interpolation
            mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.1;
            mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.1;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient that follows mouse
            const gradient1 = ctx.createRadialGradient(
                mousePos.current.x,
                mousePos.current.y,
                0,
                mousePos.current.x,
                mousePos.current.y,
                500
            );
            gradient1.addColorStop(0, 'rgba(147, 51, 234, 0.3)'); // purple
            gradient1.addColorStop(0.5, 'rgba(236, 72, 153, 0.2)'); // pink
            gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');

            // Secondary gradient (opposite side)
            const gradient2 = ctx.createRadialGradient(
                canvas.width - mousePos.current.x,
                canvas.height - mousePos.current.y,
                0,
                canvas.width - mousePos.current.x,
                canvas.height - mousePos.current.y,
                400
            );
            gradient2.addColorStop(0, 'rgba(249, 115, 22, 0.2)'); // orange
            gradient2.addColorStop(0.5, 'rgba(236, 72, 153, 0.15)'); // pink
            gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');

            // Draw gradients
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
