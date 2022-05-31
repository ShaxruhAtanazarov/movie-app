import React from "react";

// components
import HeroSlider from "components/HeroSlider";
import { Link } from "react-router-dom";
import { OutlineButton } from "components/Button";

import MovieList from "components/MovieList";

import { category, movieType, tvType } from "api/tmdbApi";

const Home = () => {
  return (
    <div>
      <HeroSlider />

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to={"/movie"}>
              <OutlineButton className={"small"}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to={"/movie"}>
              <OutlineButton className={"small"}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Tranding TV</h2>
            <Link to={"/tv"}>
              <OutlineButton className={"small"}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to={"/tv"}>
              <OutlineButton className={"small"}>View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </div>
  );
};

export default Home;
