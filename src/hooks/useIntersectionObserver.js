import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const delay = index * 200; // set delay to 0.2 seconds difference for each element
            setTimeout(() => {
              target.classList.add("fade-in"); // apply the class to fade in the target element
              callback(target, index);
              observerRef.current.unobserve(target);
            }, delay);
          }
        });
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [callback]);

  return (element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };
};
