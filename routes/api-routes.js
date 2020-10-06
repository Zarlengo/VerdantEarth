const db = require("../models");
const passport = require("../config/passport");
const Op = db.Sequelize.Op;
const Products = require("../config/etsyAPI.js");
products = new Products(db.products);

module.exports = function(app) {
  app.post("/api/articles", (req, res) => {
    db.articles
      .create({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        typeId: req.body.typeId
      })
      .then(dbArticle => {
        res.json(dbArticle);
      });
  });
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

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      emailOptIn: req.body.emailOptIn
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/api/articles", (req, res) => {
    db.articles.findAll({}).then(dbArticle => {
      res.json(dbArticle);
    });
  });

  // CREATE route for seeding the DATABASE, fix these later
  app.post("api/products", (req, res) => {
    db.products
      .create({
        listingId: req.body.listing_id,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        url: req.body.url,
        numFavorers: req.body.num_favorers,
        taxonomyPath: req.body.taxonomy_path
      })
      .then(dbProducts => {
        res.json(dbProducts);
      });
  });
  // READ route for seeing the best example of our favorite products *********************NEED TO WORK ON**************
  app.get("/api/products/category/:category", (req, res) => {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.get("/api/products/:tag", (req, res) => {
    console.log(req.params.tag);
    console.log("tag");
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

  app.get("/api/products/:id/image", (req, res) => {
    db.products
      .findOne({
        where: {
          listingId: req.params.id
        }
      })
      .then(results => {
        res.json(results.imageURL);
      });
  });

  // PUT route for updating users search history  ***********place holders for now*****************
  app.put("/api/user/:id", (req, res) => {
    db.user
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(dbPost => {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting user
  app.delete("/api/user/:id", (req, res) => {
    db.user
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbPost => {
        res.json(dbPost);
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
        email: req.user.email,
        emailOptIn: req.user.emailOptIn
      });
    }
  });
};
