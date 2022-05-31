import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// components
import Input from "components/Input";
import NoData from "components/NoData";
import MovieCard from "components/MovieCard";
import { Button, OutlineButton } from "components/Button";

// importing api's
import tmdbApi, { category, movieType, tvType } from "api/tmdbApi";

// importing styles
import "./MovieGrid.scss";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = { page: page + 1 };

      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;

        default:
          response = await tmdbApi.getMoviesList(tvType.top_rated, {
            params,
          });
      }
    } else {
      const params = {
        query: keyword,
        page: page + 1,
      };

      response = await tmdbApi.search(props.category, { params });
    }
    console.log(response.results);
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>

      {items.length === 0 ? (
        <NoData title={keyword} />
      ) : (
        <div className="movie-grid">
          {items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))}
        </div>
      )}

      {page < totalPage ? (
        <>
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>
              load more
            </OutlineButton>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigae = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("search")) {
      setKeyword("");
    }
  }, [pathname]);

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigae(`/${category[props.category]}/search/${keyword}`);
    } else {
      navigae(`/${category[props.category]}`);
    }
  }, [keyword, props.category, navigae]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder={"Enter keyword"}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small ml-1" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
