import React, { Component } from "react";
import CallApi, { API_KEY_3 } from "../../api/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import "../../Styles/slider.css";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      topmovies: [],
    };
  }

  topMovies = (page) => {
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      page: page,
    };
    CallApi.get(`/movie/upcoming`, {
      params: queryStringParams,
    }).then((data) => {
      this.setState({
        topmovies: data.results,
      });
    });
  };
  componentDidMount() {
    const {page} = this.props;
    this.topMovies(page);
  }
  render() {
    const { topmovies } = this.state;
    return (
      <div className="slider">
        <div className="slider_content">
          <Swiper
            scrollbar={{ draggable: true }}
            slidesPerColumnFill="row"
            slidesPerView={6}
            spaceBetween={5}
            breakpoints={{
              960: { slidesPerView: 6 },
              820: { slidesPerView: 5 },
              768: { slidesPerView: 5 },
              600: { slidesPerView: 4 },
              400: { slidesPerView: 3 },
              200: { slidesPerView: 2 },
            }}
          >
            {topmovies.map((topmovie) => (
              <SwiperSlide key={topmovie.id}>
                <Link to={`/movie/${topmovie.id}`} className="card_movie">
                  <img
                    className="slider_content_img"
                    src={
                      topmovie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${
                            topmovie.poster_path || topmovie.backdrop_path
                          }`
                        : ""
                    }
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}
