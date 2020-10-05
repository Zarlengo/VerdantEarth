const db = require("../models");

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
};
