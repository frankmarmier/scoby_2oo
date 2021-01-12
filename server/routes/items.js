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

        // console.log(req.body)
        let image = '';

        if (!req.file) {
                image = 'data:image/jpeg;base64,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'
        } else {
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
router.patch("/:idItem", (req, res, next) => {
        if (!req.session.currentUser) {
                res.status(200).json({ message: 'Sign in before creating one item' });
                return;
        };

        Item.findByIdAndUpdate(req.params.idItem, req.body, { new: true })
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