import React from "react";
import MoviesList from "./MoviesList";
import queryString from "query-string";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MoviesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
        api_key: API_KEY_3,
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
    };

    if (with_genres.length > 0){
      queryStringParams.with_genres = with_genres.join(",");

    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangePagination({
            page: data.page,
            total_pages: data.total_pages
          });
        this.setState({
          movies: data.results
        }); 
      });
  }
  componentDidMount() {
      this.getMovies(this.props.filters, this.props.page)
    
  }
  
  componentDidUpdate(prevProps) {
        if (this.props.filters !== prevProps.filters) {
            this.getMovies(this.props.filters, 1); 
            this.props.onChangePagination(1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page); 
        }
        if (this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {
            this.getMovies(this.props.filters, 1); 
            this.props.onChangePagination(1);
        }
        if (this.props.filters.with_genres !== prevProps.filters.with_genres){
            this.getMovies(this.props.filters, this.props.page);
        } 
    }
  

  render() {
    const { movies } = this.state;
    
    return <MoviesList movies={movies}/>
   
  }
}