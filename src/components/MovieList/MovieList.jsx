import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";

// importing api's
import tmdbApi, { category, movieType } from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// components
import { Button } from "components/Button";
import MovieCard from "components/MovieCard";

// importing styles
import "swiper/css";
import "swiper/css/bundle";
import "./MovieList.scss";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;

          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      setItems(response.results);
    };

    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor spaceBetween={12} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
