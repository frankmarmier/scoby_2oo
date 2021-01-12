import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import apiHandler from "../api/apiHandler";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

function getAllItems() {}

class Home extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    apiHandler.getItems().then((respFromApi) => {
      console.log(respFromApi);
      this.setState({
        items: respFromApi,
      });
    });
  }
  // Implement react map box here.
  render() {
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
          {this.state.items.map((item) => {
            return (
              <div key={item._id}>
              <Marker onClick={getAllItems()} coordinates={[item.location.coordinates[0],  item.location.coordinates[1]]} type="symbol" id="marker" layout={{ "icon-image": "marker" }}>
            <img src="https://img.icons8.com/color/48/000000/marker.png" alt="marker"/>
          </Marker>
            </div>
            )
          })}
   
        </Map>
        <p>On home /</p>
      </div>
    );
  }
}

export default Home;
