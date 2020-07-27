var express = require("express");
var router = new express.Router();
const itemModel = require("./../models/Items");
const userModel = require("./../models/Users");

// Get all the items in the DB

router.get((req, res, next) => {
  itemModel
    .find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

// Get one item in the DB

router.get((req, res, next) => {
  itemModel
    .findById(req.params.id)
    .then((item) => res.status(200).json(item))
    .catch(next);
});

// Post one item in the DB

router.post((req, res, next) => {
  itemModel
  .create(req.body)
  .then((newItem) => {
    res.status(201).json(newItem)
    .catch(next);
  });
});

// Update item in the DB

router.patch((req, res, next) => {
  itemModel
    .findByIdAndUpdate(req.params.id)
    .then((updatedItem) => {
      res.status(200).json(updatedItem);
    })
    .catch(next);
});

module.exports = router;
