'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the magnetic pull is
}

export default function MagneticButton({
    children,
    className = '',
    strength = 0.5,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button || !text) return;

        const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        // For text, we can move it slightly more/less if we want parallax, but for now let's keep it simple
        const textXTo = gsap.quickTo(text, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const textYTo = gsap.quickTo(text, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
            textXTo(x * (strength * 0.5)); // Text moves slightly less for depth
            textYTo(y * (strength * 0.5));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={buttonRef}
            className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
        >
            <span ref={textRef} className="relative z-10 block pointer-events-none">
                {children}
            </span>
        </div>
    );
}
