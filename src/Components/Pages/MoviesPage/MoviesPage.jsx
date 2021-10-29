import React, { Component } from "react";
import Filters from "../../Filters/Filters";
import Genres from "../../Filters/Genres";
import MoviesList from "../../Movies/MoviesList";
import Pagination from "../../Filters/Pagination";
import { connect } from "react-redux";
import {
  changePagination as changePaginationAction,
  changeFilters as changeFiltersAction,
} from "../../../redux/movies/movies.actions";
import "../../../index.css";

class MoviesPage extends Component {
  render() {
    const {
      filters: { with_genres }, 
      changeFilters,
    } = this.props;
    return (
      <div className="menu">
        <Filters />
        <div className="menu_left">
          <Genres with_genres={with_genres} onChangeFilters={changeFilters} />
        </div>
        <MoviesList />
        <div className="pagin_bottom">
          <Pagination />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.movies.filters,
  page: state.movies.page,
  total_pages: state.movies.total_pages,
});

const mapDispatchToProps = {
  changeFilters: changeFiltersAction,
  changePagination: changePaginationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
