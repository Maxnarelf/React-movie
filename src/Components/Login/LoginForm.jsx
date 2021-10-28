import React from "react";
import CallApi from "../../api/api";
import classNames from "classnames";
import { withAuth } from "../../hoc/withAuth";
import "../../Styles/loginform.css";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {},
    submitting: false,
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }));
  };
  hendleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };
  validateFields = () => {
    const errors = {};
    const {username, password} = this.state;
    if (!username) {
      errors.username = "Not empty";
    }
    if (!password) {
      errors.password = "Not empty";
    }
    return errors;
  };

  onSubmit = () => {
    this.setState({
      submitting: true,
    });

    CallApi.get("/authentication/token/new")
      .then((data) => {
        const {username, password} = this.state;
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username,
            password,
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token,
          },
        });
      })
      .then((data) => {
        const {updateAuth,toggleLoginModal} = this.props.authActions;
        CallApi.get("/account", {
          params: {
            session_id: data.session_id,
          },
        }).then((user) => {
          this.setState({
            submitting: false,
          });
          updateAuth({
            user,
            session_id: data.session_id,
          });
          toggleLoginModal();
        });
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  getClassForInput = (key) =>
    classNames("loginform_input", {
      invalid: this.state.errors[key],
    });
  render() {
    const { username, password, errors, submitting } = this.state;

    return (
      <div className="loginform">
        <form action="">
          <h1>Авторизация</h1>
          <div>
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              className={this.getClassForInput("username")}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.hendleBlur}
            />
            {errors.username && (
              <div className="invalid_input">{errors.username}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.hendleBlur}
            />
            {errors.password && (
              <div className="invalid_input">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="loginform_btn"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Войти
          </button>
          {errors.base && <div className="invalid_btn">{errors.base}</div>}
        </form>
      </div>
    );
  }
}

export default withAuth(LoginForm);
