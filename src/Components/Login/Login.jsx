import React, { Component } from 'react'
import Modal from './Modal/Modal';
import LoginForm from './LoginForm';
import { withAuth } from '../../hoc/withAuth';
import '../../index.css';

class Login extends Component {
    render() {
        const {auth, authActions} = this.props;
        return (
            <Modal showModal={auth.showLoginModal} toggleModal={authActions.toggleLoginModal}>
                <LoginForm  />
            </Modal>
        )
    }
}
export default withAuth(Login);