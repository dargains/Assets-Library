import React from "react";
import Firebase from "firebase";
import { browserHistory } from "react-router"
import Book from "./Book";
import Device from "./Device";
import AssetFilter from "./AssetFilter";
require("./AssetList.scss")

const AssetList = React.createClass({
  getInitialState: function() {
    return {
      users: {},
      usersDB: this.props.route.database.ref().child("users"),
      booksDB: this.props.route.database.ref().child("books"),
      devicesDB: this.props.route.database.ref().child("devices"),
      userEmail: "",
      userName: "",
      books: {},
      devices: {},
      typeList: ["books","devices"],
      searchInput: "",
      showRented: true
    }
  },
  handleShowRented: function() {
    var newState = !this.state.showRented;
    this.setState({showRented: newState});
  },
  searchAssets: function(searchText) {
    this.setState({searchInput: searchText})
  },
  updateTypeList: function(newList) {
    this.setState({typeList: newList})
  },
  goToEdit: function(e) {
    e = e || window.event;
    e.stopPropagation();
    var target = e.target || e.srcElement,
        key = target.parentElement.parentElement.id;
    browserHistory.push({pathname: '/editbook', query: {key: key}});
  },
  componentWillMount: function() {
    var view = this;
    this.state.booksDB.on("value", snapshot => {
      view.setState({books: snapshot.val()});
    });
    this.state.devicesDB.on("value", snapshot => {
      view.setState({devices: snapshot.val()});
    });
    Firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        view.setState({ userEmail: firebaseUser.email });
        view.getUserNameWithEmail(firebaseUser.email)
      }
    });
  },
  getTodayDate: function() {
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
  getUserNameWithEmail: function(e) {
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
  getUserIdWithEmail: function(e) {
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
        type = e.target.parentElement.getAttribute("data-type"),
        obj = {
          dateInit: view.getTodayDate(),
          user: view.state.userName
        };
    if(type === "book"){
      view.state.booksDB.once("value", snapshot => {
        view.state.booksDB.child(id).child("log").push(obj);
        view.state.booksDB.child(id).update({isOccupied: true});
        Materialize.toast('Asset grabbed', 4000);
      });
    } else if (type === "device") {
      view.state.devicesDB.once("value", snapshot => {
        view.state.devicesDB.child(id).child("log").push(obj);
        view.state.devicesDB.child(id).update({isOccupied: true});
        Materialize.toast('Asset grabbed', 4000);
      });
    }
  },
  returnAsset: function(e) {
    var view = this,
        type = e.target.parentElement.getAttribute("data-type"),
        id = e.target.parentElement.parentElement.id;
    if (type === "book") {
      view.state.booksDB.once("value", snapshot => {
        var obj = snapshot.val()[id].log,
            array = Object.keys(obj),
            lastLogId = array[array.length - 1];
        view.state.booksDB.child(id).child("log").child(lastLogId).update({dateFin: view.getTodayDate()});
        view.state.booksDB.child(id).update({isOccupied: false});
        Materialize.toast('Asset returned', 4000);
      });
    } else if (type === "device") {
      view.state.devicesDB.once("value", snapshot => {
        var obj = snapshot.val()[id].log,
            array = Object.keys(obj),
            lastLogId = array[array.length - 1];
        view.state.devicesDB.child(id).child("log").child(lastLogId).update({dateFin: view.getTodayDate()});
        view.state.devicesDB.child(id).update({isOccupied: false});
        Materialize.toast('Asset returned', 4000);
      });
    }
  },
  requestAsset: function(e) {
    console.log("send request")
    var view = this;
    Materialize.toast('Asset requested', 4000);
  },
  prepareBookList: function() {
    var view = this,
        bookList = [],
        books = view.state.books,
        loggedUser = view.state.userName,
        searchInput = view.state.searchInput,
        showRented = view.state.showRented;
    for(var item in books) {
      //if(books[item] !== 0) {
      if (
        (showRented || !books[item].isOccupied) &&
        ((books[item].title.toLowerCase().indexOf(searchInput) != -1) ||
        (books[item].author.toLowerCase().indexOf(searchInput) != -1))
      ) {
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
                            image={books[item].image}
                            tags={books[item].tags}
                            isOccupied={books[item].isOccupied}
                            user={user}
                            date={date}
                            isUser={isUser}
                            handleInfo={view.goToEdit}
                            handleGrab={view.grabAsset}
                            handleReturn={view.returnAsset}
                            handleRequest={view.requestAsset}
                      />
        )
      }
      //}
    }
    return bookList;
  },
  prepareDeviceList: function() {
    var view = this,
        deviceList = [],
        devices = view.state.devices,
        loggedUser = view.state.userName,
        searchInput = view.state.searchInput,
        showRented = view.state.showRented;
    for(var item in devices) {
      //if(books[item] !== 0) {
      if (
        (showRented || !devices[item].isOccupied) &&
        ((devices[item].model.toLowerCase().indexOf(searchInput) != -1) ||
        (devices[item].brand.toLowerCase().indexOf(searchInput) != -1))
      ) {
        let user = "",
            date = "",
            isUser = false;
        if (devices[item].isOccupied) {
          let lastLog = devices[item].log[Object.keys(devices[item].log)[Object.keys(devices[item].log).length - 1]];
          user = lastLog.user;
          date = lastLog.dateInit;
          if (user === loggedUser) isUser = true;
        }
        deviceList.push(<Device key={item}
                            id={item}
                            model={devices[item].model}
                            brand={devices[item].brand}
                            image={devices[item].image}
                            tags={devices[item].tags}
                            isOccupied={devices[item].isOccupied}
                            user={user}
                            date={date}
                            isUser={isUser}
                            handleInfo={view.goToEdit}
                            handleGrab={view.grabAsset}
                            handleReturn={view.returnAsset}
                            handleRequest={view.requestAsset}
                      />
        )
      }
      //}
    }
    return deviceList;
  },
  render: function() {
    var bookList = this.prepareBookList(),
        deviceList = this.prepareDeviceList(),
        typeList = this.state.typeList;
    return (
      <section className="AssetList">
        <h1>Assets list</h1>
        <AssetFilter onTypeChange={this.updateTypeList} onSearchInput={this.searchAssets} onShowRentedClick={this.handleShowRented} />
        <div className="card-container">
          {typeList.includes("devices") ? deviceList : ""}
          {typeList.includes("books") ? bookList : ""}
        </div>
    </section>
    );
  }
});

export default AssetList;
