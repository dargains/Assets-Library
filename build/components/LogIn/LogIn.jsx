import React from "react";
import { browserHistory } from "react-router";
import Firebase from "firebase";
require("./LogIn.scss");

class LogIn extends React.Component{
  constructor(props){
    super();
    this.state = {
      emailInput: "",
      passwordInput: ""
    };
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleEmailInput(e) {
    this.setState({ emailInput: e.target.value })
  }
  handlePasswordInput(e) {
    this.setState({ passwordInput: e.target.value })
  }
  handleLogin(e) {
    var view = this,
        message = document.getElementById("loginError");
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(view.state.emailInput, view.state.passwordInput).catch(e => {
      message.innerHTML = e.message;
    });
  }
  handleSignup(e) {
    var view = this,
        message = document.getElementById("loginError");
    e.preventDefault();
    Firebase.auth().createUserWithEmailAndPassword(view.state.emailInput, view.state.passwordInput).catch(e => {
      message.innerHTML = e.message;
      setTimeout(() => {$(".form-group").removeClass("has-danger"); message.innerHTML = ""; }, 2000); $(".form-group").addClass("has-danger");
    });
  }
  render() {
    var view = this;
    return (
      <div className="login row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col l4 offset-l4 s12">
              <input id="inputEmail" type="text" className="validate" value={this.state.emailInput} onChange={this.handleEmailInput} />
              <label htmlFor="inputEmail">Email</label>
            </div>
            </div>
            <div className="row">
            <div className="input-field col l4 offset-l4 s12">
              <input id="inputPassword" type="password" className="validate" value={this.state.passwordInput} onChange={this.handlePasswordInput} />
              <label htmlFor="inputPassword">Password</label>
            </div>
          </div>
          <div className="row center-align">
            <button className="waves-effect waves-light btn indigo" onClick={this.handleLogin.bind(view)}>Log in</button>
            <button className="waves-effect waves-light btn blue" onClick={this.handleSignup.bind(view)}>Sign up</button>
            <p id="loginError"></p>
          </div>
        </form>
      </div>
    )
  }
}

export default LogIn;
