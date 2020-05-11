var express = require("express");
var router = express.Router();
const Item = require('../models/Item');
const upload = require("../config/cloudinaryConfig");


/* ADD ITEM */
router.post("/add-item", upload.single("picture"), (req, res, next) => {
  const id_user = req.session.currentUser._id;

  if (req.file) {
    const picture = req.file.secure_url;
    req.body = {
      ...req.body,
      picture
    }
  }
  Item.create(...req.body,
      id_user, )
    .then((dbResult) => {
      res.status(201).json(dbResult);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;