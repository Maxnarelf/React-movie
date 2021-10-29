import React, { Component } from "react";
import CallApi, { API_KEY_3, IMG_URL } from "../../../api/api";
import { Link } from "react-router-dom";
import "../../../index.css";

export default class MoviePage extends Component {
  constructor() {
    super();
    this.state = {
      movieData: undefined,
      videoKey: "",
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    const {match: {params: { id }}} = this.props;
    CallApi.get(
      `/movie/${id}?language=ru-RU&api_key=${API_KEY_3}&`
    ).then((data) => {
      this.setState({ movieData: data });
    });
    CallApi.get(`/movie/${id}/videos`)
      .then((data) => {
        this.setState({ videoKey: data.results[0].key });
      })
      .catch((error) => console.log("error", error));
  }
  componentDidUpdate(prevProps) {
    const {match: {params: { id }}} = this.props || {};
    if (id !== prevProps.match.params.id) {
      CallApi.get(
        `/movie/${id}?language=ru-RU&api_key=${API_KEY_3}&`
      ).then((data) => {
        this.setState({ movieData: data });
      });
      CallApi.get(`/movie/${id}/videos`)
        .then((data) => {
          this.setState({ videoKey: data.results[0].key });
        })
        .catch((error) => console.log("error", error));
    }
  }
  render() {
    const { videoKey, movieData } = this.state;
    const getCountries = () => {
      return String(movieData?.production_countries?.map(({ name }) => name));
    };
    const getGenres = () => {
      return String(movieData?.genres?.map(({ name }) => name));
    };

    return (
      <div className="menu">
        <Link to="/" className="det_home" value={movieData?.homepage}>
            &lsaquo;
          </Link>
        <div className="dev_body">
          <img
            className="det_img"
            src={`${IMG_URL}${
              movieData?.backdrop_path || movieData?.poster_path
            }`}
            alt={movieData}
          ></img>
          <h1 className="det_title">{movieData?.title}</h1>
          <div className="det_text">
            <div className="det_tit_text">
              Дата релиза:{" "}
              <span className="det_span">{movieData?.release_date}</span>
            </div>
            <div className="det_tit_text">
              Жанр: <span className="det_span">{getGenres()}</span>
            </div>
            <div className="det_tit_text">
              Страна: <span className="det_span">{getCountries()}</span>
            </div>
            <div className="det_tit_text">
              Рейтинг:{" "}
              <span className="det_span">{movieData?.vote_average} из 10</span>
            </div>
            <div className="det_tit_text">
              О фильме: <span className="det_span">{movieData?.overview}</span>
            </div>
          </div>
          <div className="imdb">
            <a href={`https://www.imdb.com/title/${movieData?.imdb_id}`} alt="">
              Movie page on IMDb{" "}
            </a>
          </div>
          <iframe
            className="det_video"
            title="youtube-video"
            src={`https://www.youtube.com/embed/${videoKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}
