import React, { Component } from 'react';
import Filters from './Filters/Filters';
import Genres from './Filters/Genres';
import MoviesList from './Movies/MoviesList'
import Header from "./Header/Header";
import Slider from './Slider/Slider';
import '../index.css';

export default class App extends Component {
    constructor(){
        super();

        this.state = {
            filters: {
                sort_by: "popularity.desc",
                primary_release_year: "2021",
                with_genres: []
            },
            page: 1,
            total_pages: ""
        }
    }

    onChangeFilters = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(prevState => ({
          filters: {
            ...prevState.filters,
            [name]: value
          }
        }));
    };  

    onChangePagination = ({ page, total_pages = this.state.total_pages }) =>{
        this.setState({
            page,
            total_pages
        })
    }
    render() {
        const {filters: {with_genres}} = this.state;
        const {filters, page, total_pages } = this.state;
        return (
            <div className="container">
                <Header />
                <Slider />
                <div className="menu">
                <Filters 
                    page={page} 
                    total_pages={total_pages}
                    filters={filters} 
                    onChangeFilters={this.onChangeFilters} 
                    onChangePage={this.onChangePage}
                    onChangePagination={this.onChangePagination}
                /> 
                    <div className="menu_left">
                        <Genres with_genres={with_genres} onChangeFilters={this.onChangeFilters} />
                    </div>
                     
                     <MoviesList 
                        filters={filters} 
                        page={page} 
                        
                        onChangePagination={this.onChangePagination}
                     />
                </div>
                
                   
                
            </div>
        );
    }
}

