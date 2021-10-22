import React, { Component } from 'react'
import { API_KEY_3, API_URL } from '../../api/api'
import '../../index.css'

export default class Search extends Component {
    constructor(){
        super()
        this.state = {
            movies: [],
            searchTerm: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${API_URL}/search/movie?api_key=${API_KEY_3}&query=${this.state.searchTerm}`)
        .then(response => response.json())
        .then(data => {
            this.setState({movies: [...data.results]})
        })
        
    }
    handleChange = (e) => {
        
       this.setState({searchTerm: e.target.value})
    }
    render() {
        const {searchTerm} = this.state;
        return (
            <div>
                 <form action="" onSubmit={this.handleSumbit}>
                      <input 
                        className="header_input" 
                        type="search" 
                        placeholder="Поиск" 
                        value={searchTerm} 
                        onChange={this.handleChange}
                        />
                </form>
              
            </div>
        )
    }
}
