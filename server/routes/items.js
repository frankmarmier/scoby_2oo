const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const uploader = require('../config/cloudinary-setup')

//get all the items
router.get("/", function (req, res, next) {
        Item.find()
                .then(list => res.status(200).json(list))
                .catch(err => res.status(500).json({ message: "Failure to get list of items" }))

});

//filter items by user Id
router.get("/user", (req, res, next) => {
        Item.find({ id_user: req.session.currentUser })
                .then(list => res.status(200).json(list))
                .catch(err => res.status(500).json({ message: "Failure to get user's items" }))
})

//get one items 
router.get("/:idItem", (req, res, next) => {
        Item.findById(req.params.idItem)
                .then(item => res.status(200).json(item))
                .catch(err => res.status(500).json({ message: "Failure to get this item" }))
});



//create one item
router.post("/", uploader.single("image"), (req, res, next) => {
        // console.log(req.session.currentUser)
        if (!req.session.currentUser) {
                res.status(200).json({ message: 'Sign in before creating one item' });
                return;
        };

        console.log(req.body)
        let image = '';

        if (req.file) {
                image = req.file.path
        }
        // console.log(req.file,"imae")
        const newItem = { ...req.body, image: image, id_user: req.session.currentUser }
        // console.log(newItem.location)
        Item.create(newItem)
                .then(item => res.status(200).json(item))
                .catch(err => res.status(500).json({ message: err }))
});

//update one item
router.patch("/:idItem", uploader.single("image"), (req, res, next) => {
        if (!req.session.currentUser) {
                res.status(200).json({ message: 'Sign in before creating one item' });
                return;
        };

        // console.log(req.body)
        let image = '';

        if (req.file) {
                image = req.file.path
        }
        // console.log(req.file,"imae")
        const newItem = { ...req.body, image: image, id_user: req.session.currentUser }
        // console.log(newItem.location)
        console.log("he-------------------------", req.file, req.body)
        Item.findByIdAndUpdate(req.params.idItem, newItem, { new: true })
                .then(item => res.status(200).json(item))
                .catch(err => res.status(500).json({ message: "Failure to update one item" }))
});

//delete one item
router.delete("/:idItem", (req, res, next) => {
        console.log("object")
        if (!req.session.currentUser) {
                res.status(200).json({ message: 'Sign in before creating one item' });
                return;
        };

        Item.findByIdAndRemove(req.params.idItem)
                .then(response => res.status(200).json(response))
                .catch(err => res.status(500).json({ message: "Failure to delete one item" }))
});

module.exports = router;