const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
  throw Error(`
    No environment variable set for MONGODB_URI
    Please set one in order to be able to connect
    to your database
  `);
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connection to ${self.connection.name} established.`);
  })
  .catch((error) => {
    console.log(`An error occured try to connect to the DB ${error}`);
  });
