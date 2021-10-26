import React, {Component} from "react";
import { Link } from "react-router-dom";
import no_poster from './noposter2.png'
import '../../index.css';

const setVote = (vote) => { 
    if(vote >= 8){
        return "green";
    } else if (vote >= 6){
        return "orange";
    } else {
        return "red";
    }
}

export default class MoviesItem extends Component {
    
  render() {
    const { item } = this.props;
    
    return (
      <div className="card">
        <Link to={`/movie/${item.id}`} className="card_title">
          {item.title}
        </Link>

        <div className="card_body">
          <Link to={`/movie/${item.id}`}>
            <img
              className="card_img"
              src={
                item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                  item.poster_path}`
                : no_poster
                }
              alt=""
            />
          </Link>
          <div className="card_text">
            <div>
              <span>Дата релиза: </span>
              {item.release_date}
            </div>
            <div>
              <span>Рейтинг: </span>
              <span className={`tag ${setVote(item.vote_average)}`}>{item.vote_average}</span>
            </div>
            <div>
              <span>Описание: </span>
              {item.overview.length > 150
                ? `${item.overview.slice(0, 150)}….`
                : item.overview}
            </div>
          </div>
        </div>
      </div>
    );
  }
}