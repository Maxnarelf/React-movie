import React, { Component } from 'react'

import Modal from './Modal/Modal';
import LoginForm from './LoginForm';
import '../../index.css';

export default class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            showModal : false
        }
    }

    toggleModal=() => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }
    
    render() {
        const {showModal} = this.state
        const {updateSessionId} =this.props
        return (
            <div>
                <button 
                    className="btn_header"
                    type="button"
                    onClick={this.toggleModal}
                >
                    Login
                </button>
                <Modal showModal={showModal} toggleModal={this.toggleModal}>
                       <LoginForm   updateSessionId={updateSessionId}/>
                   </Modal>
            </div>
        )
    }
}
