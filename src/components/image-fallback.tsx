"use client";

import { useState } from "react";

export function ImageWithFallback({ src, fallbackSrc, alt, className }: { src: string, fallbackSrc: string, alt: string, className?: string }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [error, setError] = useState(false);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => {
                if (!error) {
                    setImgSrc(fallbackSrc);
                    setError(true);
                } else {
                    const img = document.querySelector(`img[src="${fallbackSrc}"]`) as HTMLImageElement;
                    if (img) img.style.display = 'none';
                }
            }}
            style={{ display: error && imgSrc === fallbackSrc ? 'block' : 'block' }}
        />
    );
}
