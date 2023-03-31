import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingScreen.css";
const phrases = [
  "Creating art",
  "Making a masterpiece",
  "Crafting beauty",
  "Painting history",
  "Capturing moments",
];

const LoadingScreen = ({ progress }) => {
  const numberAnimation = {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0 },
  };

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      setCurrentPhrase(phrases[currentIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="loading-screen"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {currentPhrase}
        </motion.h1>
        <motion.div className="progress-container">
          <motion.span
            className="progress-number"
            custom={progress}
            animate={progress >= 90 ? "slow" : "normal"}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            variants={{
              normal: numberAnimation,
              slow: { ...numberAnimation, transition: { duration: 2 } },
            }}
          >
            {progress}
          </motion.span>
          <motion.span exit={{ opacity: 0, y: -50 }}>%</motion.span>
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="progress-bar"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
