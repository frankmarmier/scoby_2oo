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

		const item = [
			{
				name: "Ficus Elastica",
				description: "Ceci est un figuier",
				image:
					"https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b404e1b81_ficuselastica4.jpg",
				category: "Plant",
				quantity: 5,
				address: "10 Rue de Lappe, Paris, France",
				location: {
					type: "Point",
					coordinates: [2.3729, 48.8535],
				},
				id_user: userSeed._id,
			},
			{
				name: "Weed",
				description: "de l'herbe",
				image:
					"https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b404e1b81_ficuselastica4.jpg",
				category: "Plant",
				quantity: 5,
				address: "Invalides, Paris, France",
				location: {
					type: "Point",
					coordinates: [2.3129, 48.8584],
				},
				id_user: userSeed._id,
			},
			{
				name: "Roses",
				description: "Belles fleurs",
				image:
					"https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b404e1b81_ficuselastica4.jpg",
				category: "Plant",
				quantity: 5,
				address: "1 Rue Voltaire, Paris, France",
				location: {
					type: "Point",
					coordinates: [2.3913, 48.8524],
				},
				id_user: userSeed._id,
			},
			{
				name: "Cerisier",
				description: "donne des fruits",
				image:
					"https://emova-monceaufleurs-fr-storage.omn.proximis.com/Imagestorage/images/740/740/5ec2b404e1b81_ficuselastica4.jpg",
				category: "Plant",
				quantity: 5,
				address: "130 Rue de Charonne, Paris, France",
				location: {
					type: "Point",
					coordinates: [2.3875, 48.8551],
				},
				id_user: userSeed._id,
			},
		];
		const itemSeed = await Item.insertMany(item);

		console.log("the seed was created", contactSeed, userSeed, itemSeed);
	} catch (err) {
		console.error(err);
	}
}

seedIt();
