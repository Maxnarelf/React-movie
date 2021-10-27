import React, { Component } from 'react';
import { connect } from 'react-redux';
import {API_URL, API_KEY_3} from '../../api/api';
import '../../Styles/genres.css'

class Genres extends Component {
    constructor() {
        super();
    
        this.state = {
          genresList: [],
          disabled: false
        };
      }
    
      componentDidMount() {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        
        fetch(link)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({
              genresList: data.genres
            });
          });
          
      }
    
      onChange = event => {
        this.props.onChangeFilters({
          target: {
            name: "with_genres",
            value: event.target.checked
              ? [...this.props.with_genres, event.target.value]
              : this.props.with_genres.filter(genre => genre !== event.target.value)
          }
        });
      };
    
      resetGenres = () => {
        this.props.onChangeFilters({
          target: {
            name: "with_genres",
            value: []
          }
        });
      };
    render() {
        const { genresList } = this.state;
        const { with_genres, searchText } = this.props;
        return (
        <div className="genr_block" style={{opacity: searchText ? 0.3 : 1}} >
            
                <h2 className="genr_title">Жанры</h2>
            <button
                type="button"
                className="genr_btn"
                onClick={this.resetGenres}
                disabled={searchText}
            >
                Показать все жанры
            </button>
            
            
            {genresList.map(genre => (
         
            <div key={genre.id} >
                <input
                    
                    type="checkbox"
                    value={genre.id}
                    id={`genre${genre.id}`}
                    onChange={this.onChange}
                    checked={with_genres.includes(String(genre.id))}
                    disabled={searchText}
                />
                <label className="form-check-label" htmlFor={`genre${genre.id}`}>
                    {genre.name}
                </label>
            </div>
        
            ))}
        </div>
        
    );
  }
}


const mapStateToProps = (state) => ({
    searchText: state.movies.searchText
})

export default connect(mapStateToProps)(Genres)