import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions";
import * as actions from '../../store/actions';

import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import { userService } from '../../services/userService';
import { handleLoginApi } from '../../services/userService';
import { toast } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      errMessage: '',
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        toast.success('Login success!');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
    console.log(this.state.isShowPassword);
  };

  handleEnterButton = (event) => {
    if (event.keyCode === 13 && event.key === 'Enter') {
      this.handleLogin();
    }
  }
  render() {
    return (
      <div className="login-background d-flex align-items-center">
        <div className="login-container">
          <div className="login-content row p-5">
            <div className="col-12 text-center mb-3">
              <h1> Login </h1>
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor=""> Username </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
                onKeyDown={(event) => this.handleEnterButton(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor=""> Password </label>
              <div className="input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleEnterButton(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? 'fa-solid fa-eye show-password'
                        : 'fa-solid fa-eye show-password'
                    }
                  />
                </span>
              </div>
            </div>
            <div className="col-12 login-input">
              <button className="btn" onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12 login-input forgot-password">
              <a href=""> Forgot your password ? </a>
            </div>
            <div className="col-12 text-danger text-center p-3">
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <h5 className="text-center"> Or Login with : </h5>
            </div>
            <div className="col-12 social-login">
              <a href="">
                <i className="fa-brands fa-facebook" />
              </a>
              <a href="">
                <i className="fa-brands fa-google-plus" />
              </a>
              <a href="">
                <i className="fa-brands fa-twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
