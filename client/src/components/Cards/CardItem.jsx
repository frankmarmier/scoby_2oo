import React from "react";
import { Link } from "react-router-dom";

function CardItem({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <h4>Quantity: {item.quantity} </h4>
      <p>{item.description}</p>
      <div className="buttons">
        <button
          className="btn-secondary"
          onClick={delete(item._id)}
        >
          Delete
        </button>

        <Link to={`/items/${item._id}`}>
          <button className="btn-primary">Edit</button>
        </Link>

      </div>
    </div>
  );
}

export default CardItem;
