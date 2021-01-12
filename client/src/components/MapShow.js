import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export default class MapShow extends Component {
    state = {
        list: [[0, 0]],
    };
    componentDidMount() {
        console.log("-----------------");
        apiHandler
            .getItems()
            .then((data) => {
                const clean = [...data].filter((item) => {
                    if (item.location.coordinates.length !== 0 || !item.location) return item;
                });
                const clean2 = [...clean].map((each) => each.location.coordinates);
                console.log("clean", clean2);
                this.setState({ list: clean2 });
            })
            .catch((err) => console.log(err));
    }

    onClickMarker = () => {
            
    };
    render() {
        console.log(this.state.list);
        {
            this.state.list.map((e) => {
                if (e) {
                    console.log(e[0], e[1]);
                }
            });
        }
        return (
            <div>
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{ height: "80vh", width: "100vw" }}
                    //     center={[48.852638, 2.38834]}
                >
                    {this.state.list.map((item) => {
                        return (
                            <Marker
                                coordinates={[
                                    //     0,
                                    //     0,

                                    item[0],
                                    item[1],
                                ]}
                                // onHover={this._onHover}
                                // onEndHover={this._onEndHover}
                                onClick={this.onClickMarker}
                            >
                                <img
                                    src="https://img.icons8.com/color/48/000000/marker.png"
                                    alt="marker"
                                />
                            </Marker>
                        );
                    })}
                </Map>

                {/* {this.state.list[0].map((item) => {
                        return (
                                <p>{item}</p>
                        )
                })} */}
            </div>
        );
    }
}
