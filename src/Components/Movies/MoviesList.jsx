import React from "react";
import MoviesItem from "./MoviesItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changePagination as changePaginationAction,
  getMovies as getMoviesAction,
  searchMovies as searchMoviesAction,
} from "../../redux/movies/movies.actions";

class MoviesList extends React.Component {
  componentDidMount() {
    const { getMovies, filters, page } = this.props;
    getMovies(filters, page);
  }
  componentDidUpdate(prevProps) {
    const {
      getMovies,
      filters,
      page,
      changePagination,
      searchText,
      searchMovies,
    } = this.props;
    if (filters !== prevProps.filters) {
      if (searchText?.length > 0) {
        searchMovies(searchText, 1, filters);
      } else {
        getMovies(filters, 1);
      }
      changePagination(1);
    }
    if (page !== prevProps.page) {
      if (searchText?.length > 0) {
        searchMovies(searchText, page);
      } else {
        getMovies(filters, page);
      }
    }
    if (
      filters.primary_release_year !== prevProps.filters.primary_release_year
    ) {
      if (searchText?.length > 0) {
        searchMovies(searchText, 1, filters);
      } else {
        getMovies(filters, 1);
      }
      changePagination(1);
    }
    if (filters.with_genres !== prevProps.filters.with_genres) {
      getMovies(filters, page);
      changePagination(1);
    }
    window.scroll(0, 0);
  }
  render() {
    const { movies } = this.props;
    return (
      <div className="listmenu">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="listmenu_item">
              <MoviesItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  page: state.movies.page,
  filters: state.movies.filters,
  searchText: state.movies.searchText,
});

const mapDispatchToProps = {
  getMovies: getMoviesAction,
  changePagination: changePaginationAction,
  searchMovies: searchMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
