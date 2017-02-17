import React from "react";
import Firebase from "firebase";
import { browserHistory } from "react-router"
import Book from "./Book";
require("./BookList.scss")

const BookList = React.createClass({
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
  getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
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
  grabAsset: function(e) {
    var view = this,
        id = e.target.parentElement.parentElement.id,
        obj = {
          dateInit: view.getTodayDate(),
          user: view.state.userName
        };
    view.state.booksDB.once("value", snapshot => {
      view.state.booksDB.child(id).child("log").push(obj);
      view.state.booksDB.child(id).update({isOccupied: true})
    });
  },
  returnAsset: function(e) {
    var view = this,
        id = e.target.parentElement.parentElement.id;
    view.state.booksDB.once("value", snapshot => {
      var obj = snapshot.val()[id].log,
          array = Object.keys(obj),
          lastLogId = array[array.length - 1];
      view.state.booksDB.child(id).child("log").child(lastLogId).update({dateFin: view.getTodayDate()});
      view.state.booksDB.child(id).update({isOccupied: false});
    });
  },
  requestAsset: function(e) {
    console.log("send request")
    var view = this;
    
  },
  prepareListForRender() {
    var view = this,
        bookList = [],
        books = view.state.books,
        loggedUser = view.state.userName;
    for(var item in books) {
      if(books[item] !== 0) {
        let user = "",
            date = "",
            isUser = false;
        if (books[item].isOccupied) {
          let lastLog = books[item].log[Object.keys(books[item].log)[Object.keys(books[item].log).length - 1]];
          user = lastLog.user;
          date = lastLog.dateInit;
          if (user === loggedUser) isUser = true;
        }
        bookList.push(<Book key={item}
                            id={item}
                            title={books[item].title}
                            author={books[item].author}
                            description={books[item].description}
                            tags={books[item].tags}
                            isOccupied={books[item].isOccupied}
                            user={user}
                            date={date}
                            isUser={isUser}
                            onBookInfo={view.getBookInfo}
                            handleGrab={view.grabAsset}
                            handleReturn={view.returnAsset}
                            handleRequest={view.requestAsset}
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
