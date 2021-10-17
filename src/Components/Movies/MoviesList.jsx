import React from "react";
import MovieItem from "./MoviesItem";
import { API_URL, API_KEY_3 } from "../../Api/Api";

export default class MovieList extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = filters => {
      const {sort_by} = filters;
      const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        }); 
      });
  }
  componentDidMount() {
      this.getMovies(this.props.filters)
    
  }

  componentDidUpdate(prevProps) {
      if (this.props.filters.sort_by !== prevProps.filters.sort_by){
          this.getMovies(this.props.filters)
      }
  }

  render() {
    const { movies } = this.state;
    console.log("filters", this.props.filters);
    return (
      <div className="context">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}