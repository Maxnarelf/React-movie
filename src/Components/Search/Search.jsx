import React, { Component } from "react";
import { connect } from "react-redux";
import { searchMovies as searchMoviesAction } from "../../redux/movies/movies.actions";
import "../../index.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }

  handleSubmit = (e) => {
    const { searchMovies, page, filters } = this.props;
    const { searchTerm } = this.state;
    e.preventDefault();
    searchMovies(searchTerm, page, filters);
  };
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    const { searchTerm } = this.state;
    return (
      
        <form action="" onSubmit={this.handleSubmit} className="header_label">
          <input
            className="header_input"
            type="search"
            placeholder="Поиск"
            value={searchTerm}
            onChange={this.handleChange}
          />
        </form>
      
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.movies.page,
  filter: state.movies.filters,
});
const mapDispatchToProps = {
  searchMovies: searchMoviesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
