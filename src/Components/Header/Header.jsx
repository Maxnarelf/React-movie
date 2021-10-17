import React, { Component } from 'react'
// import Login from '../login/Login';
import '../../index.css'


export default class Header extends Component {
    render() {
        return (
            <div>
                <div className="container">
                 <div className="header">
                    <div className="logo">
                            React-movies
                            </div>
                            <input type="text" placeholder="Поиск"/>
                            <button className="btn_header">Login</button>
                            {/* <Login/> */}
                     </div>
                  </div>
            </div>
        )
    }
}
