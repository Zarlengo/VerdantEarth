const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index", { hello: "hello" });
  });
  app.get("/product", (req, res) => {
    let hbsObj = {};
    db.articles
      .findAll({
        where: {
          typeId: 1
        },
        limit: 8
      })
      .then(dbArticle => {
        hbsObj = {
          articles: dbArticle
        };
        res.render("product", hbsObj);
      });
  });
  app.get("/solar", (req, res) => {
    let hbsObj = {};
    db.articles
      .findAll({
        where: {
          typeId: 2
        },
        limit: 8
      })
      .then(dbArticle => {
        hbsObj = {
          articles: dbArticle
        };
        res.render("solar", hbsObj);
      });
  });
  app.get("/wind", (req, res) => {
    let hbsObj = {};
    db.articles
      .findAll({
        where: {
          typeId: 3
        },
        limit: 8
      })
      .then(dbArticle => {
        hbsObj = {
          articles: dbArticle
        };
        res.render("wind", hbsObj);
      });
  });
  app.get("/login", (req, res) => {
    res.render("login", { hello: "hello" });
  });
  app.get("/signup", (req, res) => {
    res.render("signup", { hello: "hello" });
  });
  app.get("/profile", (req, res) => {
    res.render("profile", { hello: "hello" });
  });
};
