import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker} from "react-mapbox-gl";
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
        <Marker  coordinates={[-0.13,  51.501476]} type="symbol" id="marker" layout={{ "icon-image": "marker" }}>
          <img src="https://img.icons8.com/color/48/000000/marker.png" alt="marker"/>
        </Marker>
      </Map>
      <p>On home /</p>
    </div>
  );
};

export default Home;
