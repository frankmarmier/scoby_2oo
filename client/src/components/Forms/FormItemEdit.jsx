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
    console.log(this.props.match.params.id);
    apiHandler
      .getItems()
      .then((apiResp) => {
        const itemToEdit = apiResp.filter(
          (item) => item._id === this.props.match.params.id
        );
        this.setState({
          name: itemToEdit[0].name,
          category: itemToEdit[0].category,
          quantity: itemToEdit[0].quantity,
          address: itemToEdit[0].address,
          description: itemToEdit[0].description,
          id: itemToEdit[0]._id,
        });
      })
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
      .editItem(this.state.id, this.state)
      .then((data) => {
        this.props.history.push("/profile");
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

          <button className="btn-submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ItemFormEdit);
