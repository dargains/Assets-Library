import React from 'react';
require("./User.scss");

const User = (props) => (
  <li className="collection-item avatar userItem" id={props.id} >
    <img src="images/yuna.jpg" alt="" className="circle" />
    <span className="title">{props.name}</span>
    <p>{props.email}</p>
    <a href="#!" className="secondary-content" onClick={props.onUserEdit}><i className="material-icons blue-text">info</i></a>
  </li>
);

export default User;
