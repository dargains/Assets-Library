import React from 'react';
import ReactDOM from "react-dom";
import Firebase from "firebase";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { AssetsLibrary, LogIn, BookList, EditBook, Error404 } from "./components/index";

(function initFirebase() {
  var config = {
    apiKey: "AIzaSyDFjg6g6a3ioPgRkO-NP9nnp2DfrmYxUyo",
    authDomain: "dargains-test.firebaseapp.com",
    databaseURL: "https://dargains-test.firebaseio.com",
    storageBucket: "dargains-test.appspot.com",
    messagingSenderId: "136892732101"
  };
  Firebase.initializeApp(config);
})();

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={AssetsLibrary} database={Firebase.database()} >
      <IndexRoute component={LogIn} />
      <Route path="list" component={BookList} database={Firebase.database()} />
      <Route path="editBook" component={EditBook} database={Firebase.database()} />
      <Route path="*" component={Error404} />
    </Route>
  </Router>,
  document.getElementById("app")
);
