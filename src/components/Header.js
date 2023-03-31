// import "./Header.css";

// // import Logo from "../assests/logo.svg";
// import Logo from "../media/logo.svg";
// import { Link } from "react-router-dom";

// import { motion } from "framer-motion";
// import Music from "./Music";
// export default function Header() {
//   return (
//     <motion.nav animate={{}} className="header__nav">
//       <Link to="/">
//         <motion.img
//           drag
//           dragConstraints={{
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}
//           src={Logo}
//           alt="Logo svg"
//         />
//       </Link>
//       {/* <Music /> */}
//       <motion.p
//         whileHover={{
//           color: "blue",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 120,
//         }}
//         className="header-text primary-text"
//       >
//         start slideshow
//       </motion.p>
//       <motion.p
//         whileHover={{
//           color: "blue",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 120,
//         }}
//         className="header-text primary-text"
//       >
//         stop slideshow
//       </motion.p>
//     </motion.nav>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Header.css";
import Logo from "../media/logo.svg";
import Music from "./Music";
import { motion } from "framer-motion";

export default function Header() {
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const navigate = useNavigate();

  const [startSlide, setStartSlide] = useState(1);

  useEffect(() => {
    if (isSlideshowActive && startSlide < 15) {
      const interval = setInterval(() => {
        setStartSlide((prevSlide) => prevSlide + 1);
        navigate(`/assests/${startSlide + 1}`);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [startSlide, isSlideshowActive, navigate]);

  const startSlideshow = () => {
    setIsSlideshowActive(true);
    navigate(`/assests/${startSlide}`);
  };

  const stopSlideshow = () => {
    setIsSlideshowActive(false);
  };

  return (
    <motion.nav animate={{}} className="header__nav">
      <Link to="/">
        <img className="logo" src={Logo} alt="Logo svg" />
      </Link>
      <Music />
      {isSlideshowActive ? (
        <p className="header-text primary-text" onClick={stopSlideshow}>
          stop slideshow
        </p>
      ) : (
        <p className="header-text primary-text" onClick={startSlideshow}>
          start slideshow
        </p>
      )}
    </motion.nav>
  );
}
