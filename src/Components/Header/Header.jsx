import React, { Component } from 'react'
import User from './User';
import Search from '../Search/Search';
import { withAuth } from '../../hoc/withAuth';
import { Link } from 'react-router-dom';
import '../../index.css'

class Header extends Component {
    
    render() {
        const { auth, authActions } =this.props
        return (
            <div>
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
            </div>
        )
    }
}
export default withAuth(Header)