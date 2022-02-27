import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-container">
      <p>Venue : {props.data.Venue}</p>
      <p>Venue ID : {props.data.VenueId}</p>
    </div>
  );
};

export default Card;
