import React from "react";
import { Link } from "react-router";

const Drawer = (props) =>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Title</span>
        {props.showNav ? 
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <Link className="mdl-navigation__link" to="list">Book List</Link>
            <Link className="mdl-navigation__link" to="addBook">Add Book</Link>
            <Link className="mdl-navigation__link" to="editBook">Edit Book</Link>
          </nav>
            : ""}
      </div>

export default Drawer;