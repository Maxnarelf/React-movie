import React, { Component } from 'react';
import CallApi,{ API_KEY_3, IMG_URL } from '../../../api/api';
import { Link } from 'react-router-dom';
import '../../../index.css'

export default class MoviePage extends Component {
    constructor(){
        super();
        this.state = {
            movieData: undefined,
            videoKey: ''
        }
    }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}?language=ru-RU&api_key=${API_KEY_3}&`)
    .then(data => {
        this.setState({movieData: data})
        console.log('data promise', data);
    })
    CallApi.get(`/movie/${this.props.match.params.id}/videos`)
    .then(data => {
        console.log('array', data.results[0].key);
        this.setState({videoKey: data.results[0].key});
          
        
    }).catch(error => console.log('error', error));
  }
    render() {
        const {videoKey, movieData} = this.state;
        console.log('video promise', videoKey); 
        const getCountries = () => {
            return String(movieData?.production_countries?.map(({ name }) => name));
          };
          const getGenres = () => {
            return String(movieData?.genres?.map(({ name }) => name));
          }
         
        return (
            <div className="menu">
                <div className="dev_body">
                    <img className="det_img" src={`${IMG_URL}${movieData?.backdrop_path || movieData?.poster_path}`} alt={movieData} ></img>
                    <h1 className="det_title">{movieData?.title}</h1>;
                    <Link to = "/" value= {movieData?.homepage}>Homepage</Link>
                    <span>-\DataRelease: {movieData?.release_date}\-</span>
                    <span>-\Genres: {getGenres()}\-</span>
                    <span>-\Countries: {getCountries()}\-</span>
                    <span>-\{movieData?.overview} \-</span>
                    <span>-\{movieData?.vote_average} \-</span>
                    <a href={`https://www.imdb.com/title/${movieData?.imdb_id}`} alt="">Movie page on IMDb </a>
                    
                    <iframe
                        width="920" height="518"
                        title="youtube-video"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                 </div>   
            </div>
                
        )
        }
}
