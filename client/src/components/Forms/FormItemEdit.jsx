import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

require("dotenv").config();
// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";

class ItemFormEdit extends Component {
  state = {};

  componentDidMount() {
    apiHandler
      .getItems()
      .then(() => {})
      .catch((err) => {});
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    console.log(key, value);
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Wax On Wax Off");

    apiHandler
      .addItem(this.state)
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePlace = (place) => {
    console.log(place);
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Edit this Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              type="text"
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue="-1"
              onChange={this.handleChange}
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              id="quantity"
              name="quantity"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete
              onSelect={this.handlePlace}
              onChange={this.handleChange}
              value={this.state.address}
              name="address"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
              value={this.state.description}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              id="image"
              name="image"
              type="file"
              onChange={this.handleChange}
              value={this.state.image}
            />
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ItemFormEdit);
