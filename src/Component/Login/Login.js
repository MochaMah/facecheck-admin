import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onLoginSuccess = (value) => {
    this.props.onClearAlert();
    this.props.onSetToken(value.token);
    this.props.onSetCookie(value.token, this.state.username);
    this.props.history.push("/main");
  };

  onLoginFails = (value) => {
    this.props.onSetAlert(value.status);
  };

  onConnectionError(value) {
    this.props.onSetAlert(value);
  }

  onLogin = async (event) => {
    event.preventDefault();
    this.props.onLoading(true);
    await Axios.post(this.props.mainPathApi + "api/Login", {
      UserName: this.state.username,
      Password: this.state.password,
    })
      .then((response) => {
        this.props.onLoading(false);
        if (response.data.token !== "") {
          this.onLoginSuccess(response.data);
        } else this.onExpired();
      })
      .catch((error) => {
        this.props.onLoading(false);
        if (error.response) {
          this.onLoginFails(error.response.data);
        } else {
          this.onConnectionError(
            "Network error: Please check your internet connection."
          );
        }
      });
  };

  handleUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  componentDidMount() {
    if (this.props.token !== "" && this.props.token !== undefined) {
      this.props.history.push("/main");
    }
  }

  componentDidUpdate() {
    if (this.props.token !== "" && this.props.token !== undefined) {
      this.props.history.push("/main");
    }
  }

  render() {
    return (
      <div className="login">
        <div className="auth-inner">
          <form
            onSubmit={this.onLogin}
            style={{ position: "relative", paddingBottom: "100px" }}
          >
            <div
              style={{
                fontFamily: "KlavikaBoldBold",
                fontSize: "4rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ color: "#1479FF" }}>facecheck</div>
              <div style={{ color: "#FFCC16" }}>service</div>
            </div>

            <div className="form-group">
              <i className="bi bi-person-fill"></i>
              <input
                type="username"
                className="py-1 ps-5 form-control form-control-lg "
                placeholder="Enter username"
                onChange={this.handleUserNameChange}
                required
              />
            </div>

            <div className="form-group">
              <i className="bi bi-lock-fill"></i>
              <input
                type="password"
                className="py-1 ps-5 form-control form-control-lg"
                placeholder="Enter password"
                onChange={this.handlePasswordChange}
                required
              />
            </div>

            <div>ระบบ Facecheck Services Admin สำหรับจัดการบัญชีผู้ใช้งาน</div>
            <button
              className="btn btn-primary btn-block login-btn position-absolute bottom-0 end-0"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
//withRouter
