import React from "react";
import '../../Styles/pagination.css'
// import classNames from "classnames";

export default class Pagination extends React.Component {
  nextPage = () => {
    this.props.onChangePagination({
      page: this.props.page + 1,
      total_pages: this.props.total_pages
    });
  };

  prevPage = page => event => {
    this.props.onChangePagination({
      page: this.props.page - 1,
      total_pages: this.props.total_pages
    });
  };

  render() {
    const { page, total_pages } = this.props;
    return (
      <nav className="pagin_group">
         
           <div className="btn-group">
                    <button 
                        type="button" 
                        className="btn" 
                        disabled={page===1} 
                        onClick={this.prevPage(page)}
                    >&laquo;
                    </button>
                    <span>
                         {page} of {total_pages}
                    </span>
                    <button type="button" className="btn" onClick={this.nextPage}>&raquo;</button>
            </div>
      
      </nav>
    );
  }
}