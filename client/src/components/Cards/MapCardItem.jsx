import React from "react";
import { Link } from "react-router-dom";

function MapCardItem({ item }) {
	return (
		<div className="map-card">
			<img className="item-img" src={item.image} alt={item.name} />
			<h2 className="name">{item.name}</h2>
			<h4 className="category">
				Quantity: {item.quantity} | {item.category}{" "}
			</h4>
			<p className="desc">{item.description}</p>
			<p className="address">{item.address}</p>
			<div className="owner">
				<div className="pic">
					<img src={item.id_user.profileImg} alt="owner picture" />
				</div>
				Given away by {item.id_user.firstName}
			</div>
			<div className="contact">
				<p>
					Contact {item.id_user.firstName} at
					<b> this is email {item.id_user.email}</b>
				</p>
			</div>
		</div>
	);
}

export default MapCardItem;
