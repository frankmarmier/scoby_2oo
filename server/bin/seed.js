require("dotenv").config();
require("../config/dbConnection");
const mongoose = require("mongoose");

const Item = require("../models/Items");
const User = require("../models/User");
const Contact = require("../models/Contact");

async function seedIt() {
  try {
    mongoose.connection.dropDatabase();

    const contact = [
      {
        phoneNumber: "0678905436",
      },
    ];

    const contactSeed = await Contact.create(contact);

    const user = {
      firstName: "Audrey",
      lastName: "Fake",
      profileImg: "",
      email: "audreyfake@gmail.com",
      password: "1234",
      city: "Paris",
      contact: "5f1ee01d1d57813dd5547628",
    };

    const userSeed = await User.create(user);

    const item = {
      name: "Ficus Elastica",
      description: "Ceci est un figuier",
      image:
        "https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b404e1b81_ficuselastica4.jpg",
      category: "Plant",
      quantity: 5,
      address: "Copenhagen",
      location: {
        type: "Point",
        coordinates: [12.550343, 55.665957],
      },
      id_user: userSeed._id,
    };

    const itemSeed = await Item.create(item);

    console.log("the seed was created", contactSeed, userSeed, itemSeed);
  } catch (err) {
    console.error(err);
  }
}

seedIt();
