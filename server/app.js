require("dotenv").config(); // https://www.npmjs.com/package/dotenv
require("./config/dbConnection");

const express = require("express"); // https://www.npmjs.com/package/express
const path = require("path");
const logger = require("morgan"); // https://www.npmjs.com/package/morgan
const session = require("express-session"); // https://www.npmjs.com/package/express-session
const MongoStore = require("connect-mongo"); // https://www.npmjs.com/package/connect-mongo
const app = express();

/*
 * Middlewares
 */

app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false })); // Access data sent as urlEncoded (standard form or postman) @req.body
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours cookie
    },
    resave: true,
    saveUninitialized: true,
  })
);

/*
 * Routes
 */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

/**
 * Error Handling middlewares
 * https://expressjs.com/en/guide/error-handling.html#:~:text=Express%20comes%20with%20a%20built,of%20the%20middleware%20function%20stack.
 */

app.use((req, res, next) => {
  console.log("ROUTE NOT FOUND");
  res.status(400).json({ message: "The route you requested does not exist !" });
});

app.use((err, req, res, next) => {
  console.stack(err);
  res.status(500).json(error);
});

module.exports = app;
