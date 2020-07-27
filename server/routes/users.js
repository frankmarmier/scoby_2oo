const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");

// router.get("/", function (req, res, next) {
// 	res.send("respond with a resource");
// });

router.get("/", (req, res, next) => {
	userModel
		.find()
		.then((users) => {
			res.status(200).json(users);
			console.log("DB : USERS ==> ", users);
		})
		.catch(next);
});

router.patch("/:currentUser_id", (req, res, next) => {
	userModel
		.findByIdAndUpdate(req.params.currentUser_id, req.body, { new: true })
		.then((updatedUser) => {
			res.status(200).json(updatedUser);
			console.log("DB : UPDATED USER ==> ", updatedUser);
		})
		.catch(next);
});

module.exports = router;
