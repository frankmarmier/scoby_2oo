import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import apiHandler from "./../api/apiHandler";

const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
	state = {
		longitude: 2.3522,
		latitude: 48.8566,
		allItems: [],
	};

	// get coordinate from API
	componentDidMount() {
		console.log("DANS APIHANDLER");

		apiHandler
			.getItems()
			.then((dbRes) => {
				console.log("DB RES ITEMS ", dbRes);
				this.setState({ allItems: dbRes });
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<div className="mapContainer">
				<h1>The map</h1>
				<Map
					className="mapContainer"
					style="mapbox://styles/abwashere/ckd51anww06nb1jqvlppqdeba"
					containerStyle={{
						height: "90vh",
						width: "90vw",
						margin: "auto",
						zoom: 1,
					}}
					center={[this.state.longitude, this.state.latitude]}
				>
					{this.state.allItems.map((item) => (
						<Marker key={item._id} coordinates={item.location.coordinates}>
							<button className="marker-btn">
								<img src="./../media/marker-purple.svg" alt="marker" />
							</button>
						</Marker>
					))}
				</Map>
			</div>
		);
	}
}

export default Home;
