import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { useState } from "react";
import apiHandler from "./../api/apiHandler";

const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
	state = {
		longitude:2.3522,
		latitude:48.8566,
		allItems: [],
	};
	// get coordinate from API

	componentDidMount() {
		console.log("DANS APIHANDLER");

		apiHandler
			.getItems()
			.then((dbRes) => console.log("DB RES ", dbRes))
			.catch((error) => console.log(error));
	}

	// Implement react map box here.

	render() {
		console.log(this.state.longitude, this.state.latitude);
		return (
			<div className="mapContainer">
				<h1>The map</h1>
				<Map
					className="mapContainer"
					style="mapbox://styles/mapbox/streets-v11"
					containerStyle={{
						height: "90vh",
						width: "90vw",
						margin: "auto",
						zoom: 1,
					}}
					center={[this.state.longitude, this.state.latitude]}
				>
		{/* 			{apiData.map((item) => {
						<Layer
						key = {item._id}
							type="symbol"
							id="marker"
							layout={{ "icon-image": "marker-15" }}
						>
							<Feature coordinates={[item.longitude, item.latitude]} />;
						</Layer>;
					})} */}
				</Map>
				;
			</div>
		);
	}
}

export default Home;
