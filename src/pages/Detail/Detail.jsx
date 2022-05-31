import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// importing API's
import tmdbApi from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// importing styles
import "./Detail.scss";
import CastList from "./components/CastList";
import VideoList from "./components/VideoList";
import MovieList from "components/MovieList";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      // window.screenTop(0, 0);
    };

    getDetail();
  }, [category, id]);

  console.log(item);

  return (
    <div>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="movie-content mb-3 container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster-img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <div className="title">{item.title || item.name}</div>
              <div className="genres">
                <p className="genres__sub-title">Genre:</p>
                <div className="genres__list">
                  {item.genres &&
                    item.genres.map((genre, i) => (
                      <span className="genres__item" key={i}>
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>
              <div className="overview">
                <p className="overview__sub-title">Description:</p>
                {item.overview}
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similiar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
