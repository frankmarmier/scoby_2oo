import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import apiHandler from "../api/apiHandler";
import ItemCard from "../components/ItemCard"

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});



class Home extends Component {
  state = {
    items: [],
    selectedItem: ""
  };


  showItemCard (item) {
    this.setState ({
      selectedItem: item
    })
  }


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
              <Marker onClick={() => this.showItemCard(item)} coordinates={[item.location.coordinates[0],  item.location.coordinates[1]]} type="symbol" id="marker" layout={{ "icon-image": "marker" }}>
            <img src="https://img.icons8.com/color/48/000000/marker.png" alt="marker"/>
          </Marker>
            </div>
            )
          })}

         
   
        </Map>
        <ItemCard selectedItem={this.state.selectedItem}/>
        <p>On home /</p>
      </div>
    );
  }
}

export default Home;
