import React, { Component } from 'react'
import User from './User';
import Search from '../Search/Search';
import { withAuth } from '../../hoc/withAuth';
import { Link } from 'react-router-dom';
import '../../Styles/header.css';
import '../../index.css';

class Header extends Component {
    
    render() {
        const { auth, authActions } =this.props
        return (
            
                <div className="container">
                    <div className="header">
                        <Link className="logo" to="/">
                            React-movies
                        </Link>
                        <Search />
                        {auth?.user ? ( <User/> ) : ( 
                            <button 
                                className="btn_header"
                                type="button"
                                onClick={authActions.toggleLoginModal}
                            >
                                Login
                            </button>
                        )}
                            
                    </div>
                </div>
            
        )
    }
}
export default withAuth(Header)