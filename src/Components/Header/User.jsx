import React, { Component } from 'react';
import { fetchApi, API_URL, API_KEY_3 } from '../../Api/api';
import AppContextHOC from '../HOC/AppContextHOC';
import "./Dropdown/Dropdown.css";

class User extends Component {
    state = {
        show: false
      };
    
      toggleShow = () => {
        this.setState(prevState => ({
          show: !prevState.show
        }));
      };
    
      handleLogOut = () => {
        fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                session_id: this.props.session_id
            })
        }).then(() => {
            this.props.onLogOut();
        });
      };

    render() {
        const {user} = this.props
        return (
           <div className="Container">
            <div className="Wrapper">
            <img src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`} alt=""
                onClick={this.toggleShow}/>
            
              {this.state.show && (
                <div className="Popover">
                <div className="Cover" onClick={this.toggleShow} />
                  <div className="WrapperContent">
                    <div className="Menu">
                     <div className="MenuItem" onClick={this.handleLogOut}>Выйти</div>
                      </div>
                    </div>
                  </div>
              )}
             </div>  
            </div>
        )
    }
}

//  const UserContainer = (props) => {
//     return (
//     <AppContext.Consumer>
//         {context => {
//             return <User {...context}{...props}/>
//         }}
//     </AppContext.Consumer>
//     )
// }
// UserContainer.displayName = "UserContainer";   

export default AppContextHOC(User);