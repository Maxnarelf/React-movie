import React from 'react'
import './Dropdown.css'

class Dropdown extends React.Component {
    state = {
      show: false
    };
  
    toggleShow = () => {
      this.setState(prevState => ({
        show: !prevState.show
      }));
    };
  
    handleClick = () => {
      
      this.toggleShow();
    };
    render() {
        return (
          <div className="Container">
            <div className="Wrapper">
            <img src={`https://secure.gravatar.com/avatar/.jpg?s=64"`} alt=""
                onClick={this.toggleShow}/>
            
              {this.state.show && (
                <div className="Popover">
                <div className="Cover" onClick={this.toggleShow} />
                  <div className="WrapperContent">
                    <div className="Menu">
                     <div className="MenuItem" onClick={this.handleClick}>Log out</div>
                      </div>
                    </div>
                  </div>
              )}
             </div>  
            </div>
        );
      }
    }
    
export default Dropdown;