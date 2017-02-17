import React from "react";
import Firebase from "firebase";
import Header from "./Header/Header";
import Drawer from "./Header/Drawer";
require("./AssetsLibrary.scss");

class AssetsLibrary extends React.Component{
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header database={this.props.route.database} />
        <Drawer showNav={true}/>
        <main>
          <div className="wrapper">
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }
};

export default AssetsLibrary;