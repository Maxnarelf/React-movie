import React, { Component } from 'react'
import Login from '../Login/Login';
import User from './User';
import '../../index.css'


export default class Header extends Component {
    
    render() {
        const { user, updateSessionId} =this.props
        return (
            <div>
                <div className="container">
                 <div className="header">
                    <div className="logo">
                            React-movies
                            </div>
                            <input className="header_input"type="text" placeholder="Поиск"/>
                            {/* <button className="btn_header">Login</button> */}
                            {user ?  <User/> : <Login updateSessionId={updateSessionId}/>}
                            
                     </div>
                  </div>
            </div>
        )
    }
}
