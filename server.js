// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Allows env variables in development on local machines. Uses .ENV in the root directory
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true })
);

// Initializes passport
app.use(passport.initialize());
app.use(passport.session());

// Initializes handlebars
app.engine("handlebars", handlebars({ defaultlayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
