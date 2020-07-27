var express = require("express");
var router = express.Router();
const itemModel = require("./../models/Items");

// Get all the items in the DB

router.get("/", (req, res, next) => {
  itemModel
    .find()
    .populate("User")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

// Get one item in the DB

router.get("/:id", (req, res, next) => {
  itemModel
    .findById(req.params.id)
    .populate("User")
    .then((item) => res.status(200).json(item))
    .catch(next);
});

// Post one item in the DB

router.post("/", (req, res, next) => {
  itemModel
    .create(req.body)
    .then((newItem) => res.status(201).json(newItem))
    .catch(next);
});

// Update item in the DB

router.patch("/:id", (req, res, next) => {
    
  itemModel
    .findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate("User")
    .then((updatedItem) => {
      res.status(200).json(updatedItem);
    })
    .catch(next);
});

// Delete item in the DB

router.delete("/:id", (req, res, next) => {
  itemModel
    .findByIdAndRemove(req.params.id)
    .then((deletedItem) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
