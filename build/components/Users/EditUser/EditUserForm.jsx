import React, { Component } from 'react';
import MdArrowBack from "react-icons/lib/md/arrow-back";
import { Link } from "react-router";

class EditUserForm extends Component {
  constructor(props){
    super();
    this.state = {
      nameInput: "",
      emailInput: "",
      usersDB: props.usersDB
    };
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.addToDB = this.addToDB.bind(this)
  }
  handleNameInput(e) {
    this.setState({
      nameInput: e.target.value
    })
  }
  handleEmailInput(e) {
    this.setState({
      emailInput: e.target.value
    })
  }
  addToDB() {
    var view = this,
        name = this.state.nameInput,
        email = this.state.emailInput,
        obj = {name: name, email: email};
    this.state.usersDB.once("value", function (snapshot) { view.state.usersDB.set(obj) });
    this.setState({nameInput: "", emailInput: ""})
  }
  render() {
    var view = this;
    return (
      <form className="col s12">
        <div className="row">
          <div className="input-field col l4 offset-l4 s12">
            <input id="userName" type="text" className="validate" pattern="[A-Z,a-z, ]*" value={view.state.nameInput} onChange={view.handleNameInput} />
            <label htmlFor="userName">Name</label>
          </div>
          </div>
          <div className="row">
          <div className="input-field col l4 offset-l4 s12">
            <input id="userEmail" type="text" className="validate" value={view.state.emailInput} onChange={view.handleEmailInput} />
            <label htmlFor="userEmail">E-mail</label>
          </div>
        </div>
        <div className="row center-align">
          <button className="waves-effect waves-light btn indigo" onClick={view.addToDB}>edit</button>
          <p id="loginError"></p>
        </div>
      </form>
    );
  }
}

export default EditUserForm;
