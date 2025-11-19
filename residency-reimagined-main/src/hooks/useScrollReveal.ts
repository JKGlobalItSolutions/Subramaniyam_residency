import { useEffect, useRef, useState } from 'react';

interface ScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = (options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, isVisible]);

  useEffect(() => {
    if (isVisible && elementRef.current) {
      elementRef.current.classList.add('scroll-visible');
    }
  }, [isVisible]);

  return { elementRef, isVisible };
};

// Variant for scroll reveal with specific class name
export const useScrollRevealClass = (className: string, options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, isVisible, className]);

  useEffect(() => {
    if (isVisible && elementRef.current) {
      elementRef.current.classList.add(className, 'scroll-visible');
    }
  }, [isVisible, className]);

  return { elementRef, isVisible };
};
