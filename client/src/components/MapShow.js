import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Image } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationAutoComplete from './LocationAutoComplete';


const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default class MapShow extends Component {
        state = {
                lat: '',
                lgt: ''
        }

        // handleOnSelect = (value) => {
        //         console.log(value.center)
        //         this.setState({
        //                 lat: value.center[0],
        //                 lgt: value.center[1]
        //         })
        // }

        render() {

                return (
                        <div>
                                {/* <LocationAutoComplete onSelect={this.handleOnSelect} /> */}
                                <br></br>
                                <br></br>
                                <Map
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                                height: '50vh',
                                                width: '50vw'
                                        }}
                                >
                                        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                                <Feature coordinates={[
                                                        this.state.lat,
                                                        this.state.lgt
                                                ]} >
                                                        <Image id={'image-uid'} src="data:image/png;base64,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"/>
                                                </Feature>
                                        </Layer>
                                </Map>;
                        </div>
                )
        }
}
