import React from 'react';

const Device = props =>
<div className="card large sticky-action" id={props.id} >
  <div className="card-image waves-effect waves-block waves-light">
    <img className="activator" src={props.image} />
  </div>
  <div className="card-content">
    <span className="card-title activator grey-text text-darken-4">{props.model}<i className="material-icons right">more_vert</i></span>
    <p>{props.brand}</p>
  </div>
  <div className="card-reveal">
    <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
    <p>Tags: {props.tags}</p>
    <p>Currently {props.isOccupied ? `with ${props.user}, since ${props.date}` : "available"}</p>
  </div>
  <div className="card-action" data-type="device">
    <button href="#" onClick={props.isOccupied ? "" : props.handleGrab} className={"waves-effect waves-indigo btn-flat indigo-text " + (props.isOccupied ? 'disabled' : '')}>Grab</button>
    {props.isOccupied ? props.isUser ?
      <button className="waves-effect waves-red btn-flat blue-text" onClick={props.handleReturn}>Return</button>
      :
      <button className="waves-effect waves-blue btn-flat blue-text" onClick={props.handleRequest}>Request</button>
      : ""
    }
    <i className="small material-icons right blue-text info" onClick={props.handleInfo}>info_outline</i>
  </div>
</div>

export default Device;
