import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneItem(idItem) {
    return service
      .get(`/api/items/${idItem}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserItems() {
    return service
      .get("/api/items/user")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteItem(idItem) {
    return service
      .delete(`/api/items/${idItem}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  createItem(item) {
    return service
      .post("/api/items", item)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateItem(idItem, data) {
    return service
      .patch(`/api/items/${idItem}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createContact(contact) {
    return service
      .post("/api/users/contact", contact)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getPhoneNumber() {
    return service
      .get("/api/users/phone")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updatePhoneNumber(phone) {
    return service
      .post("/api/users/phone", phone)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateProfile(data) {
    return service
    .patch("/api/users/me", data)
    .then((res) => res.data)
    .catch(errorHandler);
}
};
