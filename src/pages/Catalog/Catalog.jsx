import React from "react";
import { useParams } from "react-router-dom";

// components
import PageHeader from "components/PageHeader";

// importing api's
import tmdbApi, { category as cate, movieType } from "api/tmdbApi";
import MovieGrid from "components/MovieGrid";

const Catalog = () => {
  const { category } = useParams();

  return (
    <div>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
