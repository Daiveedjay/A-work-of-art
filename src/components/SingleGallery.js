import "./SingleGallery.css";

import IconBack from "../media/icon-back-button.svg";
import IconNext from "../media/icon-next-button.svg";
import ViewImage from "../media/icon-view-image.svg";

import { useLocation, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import data from "../data.json";
export default function SingleGallery() {
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const assest = data.assests.find((x) => x.id === +id);

  const skipFront = () => {
    const nextId = parseInt(id) + 1;
    if (nextId > 15) {
      navigate("/assests/1");
    } else {
      navigate(`/assests/${nextId}`);
    }
  };

  const skipBack = () => {
    const prevId = parseInt(id) - 1;
    if (prevId < 1) {
      return;
    } else {
      navigate(`/assests/${prevId}`);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        enter: 1,
        delay: 0.5,
        mass: 0.4, //Size of the element, higher mass makes it move slower and vice versa
        damping: 6, // Strength of the oppsosing force, higher number = less oscillation
        when: "beforeChildren", //Tells when the animation should happen, either before children or after
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      transition: "easeInOut",
    },
  };

  const imageRef = useRef(null); // Create a new reference for the image element

  const expandImage = () => {
    if (imageRef.current.requestFullscreen) {
      imageRef.current.requestFullscreen();
    } else if (imageRef.current.mozRequestFullScreen) {
      // For Firefox
      imageRef.current.mozRequestFullScreen();
    } else if (imageRef.current.webkitRequestFullscreen) {
      // For Chrome and Safari
      imageRef.current.webkitRequestFullscreen();
    } else if (imageRef.current.msRequestFullscreen) {
      // For IE/Edge
      imageRef.current.msRequestFullscreen();
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
  };

  const onFullscreenChange = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement
    ) {
      // Remove the event listener when fullscreen mode is exited
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    if (document.webkitExitFullscreen)
      // For Chrome and Safari
      document.webkitExitFullscreen();
    if (document.mozCancelFullScreen)
      // For Firefox
      document.mozCancelFullScreen();
    if (document.msExitFullscreen) {
      // For IE/Edge
      document.msExitFullscreen();
    }
  };

  return (
    <AnimatePresence location={location} key={location.key}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="single-gallery"
      >
        {assest && (
          <>
            <div className="single-gallery__item single-gallery__image-container">
              <img
                ref={imageRef} // Add the reference to the image element
                className="single-gallery__img"
                src={assest.images.gallery}
                alt=""
              />
              <div onClick={expandImage} className="image--expand">
                <img src={ViewImage} alt="" />
                <span>View Image</span>
              </div>
              <div
                className="close-button"
                onClick={closeFullscreen}
                style={{ display: "none" }}
              >
                Close Fullscreen
              </div>
              <div className="single-gallery__text-container">
                <motion.h2
                  variants={childVariants}
                  className="single-gallery--name"
                >
                  {assest.name}
                </motion.h2>
                <motion.p variants={childVariants} className="primary-text">
                  {assest.artist.name}
                </motion.p>
              </div>
              <Link
                target="_blank"
                to={assest.source}
                className="single-gallery__author--container"
              >
                <img src={assest.artist.image} alt="" />
              </Link>
            </div>
            <div className="single-gallery__item single-gallery--about">
              <div className="single-gallery__text--container">
                <p className="single-gallery__year">{assest.year}</p>
                <p className="primary-text single-gallery__history">
                  {assest.description}
                </p>
              </div>
            </div>
            <div className="single-gallery__item footer__container">
              <div className="footer__details">
                <h2 className="footer--name">{assest.name}</h2>
                <p className="primary-text"> {assest.artist.name}</p>
              </div>

              <div className="skip__buttons--container">
                <img onClick={skipBack} src={IconBack} alt={assest.name} />
                <img onClick={skipFront} src={IconNext} alt={assest.name} />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
