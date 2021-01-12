import React from 'react'
import { NavLink } from 'react-router-dom'

function ItemCard(props) {

        return (

                <div className="item">
                        <div className="round-image">
                                <img
                                        src={props.image}
                                        alt="item"
                                />
                        </div>
                        <div className="description">
                                <h2>Name of item: {props.name}</h2>
                                <h4>Quantity: {props.quantity} </h4>
                                <p>Description of the item : {props.description}</p>
                                <div className="buttons">
                                        <span>
                                                <button
                                                        className="btn-secondary"
                                                        onClick={e => props.handleDelete(e, props._id)}
                                                >Delete</button>
                                        </span>
                                        <span>
                                                 <NavLink to={`/item/edit/${props._id}`} className="btn-primary">Edit</NavLink>
                                        </span>
                                </div>
                        </div>
                </div>

        )
}

export default ItemCard
