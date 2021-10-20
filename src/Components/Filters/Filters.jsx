import React, { Component } from 'react';
import SortBy from './SortBy';
import PrimaryReleaseYear from './PrimaryReleaseYear';
import Pagination from './Pagination';
// import Genres from './Genres';
import '../../index.css'


export default class Filters extends Component {
    render() {
        const {filters: {sort_by, primary_release_year }, onChangeFilters, total_pages, page, onChangePagination} = this.props;
        
        return (
            <form className="filter">
               
                
                <PrimaryReleaseYear
                    primary_release_year={primary_release_year}
                    onChangeFilters={onChangeFilters}
                />
                
                <Pagination
                    page={page}
                    total_pages={total_pages}
                    onChangePagination={onChangePagination}
                    />
                 <SortBy
                    sort_by={sort_by} 
                    onChangeFilters={onChangeFilters}
                />

                
               
            </form>
        )
    }
}
