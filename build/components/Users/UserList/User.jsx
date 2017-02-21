import React from 'react';
require("./User.scss");

const User = (props) => (
  <tr id={props.id} onClick={props.onUserEdit} className="userTr" >
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td><i onClick={props.onUserDelete} className="material-icons mdl-list__item-icon deleteIcon deleteButton">delete</i></td>
  </tr>
);

export default User;
