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
        browserHistory.push({pathname: '/assetList'})
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
      <div className="navbar-fixed">
        <nav className="indigo">
          <div className="nav-wrapper container">
            <span href="#" className="center">Hello, {this.state.userName ? `${this.state.userName}` : "please log in or sign up"}</span>
            {this.state.showNav ?
            <ul className="right hide-on-med-and-down">
              <li><Link to="assetList" activeClassName="active">Asset List</Link></li>
              <li><Link to="addAsset" activeClassName="active">Add Asset</Link></li>
              <li><Link to="userList" activeClassName="active">User List</Link></li>
              <li><Link to="addUser" activeClassName="active">Add User</Link></li>
              <li><a href="#logoutModal">Log out</a></li>
            </ul>
            : ""}
            {this.state.showNav ?
            <ul id="nav-mobile" className="side-nav">
              <li><Link to="assetList" activeClassName="active">Asset List</Link></li>
              <li><Link to="addAsset" activeClassName="active">Add Asset</Link></li>
              <li><Link to="userList" activeClassName="active">User List</Link></li>
              <li><Link to="addUser" activeClassName="active">Add User</Link></li>
              <li><a href="#logoutModal">Log out</a></li>
            </ul>
            : ""}
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>
        <div id="logoutModal" className="modal">
          <div className="modal-content">
            <h4>Logout</h4>
            <p>Do you really want to logout?</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this.logOut}>Yes</a>
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">No</a>
          </div>
        </div>
      </div>
    )
  }
};
