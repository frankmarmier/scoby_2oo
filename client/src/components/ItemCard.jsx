import React, { Component } from "react";

export class ItemCard extends Component {
  render() {
    return (
      <div className="CardItem">
        <div>
          <button>close</button>
          <img src="" alt="" />
          <h2>Item name</h2>
          <p>Quantity: number | category</p>
          <p>id_user.name</p>
          <p>address</p>
          <p>emoji Given away by id_user.name</p>
          <p>No contact details</p>
        </div>
      </div>
    );
  }
}

export default ItemCard;
