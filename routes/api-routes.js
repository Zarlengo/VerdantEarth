// Loading the sequelize database settings
const db = require("../models");
const Op = db.Sequelize.Op;

// Loading the module to handle the user login settings
const passport = require("../config/passport");

// Loading the NREL class and object for use in solar calculations
const NREL = require("../config/nrel.js");
const nrel = new NREL();

// Loading the Google class for use in determining location cities & states
const Google = require("../config/google.js");
const google = new Google();

module.exports = function(app) {
  /***** API Routes to handle operations relating to the user preferences *****/
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      emailOptIn: req.body.emailOptIn
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route to update the user preferences
  app.put("/api/user/:id", (req, res) => {
    // Need to find if there's a duplicate email in db
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting user
  app.delete("/api/user/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      req.logout();
      res.redirect("/");
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        email: req.user.email,
        emailOptIn: req.user.emailOptIn
      });
    }
  });

  // Route for getting solar data about our user to be used client side
  app.get("/api/user_solar_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        solarIndex: req.user.solarIndex,
        powerUsage: req.user.powerUsage,
        utilityRate: req.user.utilityRate
      });
    }
  });

  // Route to get all articles from the database
  app.get("/api/articles", (req, res) => {
    db.articles.findAll({}).then(dbArticle => {
      res.json(dbArticle);
    });
  });

  // Route to get articles of a category from the database
  app.get("/api/articles/:typeId", (req, res) => {
    db.articles
      .findAll({
        where: {
          typeId: req.params.typeId
        },
        limit: 8
      })
      .then(dbArticle => {
        res.json(dbArticle);
      });
  });

  // Route to get all products with a specific tag
  app.get("/api/products/:tag", (req, res) => {
    db.products
      .findAll({
        where: {
          tags: { [Op.like]: `%${req.params.tag}%` }
        }
      })
      .then(results => {
        res.json(results);
      });
  });

  // Route to get the Solar Irradiance for a location
  app.get("/api/solar/:parameters", (req, res) => {
    nrel
      .getAPI("solarResource", req.params.parameters)
      .then(response => res.json(response.outputs.avg_dni.annual));
  });

  // Route to get the city name for a given latitude and longitude
  app.get("/api/google/:parameters", (req, res) => {
    const location = JSON.parse(req.params.parameters);
    google
      .getCity(`${location.lat},${location.lon}`)
      .then(response => res.json(response.results[0].address_components));
  });
};
