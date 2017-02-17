import React from "react";
import Firebase from "firebase";
import { Link, browserHistory } from "react-router";
require("./Header.scss");

export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      usersDB: this.props.database.ref().child("users"),
      userId: "",
      userEmail: "",
      userName: ""
    }
    this.getUserNameWithEmail = this.getUserNameWithEmail.bind(this)
  }
  componentWillMount() {
    var view = this;
    Firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        view.setState({showNav: true, userEmail: firebaseUser.email});
        view.getUserNameWithEmail(firebaseUser.email);
        view.getUserIdWithEmail(firebaseUser.email);
        browserHistory.push({pathname: '/list'})
      } else {
        view.setState({showNav: false, userName: "", userEmail: ""});
        browserHistory.push('/');
      }
    });
  }
  getUserNameWithEmail(e) {
    var view = this;
    this.state.usersDB.once("value", snapshot => {
      var userObj = snapshot.val();
      for (var user in userObj) {
        if (userObj[user].email === e) {
          view.setState({ userName: userObj[user].name });
          break;
        }
      }
    });
  }
  getUserIdWithEmail(e) {
    var view = this,
        result = "";
    this.state.usersDB.once("value", snapshot => {
      var userObj = snapshot.val();
      for (var user in userObj) {
        if (userObj[user].email === e) {
          view.setState({ userId: user });
          break;
        }
      }
    });
  }
  logOut(e) {
    e.preventDefault();
    Firebase.auth().signOut();
    console.log("bye")
  }
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Hello, {this.state.userName ? `${this.state.userName}` : "please log in or sign up"}</span>
          <div className="mdl-layout-spacer"></div>
          {this.state.showNav ?
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <Link className="mdl-navigation__link" to="list">Book List</Link>
            <Link className="mdl-navigation__link" to="addBook">Add Book</Link>
            <Link className="mdl-navigation__link" to="editBook">Edit Book</Link>
            <a href="#" className="mdl-navigation__link" to="account" onClick={this.logOut}>Log out</a>
          </nav>
            : ""}
        </div>
      </header>
    )
  }
};
