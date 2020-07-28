import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";
import { withUser } from "./../Auth/withUser";

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    quantity: "",
    address: "",
    location: "",
    id_user: "",
    image: "",
  };

  // componentDidMount() {
  //   console.log(this.props);
  //   apiHandler
  //     .getUsers()
  //     .then((dbRes) => {
  //       this.setState({ id_user: dbRes.data });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  handleChange = (event) => {
    let key = event.target.name;
    let value;
    if (event.target.type === "radio") {
      value = event.target.value === "yes" ? true : false;
    } else {
      value = event.target.value;
    }
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "this is this.props.authContext.user",
      this.props.authContext.user
    );

    apiHandler
      .createOneItem({
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        quantity: this.state.quantity,
        address: this.state.address,
        location: this.state.location,
        id_user: this.props.authContext.user,
        image: this.state.image,
      })
      .then((apiRes) => {
        console.log(
          "handlesubmit updated the state to the following",
          this.state
        );

        // this.props.history.push("/");
      })
      .catch((error) => console.log(error));
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
          <h2 className="title">Create Item</h2>

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
              name="name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              defaultValue="-1"
              onChange={this.handleChange}
              name="category"
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
              type="number"
              onChange={this.handleChange}
              name="quantity"
            />
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
              name="description"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              id="image"
              type="file"
              onChange={this.handleChange}
              name="image"
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" onChange={this.handleChange} name="contact" />
              user email
            </div>
            <input type="radio" onChange={this.handleChange} name="contact" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemForm);
