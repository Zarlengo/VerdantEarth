const NewsApi = require("newsapi");
require("dotenv").config();

module.exports = function seedArticlesDb(articles) {
  const newsApi = new NewsApi(process.env.NEWS_API_KEY);
  const searchTerms = [
    {
      terms: "reusable, home, items, waste, eliminate",
      id: 1
    },
    {
      terms: "solar, energy, renewable, solution, panel",
      id: 2
    },
    {
      terms: "wind, energy, renewable, solution, turbine",
      id: 3
    }
  ];
  // terms: "reusable, home, items, eliminate, waste, environment, recycle",

  searchTerms.forEach(term => {
    newsApi.v2
      .everything({
        q: term.terms,
        language: "en",
        sortBy: "relevancy"
      })
      .then(results => {
        results.articles.forEach(article => {
          articles.create({
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.urlToImage,
            typeId: term.id
          });
        });
      });
    return articles;
  });
};
