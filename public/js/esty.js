const exphbs = require('express-handlebars');
const { DataTypes } = require('sequelize/types');
const db = require('../../models');

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// How do we want to filter out our favorites?
const products = sequelize.define ("products", {
    listing_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
       },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    num_favorers: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    taxonomy_path: {
        type: DataTypes.STRING,
        allowNull: true
    }

})
// CREATE route for seeding the DATABASE
app.post ('api/products', function (req, res){
    db.products.create({
        listing_id: req.body.listing_id,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        url: req.body.url,
        num_favorers: req.body.num_favorers,
        taxonomy_path: req.body.taxonomy_path
    })
    .then (function (dbProducts) {
        res.json(dbProducts)
    })
})

// READ route for seeing the best example of our favorite products *********************NEED TO WORK ON**************
app.get("/api/products/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

// PUT route for updating users search history  ***********what is the URL for this?*****************
app.put("/api/posts", function(req, res) {
    db.user.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

// DELETE route for deleting products
app.delete("/api/products/:listing_id", function(req, res) {
    db.products.destroy({
      where: {
        listing_id: req.params.listing_id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

// DELETE route for deleting user
app.delete("/api/posts/:id", function(req, res) {
    db.user.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

