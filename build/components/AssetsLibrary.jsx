import React from "react";
import Firebase from "firebase";
import Header from "./Header/Header";
require("./AssetsLibrary.scss");

class AssetsLibrary extends React.Component{
  render() {
    return (
      <div>
        <Header database={this.props.route.database} />
        <main className="container">
            {this.props.children}
        </main>
      </div>
    )
  }
};

export default AssetsLibrary;
