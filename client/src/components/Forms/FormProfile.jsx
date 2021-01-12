import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler';
import { AuthContext } from '../Auth/AuthProvider'
class FormProfile extends Component {
        state = {
                profileImg: '',
                lastName: '',
                firstName: '',
                email: '',
                password: '',

        }

        static contextType = AuthContext;
        imageRef = React.createRef();

        handleChange = (event) => {
                const { name, value } = event.target;
                console.log(name, value)
                this.setState({ [name]: value })
        }

        handleSubmit = (event) => {
                event.preventDefault();
                // const { profileImg, lastName, firstName, email, password } = this.state
                const fd = new FormData();

                for (let key in this.state) {
                        if (this.state[key]) {
                                fd.append(key, this.state[key])
                        }
                }

                if (!this.imageRef.current.files[0]) {
                        fd.append('profileImg', this.imageRef.current.files[0]);
                }
                // for (var value of fd.values()) {
                //         console.log("data", value);
                // }
                // console.log("response", response)
                apiHandler.updateProfile(fd)
                        .then(response => {
                                console.log(response)
                        })
                        .catch(err => console.log(err))

        }

        componentDidMount() {
                const { profileImg, lastName, firstName, email } = this.context.user;
                // console.log(this.context.user)
                this.setState({ profileImg, lastName, firstName, email })
        }

        render() {

                return (
                        <div>
                                <h1>Edit Profile</h1>
                                <div className="ItemForm-container">
                                        <form className="form" onSubmit={this.handleSubmit} >

                                                <div>
                                                        <img src={this.state.profileImg} style={{ width: 100, height: 100, border: "1px solid black" }}></img>

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

                                                </div>


                                                <div className="form-group" >

                                                        <label className="label" htmlFor="firstName">
                                                                First Name
                                                        </label>
                                                        <input
                                                                style={{ border: "1px solid black" }}
                                                                id="firstName"
                                                                className='input'
                                                                name="firstName"
                                                                type="text"
                                                                value={this.state.firstName}
                                                                onChange={this.handleChange}
                                                        />

                                                </div>

                                                <div className="form-group" >

                                                        <label className="label" htmlFor="lastName">
                                                                Last Name
                                                        </label>
                                                        <input
                                                                style={{ border: "1px solid black" }}
                                                                id="lastName"
                                                                className='input'
                                                                name="lastName"
                                                                type="text"
                                                                value={this.state.lastName}
                                                                onChange={this.handleChange}
                                                        />

                                                </div>

                                                <div className="form-group" >

                                                        <label className="label" htmlFor="email">
                                                                Email
                                                        </label>
                                                        <input
                                                                style={{ border: "1px solid black" }}
                                                                id="email"
                                                                className='input'
                                                                name="email"
                                                                type="text"
                                                                value={this.state.email}
                                                                onChange={this.handleChange}
                                                        />

                                                </div>


                                                <div className="form-group" >

                                                        <label className="label" htmlFor="password">
                                                                password
                                                        </label>
                                                        <input
                                                                disabled
                                                                style={{ border: "1px solid black" }}
                                                                id="password"
                                                                className='input'
                                                                name="password"
                                                                type="text"
                                                                value={this.state.password}
                                                                onChange={this.handleChange}
                                                                placeholder="*************"
                                                        />

                                                </div>

                                                <button className="btn-submit">SAVE</button>
                                        </form>
                                </div>


                        </div >
                )
        }
}


export default FormProfile;