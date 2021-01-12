import LocationAutoComplete from "../components/LocationAutoComplete";
import React, { Component } from 'react';
import MapShow from "../components/MapShow";


export default class Home extends Component {
  state = {
    search: ''
  }

  render() {
    return (
      <div>
        <h1>MAPBOX MAP HERE</h1>

        <MapShow />
        <p>On home /</p>
      </div>
    )
  }
}
