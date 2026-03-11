import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Use Framer Motion values instead of React state for coordinates
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth springs for the outer ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only enable custom cursor on desktop
        if (window.innerWidth < 768) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Hide cursor natively with CSS class so it doesn't blink
    useEffect(() => {
        if (window.innerWidth >= 768) {
            document.body.classList.add('hide-native-cursor');
        }
        return () => document.body.classList.remove('hide-native-cursor');
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <>
            {/* Inner Dot */}
            <motion.div
                id="custom-cursor-dot"
                className="fixed top-0 left-0 w-2 h-2 bg-[#00f0ff] rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            {/* Outer Ring */}
            <motion.div
                id="custom-cursor-ring"
                className="fixed top-0 left-0 w-10 h-10 border border-[#00f0ff]/50 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                    borderColor: isHovering ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.5)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </>
    );
}
