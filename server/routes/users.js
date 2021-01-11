const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.get("/me", function (req, res, next) {
  User.findById(req.session.currentUser)
    .select("-password")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

router.patch("/me", function (req, res, next) {
  User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});



module.exports = router;
