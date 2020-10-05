// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    //if (req.user) {
    //res.redirect("/members");
    //}
    // let hbsObj = {};
    // db.articles.findAll({}).then(dbArticle => {
    //   hbsObj = {
    //     articles: dbArticle
    //   };
    //res.render("index", hbsObj);
    res.render("index", { hello: "hello" });
    // });
  });
  app.get("/product", (req, res) => {
    res.render("product", { hello: "hello" });
  });
  app.get("/solar", (req, res) => {
    res.render("solar", { hello: "hello" });
  });
  app.get("/wind", (req, res) => {
    res.render("wind", { hello: "hello" });
  });
  app.get("*", (req, res) => {
    res.render("index", { hello: "hello" });
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
