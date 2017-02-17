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
      <form className="loginForm">
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="inputEmail" value={this.state.emailInput} onChange={this.handleEmailInput} />
          <label className="mdl-textfield__label" htmlFor="inputEmail">Email</label>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="password" id="inputPassword" value={this.state.passwordInput} onChange={this.handlePasswordInput} />
          <label className="mdl-textfield__label" htmlFor="inputPassword">Password</label>
        </div>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onClick={this.handleLogin.bind(view)}>Log in</button>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.handleSignup.bind(view)}>Sign up</button>
        <p id="loginError"></p>
      </form>
    )
  }
}

export default LogIn;