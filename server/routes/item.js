const express = require("express");
const router = express.Router();
const Item = require("../models/Item");


router.get("/", (req, res, next) => {
    res.send("All items in DB");
});


router.get("/:id", (req, res, next) => {
    res.send("One item in DB");
});

router.post("/", (req, res, next) => {
    res.send("create one item in DB");
});

router.patch("/:id", (req, res, next) => {
    res.send("update one item in DB");
});

router.delete("/:id", (req, res, next) => {
    res.send("delete one item in DB");
});


module.exports = router;