import React, { Component } from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import "../../index.css";
import { connect } from "react-redux";
import {
  changeFilters as changeFiltersAction,
  changePagination as changePaginationAction,
} from "../../redux/movies/movies.actions";

class Filters extends Component {
  render() {
    const {
      filters: { sort_by, primary_release_year },
      changeFilters,
    } = this.props;

    return (
      <form className="filter">
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={changeFilters}
        />
        <div className="pagin_top">
          <Pagination />
        </div>
        <SortBy sort_by={sort_by} onChangeFilters={changeFilters} />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.movies.page,
  total_pages: state.movies.total_pages,
  filters: state.movies.filters,
});

const mapDispatchToProps = {
  changeFilters: changeFiltersAction,
  changePagination: changePaginationAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
