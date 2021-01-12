const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
        byEmail: Boolean,
        byPhone: Boolean,
        phoneNumber: {type:String, default:''},
        user_id: {
                type: Schema.Types.ObjectId,
                ref: "User",
        }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
