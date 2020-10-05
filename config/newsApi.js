const NewsApi = require("newsapi");
require("dotenv").config();

module.exports = function seedArticlesDb(articles) {
  const newsApi = new NewsApi(process.env.NEWS_API_KEY);
  const searchTerms = {
    terms: "reusable, home, items",
    id: 1
  };
  // terms: "reusable, home, items, eliminate, waste, environment, recycle",

  console.log(searchTerms.terms);
  newsApi.v2
    .everything({
      q: `${searchTerms.terms}`,
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
          typeId: searchTerms.id
        });
        // console.log(article);
      });
    });
  return articles;
};
