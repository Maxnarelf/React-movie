import React, { Component } from 'react';
import PropTypes from "prop-types";
import '../../Styles/selection.css'
import { connect } from 'react-redux';

class SortBy extends Component {
    static propTypes = {
        sort_by: PropTypes.string.isRequired,
        onChangeFilters:  PropTypes.func.isRequired
    }
    static  defaultProps = {
        options: [
            {
                label:"Популярные по убыванию",
                value: "popularity.desc"
            },
            {
                label:"Популярные по возрастанию",
                value: "popularity.asc"
            },
            {
                label:"Рейтинг по убыванию",
                value: "vote_average.desc"
            },
            {
                label:"Рейтинг по возрастанию",
                value: "vote_average.asc"
            }
        ]
    }
    render() {
        const {sort_by, onChangeFilters, options, searchText} = this.props;
        
        return (

            <div className="sort_by" style={{opacity: searchText ? 0.3 : 1}}>
                    
                    <select 
                        id="sort_by"
                        className="sel_style"  
                        name="sort_by"
                        value={sort_by}
                        onChange={onChangeFilters}
                        disabled={searchText}
                    >   
                        {options.map(option =>(
                            <option className="opt_sort" key={option.value} value={option.value}>{option.label}</option>
                        ))}
                        
                    </select>
                </div>
          )
    }
}



const mapStateToProps = (state) => ({
    searchText: state.movies.searchText
})
export default connect(mapStateToProps)(SortBy)