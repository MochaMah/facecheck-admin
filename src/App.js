import Login from "./Component/Login/Login";
import Main from "./Component/Main/Main";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      mainPathApi: "https://localhost:44331/",
      alertMessage: "",
      onLoading: false,
      username: "",
    };
  }

  onLoading = (value) => {
    this.setState({ onLoading: value });
  };
  onSetAlert = (value) => {
    this.setState({ alertMessage: value });
  };
  onClearAlert = () => {
    this.setState({ alertMessage: "" });
  };
  onSetToken = (value) => {
    this.setState({ token: value });
  };
  onSetUsername = (value) => {
    this.setState({ username: value });
  };
  onSetCookie = (token, username) => {
    Cookies.set("facecheckToken", token);
    Cookies.set("facecheckUsername", username);
    window.location.reload(false);
  };
  onRemoveCookie = () => {
    Cookies.remove("facecheckToken");
    Cookies.remove("facecheckUsername");
  };

  componentDidMount() {
    const cookieToken = Cookies.get("facecheckToken");
    const cookieUsername = Cookies.get("facecheckUsername");

    if (!cookieToken) {
      this.onSetToken("");
    } else {
      this.onSetToken(cookieToken);
    }

    if (!cookieUsername) {
      this.onSetUsername("");
    } else {
      this.onSetUsername(cookieUsername);
    }
  }

  render() {
    return (
      <Router basename={"/FacecheckAdmin"}>
        {this.state.onLoading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="main-background" />
        <div className="background-mask" />
        <div className="app-align">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Login
                  onSetToken={this.onSetToken}
                  onSetAlert={this.onSetAlert}
                  onClearAlert={this.onClearAlert}
                  onSetCookie={this.onSetCookie}
                  onLoading={this.onLoading}
                  onSetUsername={this.onSetUsername}
                  mainPathApi={this.state.mainPathApi}
                  token={this.state.token}
                />
              )}
            />
            <Route exact path="/Main" render={(props) => <Main />} />
          </Switch>
          <div
            className="alert alert-danger"
            id="alert"
            role="alert"
            style={{ display: this.state.alertMessage === "" ? "none" : "" }}
            onClick={this.onClearAlert}
          >
            {this.state.alertMessage}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
