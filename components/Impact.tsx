import React, { useState, useEffect, useRef } from 'react';

// Custom hook to observe when an element is in the viewport
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      if (entry.isIntersecting) {
        setIntersecting(true);
        // Stop observing after it's visible once to prevent re-triggering
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};


// Custom hook to animate counting up to a number with easing
const useCountUp = (end: number, duration: number, startAnimation: boolean): number => {
  const [count, setCount] = useState(0);
  // FIX: Initialize useRef with null. `useRef` expects an initial value.
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Easing function for a smoother animation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    if (!startAnimation) return;

    const animate = (timestamp: number) => {
      // FIX: Adjust logic to be type-safe with `null` initialization.
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      // The non-null assertion is safe here because of the check above.
      const progress = timestamp - startTimeRef.current!;
      const percentage = Math.min(progress / duration, 1);
      const easedPercentage = easeOutCubic(percentage);
      
      const currentCount = Math.floor(easedPercentage * end);

      setCount(currentCount);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure it ends exactly on the target number
        setCount(end); 
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [startAnimation, end, duration]);

  return count;
};

// The stat card component, now with animation logic
const ImpactStat: React.FC<{ icon: React.ReactNode; value: string; label: string; isVisible: boolean }> = ({ icon, value, label, isVisible }) => {
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const duration = 2000; // Animation duration in ms

  const count = useCountUp(numericValue, duration, isVisible);
  const formattedCount = count.toLocaleString();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
      <div className="text-brand-teal text-5xl mb-4 flex justify-center">{icon}</div>
      <p className="text-4xl font-bold text-brand-blue">{formattedCount}{suffix}</p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
};


// The main Impact section component
const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Trigger animation when 10% of the component is visible
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      ),
      value: '5,000+',
      label: 'Students Reached',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      value: '95%',
      label: 'Report Increased Confidence',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      ),
      value: '80%',
      label: 'Improve Academic Performance',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-brand-light" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue">Our Proven Impact</h2>
          <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">The results speak for themselves. We're not just teaching debate; we're building futures.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <ImpactStat key={index} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;