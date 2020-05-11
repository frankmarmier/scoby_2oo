const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(`Connection to ${x.connection.name} established.`);
  })
  .catch((error) => {
    console.log(`An error occured try to connect to the DB ${error}`);
  });