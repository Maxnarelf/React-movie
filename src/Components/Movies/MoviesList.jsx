import React from "react";
import MoviesItem from "./MoviesItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies }) => (
  <div className="context">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MoviesItem item={movie} />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);