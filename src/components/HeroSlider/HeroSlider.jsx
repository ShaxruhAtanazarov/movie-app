import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";

// components
import { Button, OutlineButton } from "components/Button";
import { Modal, ModalContent } from "components/Modal";

// Swiper dependencies
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// importing api's
import tmdbApi, { category, movieType } from "api/tmdbApi";
import apiConfig from "api/apiConfig";

// importing styles
import "swiper/css";
import "swiper/css/bundle";
import "./HeroSlider.scss";

// importing default banner
import defBanner from "assets/default-images/def-banner.jpg";
import defBanner500 from "assets/default-images/default-banner-500.jpg";

const HeroSlider = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params: params,
        });
        setMovieItems(get(response, "results", []).slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="here-slider">
      <Swiper
        centeredSlides={true}
        // autoplay={{
        //   delay: 3500,
        // }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        // modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSliderItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSliderItem = (props) => {
  let navigate = useNavigate();
  const { item } = props;

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal__${item.id}`);
    const video = await tmdbApi.getVideos(category.movie, item.id);

    if (video.results.length > 0) {
      const videoSrc = `https://www.youtube.com/embed/${video.results[0].key}`;

      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No Trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div className={`here-slider__item ${props.className}`}>
      <div className="here-slider__item-bg">
        <img
          src={apiConfig.originalImage(get(item, "backdrop_path", defBanner))}
          alt="banner"
        />
      </div>
      <div className="here-slider__item-content container">
        <div className="here-slider__item-content-info">
          <h2 className="title">{get(item, "title", "no data")}</h2>
          <div className="overview">{get(item, "overview", "no data")}</div>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>
              watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="here-slider__item-content-poster">
          <img
            src={apiConfig.w500Image(get(item, "poster_path", defBanner500))}
            alt="poster-path"
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const { item } = props;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal__${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlider;
