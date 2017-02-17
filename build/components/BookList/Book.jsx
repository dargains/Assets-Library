import React from 'react';
require("./Book.scss");

const Book = props =>
  <div className="mdl-card mdl-shadow--3dp" id={props.id} >
    <div className="mdl-card__title mdl-card--expand">
      <div>
        <h1 className="mdl-card__title-text">{props.name}</h1>
        <h2 className="mdl-card__subtitle-text">{props.author}</h2>
      </div>
    </div>
    <div className="mdl-card__supporting-text">{props.description}</div>
    <div className="mdl-card__supporting-text tags"><small>Tags: {props.tags}</small></div>
    <div className="mdl-card__supporting-text"><small>Currently {props.isOccupied ? `with ${props.user}, since ${props.date}` : "available"}</small></div>
    <div className="mdl-card__actions mdl-card--border">
      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" disabled={props.isOccupied}>
        Grab
      </a>
			{props.isOccupied ?
			<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Request
      </a> : ""}
    </div>
  </div>

export default Book;
