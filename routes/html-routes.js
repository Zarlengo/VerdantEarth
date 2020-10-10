// Imports all of the database objects
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Route for the main welcome page
  app.get("/", (req, res) => {
    res.render("index", { hello: "world" });
  });

  // Route for the products page, sends in the product related articles
  app.get("/product", (req, res) => {
    db.articles
      .findAll({
        where: {
          typeId: 1
        },
        limit: 8
      })
      .then(dbArticle => res.render("product", { articles: dbArticle }));
  });

  // Route for the solar power page, sends in the solar related articles
  app.get("/solar", (req, res) => {
    db.articles
      .findAll({
        where: {
          typeId: 2
        },
        limit: 8
      })
      .then(dbArticle => res.render("solar", { articles: dbArticle }));
  });

  // Route for the wind power page, sends in the wind related articles
  app.get("/wind", (req, res) => {
    db.articles
      .findAll({
        where: {
          typeId: 3
        },
        limit: 8
      })
      .then(dbArticle => res.render("wind", { articles: dbArticle }));
  });

  // Route to log in the user, checks if already logged in and redirects to profile if they are
  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("login", { hello: "world" });
    }
  });

  // Route to create a new user, checks if already logged in and redirects to profile if they are logged in
  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("signup", { hello: "world" });
    }
  });

  // Route to the user's profile page, verifies that the user is already logged in or redirects to the login page if they are not
  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", req.user);
  });

  // For all other pages not in these routes, redirects to home page
  app.get("*", (req, res) => {
    let userId;
    if (typeof req.user !== "undefined") {
      userId = req.user.id;
    } else {
      userId = null;
    }
    // Logs the requesting page and information
    console.log(
      "invalid page request",
      req.params,
      req.body,
      `User Id: ${userId}`
    );
    res.redirect("/");
  });
};
