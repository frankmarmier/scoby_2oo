import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import apiHandler from "../api/apiHandler";
import ItemCard from "../components/ItemCard";

class Profile extends Component {
  state = {
    phoneNumber: "",
    list: []
  }

  getData = () => {
    apiHandler.getPhoneNumber()
      .then(phone => {
        if (phone[0].phoneNumber !== 0) {
          this.setState({ phoneNumber: phone[0].phoneNumber })
        }

      })
      .catch(err => console.log(err))
    console.log("---list of items of this user")
    apiHandler.getUserItems()
      .then(list => this.setState({ list:list }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  handlePhone = (event) => {
    this.setState({ phoneNumber: event.target.value })
  }

  addPhoneNumber = (event) => {
    event.preventDefault();
    // console.log(this.state.phoneNumber)
    apiHandler.updatePhoneNumber({ phoneNumber: this.state.phoneNumber })
      .then(phone => console.log(phone))
      .catch(err => console.log(err))
  }

  handleDelete = (event, id) => {
    console.log(id)
    apiHandler.deleteItem(id)
      .then((res) => this.getData())
      .catch(err => console.log(err))
  }

  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    console.log("list", this.state.list)
    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.addPhoneNumber}>
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhone}
                  contentEditable
                />
              </div>
              <button className="form__button">Add phone number</button>
            </form>
          </div>

          {/* Break whatever is belo  */}
          {this.state.list.length === 0 &&
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items :(</p>
              </div>
            </div>
          }
          <div className="CardItem">
            {this.state.list.length === 0 ? "" : <h3>Your items</h3>}

            {this.state.list.map((item, id) => {
              return (
                <ItemCard
                  key={id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  quantity={item.quantity}
                  _id={item._id}
                  handleDelete={this.handleDelete}
                />

              )
            })}

          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
