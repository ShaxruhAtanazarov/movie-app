import React, { useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// importing logo
import logo from "assets/images/logo/logo.svg";

// importing navigations
import { headerNavigations } from "./HeaderNav";

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const ActiveLocation = pathname.split("/")[1];


  const activePageIndex = headerNavigations.findIndex(
    (headerNavigation) => headerNavigation.path === pathname
  );

  const activeLocation = headerNavigations.findIndex(
    (headerNavigation) => headerNavigation.path === "/" + ActiveLocation
  );


  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div className="header" ref={headerRef}>
      <div className="header__wrap container">
        <div className="header__logo logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="header__nav">
          {headerNavigations.map((headerNavigation, headerNavigationIndex) => (
            <li
              className={`${
                activePageIndex === headerNavigationIndex ||
                activeLocation === headerNavigationIndex
                  ? "active"
                  : null
              }`}
              key={headerNavigationIndex}
            >
              <Link to={headerNavigation.path}>{headerNavigation.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
