import React from "react";

// importing styles
import "./PageHeader.scss";

// importing images
import HeaderBg from "assets/images/footer/footer-bg.jpg";

const PageHeader = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${HeaderBg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default PageHeader;
