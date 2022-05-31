import React from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

// components
import { Button } from "components/Button";
import { GrCirclePlay } from "react-icons/gr";

// importing api's
import { category } from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// importing images
import defaultBanner from "assets/images/default-img/default-banner.jpg";

// importing styles
import "./MovieCard.scss";

const MovieCard = (props) => {
  const { item } = props;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(get(item, "poster_path"));

  return (
    <Link to={link}>
      <div className="movie-card">
        <div className="movie-card__banner">
          <img
            src={
              bg === "https://image.tmdb.org/t/p/w500/null" ? defaultBanner : bg
            }
            alt="banner"
          />
        </div>
        <Button className="movie-card__btn">
          <GrCirclePlay />
        </Button>
        <h3>{item.title || item.name}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
