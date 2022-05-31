import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// importing API's
import tmdbApi from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// importing styles
import "./VideoList.scss";

const VideoList = (props) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideos(response.results);
    };
    getVideos();
  }, [category, props.id]);

  return (
    <div>
      {videos.map((video, i) => (
        <Video item={video} key={i} />
      ))}
    </div>
  );
};

const Video = (props) => {
  const { item } = props;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      />
    </div>
  );
};

export default VideoList;
