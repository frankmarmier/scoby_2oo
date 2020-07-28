import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import apiHandler from "./../api/apiHandler";

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
						height: "90vh",
						width: "90vw",
						margin: "auto",
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

					{selectedItem ? (
						<Popup
							coordinates={selectedItem.location.coordinates}
							offset={{
								bottom: [0, -50],
							}}
						>
							selection : {selectedItem.name}  {/* INSERT COMPONENT ITEM CARD  */}
						</Popup>
					) : null}
				</Map>
			</div>
		);
	}
}

export default Home;
