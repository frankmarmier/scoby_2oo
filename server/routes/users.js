const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.get("/me", function (req, res, next) {
  res.send("get info of current user");
});

router.patch("/me", function (req, res, next) {
  res.send("update current user");
});



module.exports = router;
