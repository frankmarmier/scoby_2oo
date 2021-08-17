require("dotenv").config(); // https://www.npmjs.com/package/dotenv
require("./config/dbConnection");

const express = require("express"); // https://www.npmjs.com/package/express
const path = require("path");
const logger = require("morgan"); // https://www.npmjs.com/package/morgan
const session = require("express-session"); // https://www.npmjs.com/package/express-session
const MongoStore = require("connect-mongo"); // https://www.npmjs.com/package/connect-mongo
const cors = require("cors");
const app = express();

/*
 * Middlewares
 */

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false })); // Access data sent as urlEncoded (standard form or postman) @req.body
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hour cookie
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
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

module.exports = app;
