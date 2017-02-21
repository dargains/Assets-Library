import React, { Component } from 'react';
import EditUserForm from "./EditUserForm";
import UserChart from "./UserChart";
import MdArrowBack from "react-icons/lib/md/arrow-back";
import { Link } from "react-router";

class EditUser extends Component {
  constructor(props){
    super();
    this.state = {
      usersDB: props.route.database.ref().child("users"),
      userKey: props.location.query.key,
      editUser: false
    };
    this.getUserName = this.getUserName.bind(this)
    this.showForm = this.showForm.bind(this)

  }
  getUserName() {
    var view = this,
        name = "";
    this.state.usersDB.once("value", function (snapshot) { name = snapshot.val()[view.state.userKey].name });
    return name;
  }
  showForm() {
    var newState = !this.state.editUser;
    this.setState({editUser: newState})
  }
  render() {
    var view = this;
    return (
      <div className="row">
        <Link to="userList" className="mdl-navigation__link"> <MdArrowBack /> back </Link>
        <h3>{view.getUserName()}</h3>
        <h5>Assets grabbed</h5>
        <UserChart />
        {view.state.editUser ?
          <EditUserForm database={view.state.usersDB} /> :
          <button className="waves-effect waves-light btn indigo" onClick={view.showForm}>edit user</button>
        }
      </div>
    );
  }
}

export default EditUser;
