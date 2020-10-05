const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    let hbsObj = {};
    db.articles.findAll({}).then(dbArticle => {
      hbsObj = {
        articles: dbArticle
      };
      res.render("index", hbsObj);
    });
  });
};
