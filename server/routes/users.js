const express = require("express");
const Contact = require("../models/Contact");
const User = require("../models/User");
const router = express.Router();


//GET information of the current user
router.get("/me", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(200).json({ message: "Sign in before going to user's profile" });
    return;
  };

  User.findById(req.session.currentUser)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: "Failure to get information of this user" }))
});

//GET phone Number
router.get("/phone", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(200).json({ message: "Sign in before going to user's profile" });
    return;
  };

  Contact.find({ user_id: req.session.currentUser }, { phoneNumber: 1, _id: 0 })
    .then(phone => res.status(200).json(phone))
    .catch(err => res.status(500).json({ message: "Failure to get information of this user" }))
})

//Update phone number or create a contact
router.post("/phone", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(200).json({ message: "Sign in before going to user's profile" });
    return;
  };

  User.findById(req.session.currentUser)
    .then(contactField => {
  
      if (!contactField.contact) {
  
        Contact.create({ phoneNumber: req.body, user_id: req.session.currentUser })
          .then(contact => {
            User.findByIdAndUpdate(req.session.currentUser, { contact: contact._id }, { new: true })
              .then(updateUser => res.status(200).json(updateUser))
              .catch(err => res.status(500).json(err))
          })
          .catch(err => res.status(500).json(err))
      } else {
      
        Contact.findOneAndUpdate({ user_id: req.session.currentUser }, req.body, { new: true })
          .then(contact => {
            res.status(200).json(contact)})
          .catch(err => res.status(500).json(err))
      }
    })

})


//Update
router.patch("/me", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(200).json({ message: 'Sign in before creating one item' });
    return;
  };

  User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ message: "Failure to update user's data" }))
});

//Create contact
router.post("/contact", (req, res, next) => {

  Contact.find({ user_id: req.session.currentUser })
    .then(contact => {
      // console.log({ contact })
      if (contact.length === 0) {
        const { byEmail, byPhone } = req.body;
        Contact.create({ byEmail, byPhone, user_id: req.session.currentUser })
          .then(contact => {
            // res.status(200).json(contact);
            console.log("here")
            User.findByIdAndUpdate(req.session.currentUser, { contact: contact._id }, { new: true })
              .then(updateUser => res.status(200).json(updateUser))
              .catch(err => res.status(500).json(err))
          })
          .catch(err => res.status(500).json(err))
      } else {
        Contact.findOneAndUpdate({ user_id: req.session.currentUser }, req.body, { new: true })
          .then(contact => res.status(200).json(contact))
          .catch(err => res.status(500).json(err))
      }
    })
    .catch(err => res.status(500).json(err))
})



module.exports = router;
