import React, { Component } from 'react';
import Header from "./Header/Header";
import Slider from './Slider/Slider';
import Login from './Login/Login';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import {BrowserRouter, Route} from 'react-router-dom';
import {withAuth} from '../hoc/withAuth';
import '../index.css';

class App extends Component {
    
    componentDidMount() {
       const {auth, authActions} = this.props;
       if (auth.session_id) {
        authActions.fetchAuth(auth.session_id)
        }
    }       
    render() {
        
        const {auth} = this.props
        
        return  (
            <BrowserRouter>
            <div className="container">
                <Header />
                {auth?.showLoginModal && <Login />}
                <Slider />
                <Route exact path="/" component={MoviesPage} />
                <Route path="/movie/:id" component={MoviePage} />
            </div>
            </BrowserRouter>
        
        )
    }
}


  export default withAuth(App);
