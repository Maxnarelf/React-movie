import React from "react";
import { connect } from "react-redux";
import { changePagination as changePaginationAction } from "../../redux/movies/movies.actions";
import "../../Styles/pagination.css";
// import classNames from "classnames";

class Pagination extends React.Component {
  nextPage = () => {
    const {changePagination, page, total_pages} = this.props
      changePagination (page + 1, total_pages)
  };

  prevPage = () => {
    const {changePagination, page, total_pages} = this.props
    changePagination (page - 1, total_pages)
  };

  render() {
    const { page, total_pages } = this.props;
    return (
      <nav className="pagin_group">
        <div className="btn-group">
          <button
            type="button"
            className="btn"
            disabled={page === 1}
            onClick={this.prevPage}
          >
            &laquo;
          </button>
          <span>
            {page} of {total_pages}
          </span>
          <button type="button" className="btn" onClick={this.nextPage}>
            &raquo;
          </button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.movies.page,
  total_pages: state.movies.total_pages

});

const mapDispatchToProps = {
  changePagination: changePaginationAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
