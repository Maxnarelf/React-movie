import React from 'react';
import CallApi from '../../Api/api';
import classNames from 'classnames';
import { AppContext } from '../App';
// import Modal from './Modal/Modal';

 class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        errors: {},
        submitting: false
    };
    onChange = e =>{
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                base: null,
                [name]: null
            }
        }))
    }
    validateFields = () => {
        const errors = {};

        if(this.state.username ==="") {
            errors.username = "Not empty"
        }
        return errors;
        
       
    }
    
    onSubmit = () => {
         this.setState({
            submitting: true
        })
          // цепочка промисов
            CallApi.get("/authentication/token/new")
           .then(data => {
                return  CallApi.post("/authentication/token/validate_with_login", {
                    body:{
                        username: this.state.username,
                        password: this.state.password,
                        request_token: data.request_token
                    }
                })
                })
                .then(data => {
                  return  CallApi.post("/authentication/session/new", {
                    body: {
                        request_token: data.request_token
                    }
                  })
                })
                .then(data => {
                    this.props.updateSessionId(data.session_id)
                    return CallApi.get("/account", {
                        params: {
                            session_id: data.session_id
                        }
                    }) 
                })
                .then(user =>{
                    this.setState({
                        submitting: false
                    }, () => {
                        this.props.updateUser(user);
                    })
                })
                .catch(error => {
                    this.setState({
                        submitting: false,
                        errors: {
                            base: error.status_message
                        }
                    })
                  
                });
            };

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }else {
           this.onSubmit()
        }
    }
    hendleBlur = () =>{
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }
        
    }

    getClassForInput = key =>
        classNames("form-control", {
            "invalid": this.state.errors[key] 
    })
    render() {
        const {username, password, errors, submitting} = this.state
        
        return (
            <div>
               <form action="">
                    <h1>Авторизация</h1>
                    <div>
                    <label htmlFor="username">Логин</label>
                    <input 
                        type="text"
                        className={this.getClassForInput("username")} 
                        id="username"
                        placeholder="Пользователь"
                        name="username"
                        value={username}
                        onChange={this.onChange }
                        onBlur={this.hendleBlur}
                    />
                    {errors.username && (
                        <div className="invalid__feedback">{errors.username}</div>
                    )}
                    </div>
                    <div>
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password"
                        className={this.getClassForInput("password")} 
                        id="password"
                        placeholder="пароль"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        onBlur={this.hendleBlur}
                    />
                    {errors.password && (
                        <div className="invalid__feedback">{errors.password}</div>
                    )}
                    </div>
                    
                    <button
                        type="submit"
                        className="..."
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        Войти
                    </button>
                    {errors.base && (
                        <div className="invalid__feedback">{errors.base}</div>
                    )}
                 </form>
               
                   
            </div>
        )
    }
}

 const LoginFormContainer = (props) => {
    return (
        <AppContext.Consumer>
            {context => <LoginForm updateUser={context.updateUser} {...props}/>}
        </AppContext.Consumer>
    )
}

LoginFormContainer.displayName = "LoginFormContainer"
export default LoginFormContainer;