import { useEffect, RefObject } from 'react';

interface AnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useAnimateOnScroll = (
  ref: RefObject<HTMLElement>,
  animationClass: string = 'appear',
  options: AnimateOnScrollOptions = {}
): void => {
  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(animationClass);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, animationClass, options]);
};

// Hook to animate children with staggered delay
export const useAnimateChildrenOnScroll = (
  ref: RefObject<HTMLElement>,
  childSelector: string,
  animationClass: string = 'appear',
  options: AnimateOnScrollOptions = {}
): void => {
  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = element.querySelectorAll(childSelector);
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add(animationClass);
            }, index * 100); // 100ms delay between each child
          });
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, childSelector, animationClass, options]);
};

// Hook to create scroll progress indicator
export const useScrollProgress = (): void => {
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progressBar = document.getElementById('scroll-progress-bar');
      
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
};