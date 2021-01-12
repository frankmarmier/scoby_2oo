import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

export class FormUserEdit extends Component {
  state = {};

  componentDidMount() {
    const { authContext } = this.props;
    const { user } = authContext;
    console.log(user);

    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  }

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;

    apiHandler
      .update(this.state)
      .then((data) => {
        authContext.setUser(data);
        this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Hello
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Edit your account info </h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              value={this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              value={this.state.lastName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              value={this.state.password}
            />
          </div>

          <button className="btn-submit">Update now</button>
        </form>
      </section>
    );
  }
}

export default withUser(FormUserEdit);
