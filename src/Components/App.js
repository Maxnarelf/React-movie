import React, { Component } from 'react';
import Filters from './Filters/Filters';
import Genres from './Filters/Genres';
import MoviesList from './Movies/MoviesList'
import Header from "./Header/Header";
import Slider from './Slider/Slider';
import Pagination from './Filters/Pagination';
import LoginForm from './Login/LoginForm';
import Cookies from 'universal-cookie';
import { fetchApi, API_URL, API_KEY_3 } from '../Api/api';

import '../index.css';



const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends Component {
    constructor(){
        super();

        this.state = {
            session_id: null,
            user: null,
            filters: {
                sort_by: "popularity.desc",
                primary_release_year: "new Date().getFullYear()",
                with_genres: []
            },
            page: 1,
            total_pages: ""
        }
    }
    updateUser = user => {
        this.setState({
            user
        })
    }

    updateSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        })
        this.setState({
            session_id

        })
    }

    onLogout = () =>{
        cookies.remove("session_id");
        this.setState({
            session_id: null,
            user: null

        })
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
    componentDidMount() {
        const session_id = cookies.get("session_id");
        if (session_id){
             fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
                .then(user => {
                    this.updateUser(user)
                    this.updateSessionId(session_id)
                })
        }
    }
    

    render() {
        
        const {filters: {with_genres}, filters, page, total_pages, user } = this.state;
        return (
            <AppContext.Provider 
                value={{
                    user,
                    updateUser: this.updateUser,
                    updateSessionId: this.updateSessionId,
                    onLogout: this.onLogOut

            }} >
            <div className="container">
                <Header  user={user} updateSessionId={this.updateSessionId}/>
                
                <Slider />
                <div className="menu">
                <Filters 
                    page={page} 
                    total_pages={total_pages}
                    filters={filters} 
                    onChangeFilters={this.onChangeFilters} 
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
                     <Pagination
                        
                        page={page}
                        total_pages={total_pages}
                        onChangePagination={this.onChangePagination}
                    />
                    
                </div>
                
                   <LoginForm />
                
            </div>
            </AppContext.Provider>
        );
    }
}

