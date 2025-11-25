// components/mouse/useSmoothCursor.ts
import { useEffect, useRef, useState } from 'react';

/** Linear interpolation helper */
const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

/**
 * Hook that tracks mouse position and provides a smoothly interpolated cursor.
 * It also determines visibility based on whether the mouse is over interactive elements.
 */
export default function useSmoothCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOverComponent, setIsOverComponent] = useState(false);
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

    // Target position (actual mouse)
    const targetPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);

            const target = e.target as HTMLElement;
            const isOverInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('input') ||
                target.closest('[role="button"]') ||
                target.closest('.bg-white') ||
                target.closest('.bg-zinc-900') ||
                target.closest('.rounded-2xl') ||
                target.closest('.shadow-xl') ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT';
            setIsOverComponent(!!isOverInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        let animationFrame: number;
        const animate = () => {
            // Interpolate towards target position for a smooth trailing effect
            const newX = lerp(smoothPos.x, targetPos.current.x, 0.15);
            const newY = lerp(smoothPos.y, targetPos.current.y, 0.15);
            setSmoothPos({ x: newX, y: newY });
            animationFrame = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrame);
        };
    }, [smoothPos]);

    // Expose the smoothed position and visibility flags
    return {
        mousePosition: smoothPos,
        isVisible,
        isOverComponent,
    };
}
