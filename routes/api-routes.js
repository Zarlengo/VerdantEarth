const db = require("../models");
const passport = require("../config/passport");
const Op = db.Sequelize.Op;
const Products = require("../config/etsyAPI.js");
let products = new Products(db.products);

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

  app.get("/api/articles/", (req, res) => {
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
  app.delete("/api/posts/:id", (req, res) => {
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
};
