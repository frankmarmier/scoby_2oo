import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZWxpc2FjaGVuIiwiYSI6ImNranNudjgwcTJrYnUzMG1qNWk4c3ZuanoifQ.-_WJInlM_QQf87XCPC7IWQ",
});

const Home = (props) => {
  // Implement react map box here.
  return (
    <div>
      <h1>MAPBOX MAP HERE</h1>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "90vh",
          width: "90vw",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      <p>On home /</p>
    </div>
  );
};

export default Home;
