const NewsApi = require("newsapi");
require("dotenv").config();

module.exports = function getArticles(articles) {
  const newsApi = new NewsApi(process.env.NEWS_API_KEY);
  const searchTerms = [
    {
      terms: "eliminate, home, waste, methods",
      id: 1
    }
  ];

  newsApi.v2
    .everything({
      q: `${searchTerms.terms}`, // some keyword will get sent in here depending on the type of search the user is looking for
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
