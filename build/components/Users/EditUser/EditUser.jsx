import React, { Component } from 'react';
import EditUserForm from "./EditUserForm";
import UserChart from "./UserChart";
import MdArrowBack from "react-icons/lib/md/arrow-back";
import { Link } from "react-router";
require("./EditUser.scss");

class EditUser extends Component {
  constructor(props){
    super();
    this.state = {
      usersDB: props.route.database.ref().child("users"),
      userKey: props.location.query.key,
      editUser: false
    };
    this.getUserData = this.getUserData.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  getUserData() {
    var view = this,
        userObj = {};
    this.state.usersDB.once("value", function (snapshot) {
      let user = snapshot.val()[view.state.userKey]
      userObj.name = user.name;
      userObj.email = user.email;
      userObj.image = user.image;
    });
    return userObj;
  }
  showForm() {
    var newState = !this.state.editUser;
    this.setState({editUser: newState})
  }
  render() {
    var view = this,
        userObj = view.getUserData();
    var name = userObj.name,
        email = userObj.email,
        image = userObj.image;
    return (
      <div className="userDetails">
        <div className="row">
          <Link to="userList" className="mdl-navigation__link backLink"> <MdArrowBack /> back </Link>
        </div>
        <div className="row">
          <div className="col s12 m3">
            <div className="userImage" style={{backgroundImage: `url(${image})`}}></div>
          </div>
          <div className="userInfo col s12 m8">
            <h3>{name}</h3>
            <p>{email}</p>
          </div>
        </div>
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
