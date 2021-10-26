import React, { Component } from "react";
import CallApi, {  API_KEY_3 } from "../../api/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar} from 'swiper';
import 'swiper/swiper-bundle.css'

// import 'swiper/css';
import "../../Styles/slider.css";

SwiperCore.use([ Navigation, Pagination, Scrollbar ]);

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      topmovies: [],
    };
  }

  topMovies = (page) =>{
      const queryStringParams = {
        api_key: API_KEY_3,
        language: "ru-RU",
        page: page
      }
      CallApi.get(`/movie/upcoming`, {
        params: queryStringParams
      }).then((data) => {
          this.setState({
            topmovies: data.results
          })
      })
  } 
  componentDidMount() {
      this.topMovies(this.props.page);
    
  }
  render() {
    const { topmovies } = this.state;
    return (
      <div className="slider">
        <div className="slider_content">
        
        {/* <div className="section-container"> */}
        <Swiper
          
          scrollbar={{draggable:true}}
        //   pagination={{clickable:true}}
          slidesPerColumnFill="row"
          slidesPerView={6}
          slidesPerColumn={6}
          spaceBetween={5}
          breakpoints={{768: {slidesPerColumn: 4}, }}
        >{topmovies.map(topmovie => (
         <SwiperSlide key={topmovie.id} >
              <Link to={`/movie/${topmovie.id}`} className="card_movie">
              
               <img
                  className="slider_content_img"
                  src={topmovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${
                        topmovie.poster_path  || topmovie.backdrop_path
                        }`
                      : ""
                  }
                  alt=""/>
              </Link>
              </SwiperSlide>
            )
        )}
        </Swiper>
        
      </div>
    </div>
      
    )
  }
}
