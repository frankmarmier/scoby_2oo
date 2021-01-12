import React from 'react'

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
                                                <button
                                                        className="btn-primary"
                                                        onClick={e => props.handleEdit(e, props._id)}
                                                >Edit</button>
                                        </span>
                                </div>
                        </div>
                </div>

        )
}

export default ItemCard
