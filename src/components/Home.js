import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SingleGallery from "./SingleGallery";
import Gallery from "../components/Gallery";
import { AnimatePresence, motion } from "framer-motion";

import "./Home.css";

const containerVariants = {
  hidden: {
    // x: "100vw",
    opacity: 0,
  },
  visible: {
    // x: "0vw",
    opacity: 1,
    transition: {
      type: "spring",
      enter: 1,
      delay: 0.5,
      mass: 0.4,
      damping: 6,
      when: "beforeChildren",
    },
  },

  exit: {
    opacity: 0,
    transition: "easeInOut",
  },
};

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="home"
              >
                <Gallery />
              </motion.div>
            }
          />

          <Route
            exact
            path="assests/:id"
            element={
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SingleGallery />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onAnimationComplete={() => navigate("/", { replace: true })}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
