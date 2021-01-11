const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

//GET ALL ITEMS  IN DB
router.get("/", (req, res, next) => {
  Item.find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      next(error);
    });
});

// GET ONE ITEM IN DB
router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const newItem = { ...req.body, id_user: req.session.currentUser };
  //   req.body.id_user = req.session.currentUser; // add user id to the item object
  console.log(req.session.currentUser);
  Item.create(newItem)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    //   Item.findOne({
    //     $and: [{ id_user: req.session.currentUser }, { _id: req.params.id }],
    //   })
    .then((item) => {
      res.status(204).json({
        message: "Successfuly deleted",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
