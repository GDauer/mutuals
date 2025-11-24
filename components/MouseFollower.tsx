'use client';

import { useEffect, useState } from 'react';

export default function MouseFollower() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isOverComponent, setIsOverComponent] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            // Check if mouse is over an interactive element
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

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const shouldShow = isVisible && !isOverComponent;

    return (
        <>
            {/* Main cursor follower - large glow */}
            <div
                className="pointer-events-none fixed z-0 transition-opacity duration-300"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    opacity: shouldShow ? 1 : 0,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(236, 72, 153, 0.1) 30%, rgba(249, 115, 22, 0.05) 60%, transparent 100%)',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            {/* Secondary cursor - smaller, more intense */}
            <div
                className="pointer-events-none fixed z-0 transition-opacity duration-300"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    opacity: shouldShow ? 1 : 0,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)',
                        filter: 'blur(20px)',
                    }}
                />
            </div>

            {/* Tiny dot cursor */}
            <div
                className="pointer-events-none fixed z-0 transition-opacity duration-300"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    opacity: shouldShow ? 1 : 0,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                    style={{
                        width: '8px',
                        height: '8px',
                        boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)',
                    }}
                />
            </div>
        </>
    );
}
