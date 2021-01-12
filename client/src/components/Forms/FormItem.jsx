import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";
// import { AuthContext } from "../Auth/AuthProvider";

class ItemForm extends Component {
  state = {
    item: {
      name: '',
      category: ["Plant"],
      description: '',
      address: '',
      location: {
        coordinates: [0,0]
      },
      quantity: 1,
      
    },
    contact: {
      byEmail: false,
      byPhone: false
    }

  };

  imageRef = React.createRef();

  // static contextType = AuthContext;

  handleChange = (event) => {

    const { name, value } = event.target;
    // console.log({name}, {value})
    this.setState({ item: { ...this.state.item, [name]: value } })

  }

  handleRadio = (event) => {
   const { name, checked } = event.target;
   this.setState({ contact: { ...this.state.contact, [name]: checked } })
  }

  handleSelect = (event)=>{
    this.setState({ item: { category: [event.target.value]} })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state, this.imageRef.current.files[0])

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
    const fd = new FormData();


    // console.log(this.state.item.location.coordinates)
    for (let key in this.state.item) {
      if (key === 'location') {
        fd.append(`location.coordinates`, this.state.item.location.coordinates[0])
        fd.append(`location.coordinates`, this.state.item.location.coordinates[1])
      } else {
        fd.append(key, this.state.item[key])
      }

    }

    fd.append('image', this.imageRef.current.files[0]);


    apiHandler.createItem(fd)
      .then(response => {console.log(response)})
      .catch(err => console.log(err))

    apiHandler.createContact(this.state.contact)
    .then(response => console.log("contact",response))
    .catch(err => console.log(err))
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log({ place });
    this.setState({
      item: {
        address: place.place_name,
        location: {
          type: "Point",
          coordinates: place.geometry.coordinates
        }
      }
    })

  };

  render() {
    //  console.log(this.state.item.category)
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit} >
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className='input'
              name="name"
              type="text"
              value={this.state.item.name}
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              defaultValue="-1"
              name='category'
              value={this.state.item.category}
              onChange={this.handleSelect}
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant" defaultValue>Plant</option>
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
              name='quantity'
              onChange={this.handleChange}
              value={this.state.item.quantity} />
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
              name='description'
              value={this.state.item.description}
              onChange={this.handleChange}
              placeholder="Tell us something about this item"
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
              name='image'
              ref={this.imageRef}
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input
                type="checkbox"
                name="byEmail"
                onChange={this.handleRadio}
              />
              user email
            </div>
            <input
              type="checkbox"
              name="byPhone"
              onChange={this.handleRadio}
            />
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

export default ItemForm;
