import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


const Home = (props) => {
  // Implement react map box here.
  const Map = ReactMapboxGl({
		accessToken:
			"pk.eyJ1IjoiYWJ3YXNoZXJlIiwiYSI6ImNrZDRtdWVrMjAxeDIyd255d2QwNmN4OTEifQ.nh5gIz7Wp-z4Cx7Kizf1qw",
	});


  return (
		<div>
			<h1></h1>
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					height: "90vh",
					width: "90vw",
          margin: "auto"
				}}
			>
				<Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
					<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
				</Layer>
			</Map>
		</div>
	);
};

export default Home;
