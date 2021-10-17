import React, { Component } from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList'
import Header from "./Header/Header";
import Slider from './Slider/Slider';
import '../index.css';

export default class App extends Component {
    constructor(){
        super();

        this.state = {
            filters: {
                sort_by: "popularity.desc"
            }
        }
    }

    onChangeFilters = event => {
        const newFilters = {...this.state.filters, [event.target.name]:[event.target.value]}
        this.setState(prevState => ({
            filters: newFilters
        }))
        
    }
    render() {
        const {filters} = this.state;
        return (
            <div className="container">
                <Header />
                <Slider />
                <div className="menu">
                <Filters filters={filters} onChangeFilters={this.onChangeFilters}/> 
                    <div className="menu_left">
                        <h3>Фильтры: </h3>
                        <h3>Фильтры:</h3>
                        <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione ipsum quae at recusandae ut? Eius nesciunt ipsum, aliquam tenetur dolorum quaerat inventore similique voluptatum eos tempora! Soluta deserunt tempora in neque earum. Praesentium ad adipisci veniam, eius quasi non illum.:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                        <h3>Фильтры:</h3>
                    </div>
                     
                     <MoviesList filters={filters}/>
                 </div>
                
                   
                
            </div>
        );
    }
}

