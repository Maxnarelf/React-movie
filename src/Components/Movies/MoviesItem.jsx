import React, {Component} from "react";

export default class MovieItem extends Component {
  render() {
    const { item } = this.props;
    
    return (
      <div className="card" >
        <img
          className="card_img"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
         
        />
        <div className="card-body">
          <h3 className="card-title">{item.title}</h3>
          <div className="class">{item.release_date}</div>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="{}">
              {item.overview.length > 150 ? `${item.overview.slice(0, 150)}….` : item.overview}
              </div>
          
        </div>
      </div>
    );
  }
}