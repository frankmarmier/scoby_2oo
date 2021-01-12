import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import apiHandler from "../api/apiHandler";

class Profile extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const { authContext } = this.props;
    const { user } = authContext;

    apiHandler
      .getItems()
      .then((apiResp) => {
        console.log(apiResp);
        const userItems = apiResp.filter((item) => item.id_user === user._id);

        this.setState({
          items: userItems,
        });

        console.log(this.state.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteItem = (itemId) => {
    apiHandler.deleteItem(itemId).then(() => {
      this.setState({
        items: this.state.items.filter((it) => it._id !== itemId),
      });
    });
  };

  render() {
    const { authContext } = this.props;
    const { user } = authContext;

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

            <form className="form">
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
                />
              </div>
              <button className="form__button">Add phone number</button>
            </form>
          </div>

          {/* Break whatever is belo  */}
          {this.state.items.length === 0 && (
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items :(</p>
              </div>
            </div>
          )}

          {this.state.items.length > 0 && (
            <div className="CardItem">
              <h3>Your items</h3>

              {this.state.items.map((item) => {
                return (
                  <div className="item" key={item._id}>
                    <div className="round-image">
                      <img src={item.image} alt="item" />
                    </div>
                    <div className="description">
                      <h2>{item.name}</h2>
                      <h4>Quantity: {item.quantity} </h4>
                      <p>Description: {item.description}</p>
                      <div className="buttons">
                        <span>
                          <button
                            onClick={() => {
                              this.deleteItem(item._id);
                            }}
                            className="btn-secondary"
                          >
                            Delete
                          </button>
                        </span>
                        <span>
                          <button className="btn-primary">Edit</button>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* </div> */}
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
