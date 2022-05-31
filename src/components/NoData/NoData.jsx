import React from "react";

// importing banner
import noDataBanner from "assets/images/no-data/no-data.png";

// import styles
import "./NoData.scss";

const NoData = (props) => {
  return (
    <div className="no-data">
      <img src={noDataBanner} alt="no-data" />
      <h1>
        {props.title || "No data"} <span>not found</span>
      </h1>
    </div>
  );
};

export default NoData;
