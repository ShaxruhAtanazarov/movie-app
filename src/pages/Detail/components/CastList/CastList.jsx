import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// importing API's
import tmdbApi from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// importing styles
import "./CastList.scss";

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, i) => (
        <div className="casts__item" key={i}>
          <div className="casts__item-img">
            <img src={apiConfig.w500Image(cast.profile_path)} alt="avatar" />
          </div>
          <p className="casts__item-name">{cast.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
