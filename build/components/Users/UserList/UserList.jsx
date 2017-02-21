import React from "react";
import { browserHistory } from "react-router"
import User from "./User";

var UserList = React.createClass({
  getInitialState: function() {
    return {
      users: {},
      usersDB: this.props.route.database.ref().child("users")
    }
  },
  removeFromDB: function(e) {
    e = e || window.event;
    e.stopPropagation();
    var target = e.target || e.srcElement,
        key = target.parentElement.parentElement.id;
    this.state.usersDB.child(key).remove();
  },
  editUser: function(e){
    e = e || window.event;
    e.stopPropagation();
    var target = e.target.parentElement || e.srcElement,
        key = target.id;
    browserHistory.push({pathname: '/edituser', query: {key: key}});
  },
  componentWillMount: function() {
    var view = this;
    this.state.usersDB.on("value", snapshot => view.setState({users: snapshot.val()}))
  },
  prepareListForRender() {
    var view = this,
        userList = [],
        users = view.state.users;
    for(var item in users) {
      if(users[item] !== 0) userList.push(
        <User key={item}
              id={item}
              name={users[item].name}
              email={users[item].email}
              onUserDelete={view.removeFromDB}
              onUserEdit={view.editUser}
              />
      )
    }
    return userList;
  },
  render: function() {
    var userList = this.prepareListForRender()
    return (
      <div className="userList row">
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th data-field="name">Name</th>
              <th data-field="email">E-mail</th>
              <th data-field="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList}
          </tbody>
        </table>
      </div>
    );
  }
});

export default UserList;
