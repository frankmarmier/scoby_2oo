import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import apiHandler from "./../api/apiHandler";
import MapCardItem from "./../components/Cards/MapCardItem";

const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
	state = {
		longitude: 2.3522,
		latitude: 48.8566,
		allItems: [],
		selectedItem: null,
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

	selectOneItem = (item) => {
		if (!this.state.selectedItem || this.state.selectedItem._id !== item._id)
			this.setState({ selectedItem: item });
		else if (this.state.selectedItem) this.setState({ selectedItem: null });
	};

	render() {
		const { longitude, latitude, allItems, selectedItem } = this.state;

		console.log("selectedItem : ", selectedItem);

		return (
			<div className="mapContainer">
				<h1>The map</h1>
				<Map
					className="mapContainer"
					style="mapbox://styles/abwashere/ckd51anww06nb1jqvlppqdeba"
					containerStyle={{
						height: "100vh",
						width: "100vw",
						zoom: 1,
					}}
					center={[longitude, latitude]}
				>
					{allItems.map((item) => (
						<Marker key={item._id} coordinates={item.location.coordinates}>
							<button
								className="marker-btn"
								onClick={(event) => {
									this.selectOneItem(item);
								}}
							>
								<img src={item.image} alt="marker" />
							</button>
						</Marker>
					))}
				</Map>

				{selectedItem ? (
					<div className="info-card">
						<MapCardItem item={selectedItem} />
					</div>
				) : null}
			</div>
		);
	}
}

export default Home;
