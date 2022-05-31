import React from "react";
import { Link } from "react-router-dom";

// importing images
import footerBg from "assets/images/footer/footer-bg.jpg";

// importing logo
import logo from "assets/images/logo/logo.svg";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer__content container">
        <div className="footer__content-logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="footer__content-menus">
          <div className="footer__content-menus-list">
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>Contact us</Link>
            <Link to={"/"}>Term of service</Link>
            <Link to={"/"}>About us</Link>
          </div>
          <div className="footer__content-menus-list">
            <Link to={"/"}>Live</Link>
            <Link to={"/"}>FAQ</Link>
            <Link to={"/"}>Premium</Link>
            <Link to={"/"}>Privacy policy</Link>
          </div>
          <div className="footer__content-menus-list">
            <Link to={"/"}>You must watch</Link>
            <Link to={"/"}>Recent release</Link>
            <Link to={"/"}>Top IMBD</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
