const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	phoneNumber: {
		Type: String,
		minlength: 12,
		maxlength: 12,
	},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
