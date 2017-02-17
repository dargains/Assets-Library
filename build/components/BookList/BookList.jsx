import React from "react";
import Firebase from "firebase";
import { browserHistory } from "react-router"
import Book from "./Book";
require("./BookList.scss")

var BookList = React.createClass({
  getInitialState: function() {
    return {
      users: {},
      usersDB: this.props.route.database.ref().child("users"),
      booksDB: this.props.route.database.ref().child("books"),
      userEmail: "",
      userName: ""
    }
  },
  getBookInfo: function(e) {
    e = e || window.event;
    e.stopPropagation();
    var target = e.target || e.srcElement,
        key = target.parentElement.parentElement.id;
    console.log(`Edit book key ${key}`)
  },
  componentWillMount: function() {
    var view = this;
    this.state.booksDB.on("value", snapshot => view.setState({books: snapshot.val()}));
    Firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        view.setState({ userEmail: firebaseUser.email });
        view.getUserNameWithEmail(firebaseUser.email)
      }
    });
  },
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
  },
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
  },
  prepareListForRender() {
    var view = this,
        bookList = [],
        books = view.state.books;
    for(var item in books) {
      if(books[item] !== 0) {
        var user = "",
            date = "";
        if (books[item].isOccupied) {
          var log = books[item].log;
          for(var logItem in log) {
            user = log[logItem].user;
            date = log[logItem].dateInit;
          }
        }
        bookList.push(<Book key={item}
                            id={item}
                            name={books[item].name}
                            author={books[item].author}
                            description={books[item].description}
                            tags={books[item].tags}
                            isOccupied={books[item].isOccupied}
                            user={user}
                            date={date}
                            onBookInfo={view.getBookInfo}
                            />
        )
      }
    }
    return bookList;
  },
  render: function() {
    var bookList = this.prepareListForRender()
    return (
      <div className="card-container">
        {bookList}
      </div>
    );
  }
});

export default BookList;
