import React, { Component } from 'react';
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api';
import { withAuth } from '../../hoc/withAuth';
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
        fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}&session_id=${this.props.auth.session_id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
           
        }).then(() => {
            this.props.authActions.onLogOut();
        });
      };

    render() {
        const {auth} = this.props
        return (
           <div className="Container">
            <div className="Wrapper">
            <img src={`https://secure.gravatar.com/avatar/${auth.user.avatar.gravatar.hash}.jpg?s=64"`} alt=""
                className="avatar"
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

export default withAuth(User);