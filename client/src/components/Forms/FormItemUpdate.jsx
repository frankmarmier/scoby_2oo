import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";

class FormItemUpdate extends Component {
  state = {
    name: "",
    description:"",
    category:"",
    quantity:"",
    address:"",
    location:"",
    id_user:"",
    image: "",
  };

  handleChange = (event) => {
    let key = event.target.name;
    console.log("this is the key", key);
    let value;
    if (event.target.type === 'radio') {
      value = event.target.value === 'yes' ? true : false;
    } else {
      value = event.target.value;
    }
    console.log("handlechange was called with the following key value pair", key, value);
    this.setState({ [key]: value });
  }

  handleSubmit = (event) => {
    console.log("handlesubmit was called on the following event", event);

    event.preventDefault();
    const itemId = this.props.match.params.id;
    console.log("this is the itemId", itemId)

    apiHandler
      .updateOneItem(itemId, {
        name: this.state.name,
        description:this.state.description,
        category:this.state.category,
        quantity:this.state.quantity,
        address:this.state.address,
        location:this.state.location,
        id_user:this.state.id_user,
        image: this.state.image,
      })
      .then((apiRes) => {
        console.log("handlesubmit updated the state to the following", this.state);

        // this.props.history.push("/profile");
      })
      .catch((error) => console.log(error));

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log(place);
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Update Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="What are you giving away ?"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" defaultValue="-1" onChange={this.handleChange}>
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
            <input className="input" id="quantity" type="number" onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" id="image" type="file" onChange={this.handleChange} />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" onChange={this.handleChange} />
              user email
            </div>
            <input type="radio" onChange={this.handleChange} />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Update Item</button>
        </form>
      </div>
    );
  }
}

export default FormItemUpdate;
