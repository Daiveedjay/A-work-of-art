import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../media/logo.svg";
import Music from "./Music";

export default function Header() {
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const navigate = useNavigate();

  const [startSlide, setStartSlide] = useState(1);

  useEffect(() => {
    if (isSlideshowActive && startSlide < 15) {
      const interval = setInterval(() => {
        setStartSlide((prevSlide) => prevSlide + 1);
        navigate(`/assests/${startSlide + 1}`);
      }, 5000);
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
    <nav className="header__nav">
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
    </nav>
  );
}
