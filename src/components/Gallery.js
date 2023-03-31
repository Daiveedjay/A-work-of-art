import { useState } from "react";
import "./Gallery.css";
import Masonry from "react-masonry-css";

import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [url] = useState(" http://localhost:3000/assests");
  const { data } = useFetch(url);
  console.log(data);

  const breakpoints = {
    default: 4,
    1000: 3,
    800: 2,
    600: 1,
  };

  const childVariants = {
    hidden: {
      // x: 200,
      transform: {
        scale: 0,
      },
      opacity: 0,
    },
    visible: {
      transform: {
        scale: 1,
      },
      opacity: 1,

      transition: {
        duration: 2,
        delay: 0.6,
      },
    },
  };
  const clickVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const [filter, setFilter] = useState(null);
  // const handleFilter = (startYear, endYear) => {
  //   setFilter({ startYear, endYear });
  // };
  const filteredData = data?.filter(
    (d) => !filter || (d.year >= filter.startYear && d.year <= filter.endYear)
  );

  // Add a new state variable to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // Add a new function to handle button clicks
  const handleButtonClick = (filter, buttonId) => {
    setActiveButton(buttonId);
    setFilter(filter);
  };

  return (
    <div className="gallery">
      <div className="filter__container">
        <button
          className={`filter--button${activeButton === "all" ? " active" : ""}`}
          onClick={() => handleButtonClick(null, "all")}
        >
          All
        </button>
        <button
          className={`filter--button${
            activeButton === "renaissance" ? " active" : ""
          }`}
          onClick={() =>
            handleButtonClick({ startYear: 1489, endYear: 1655 }, "renaissance")
          }
        >
          Renaissance <span>(1489 to 1655)</span>
        </button>
        <button
          className={`filter--button${
            activeButton === "baroque" ? " active" : ""
          }`}
          onClick={() =>
            handleButtonClick({ startYear: 1625, endYear: 1767 }, "baroque")
          }
        >
          Baroque <span>(1625 to 1767)</span>
        </button>
        <button
          className={`filter--button${
            activeButton === "romanticism" ? " active" : ""
          }`}
          onClick={() =>
            handleButtonClick({ startYear: 1831, endYear: 1899 }, "romanticism")
          }
        >
          Romanticism <span>(1831 to 1899)</span>
        </button>
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredData &&
          filteredData.map((d) => (
            <Link
              to={`/assests/${d.id}`}
              className="gallery__card"
              key={Math.random() * 1000}
            >
              <AnimatePresence>
                <motion.img
                  variants={clickVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="gallery__image"
                  src={d.images.gallery}
                  alt=""
                />

                <motion.div
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  className="gallery--details"
                >
                  <p className="gallery__image-name"> {d.name}</p>
                  <p className="gallery__image-artist">{d.artist.name}</p>
                </motion.div>
              </AnimatePresence>
            </Link>
          ))}
      </Masonry>
    </div>
  );
}
