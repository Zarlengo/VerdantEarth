// Class to handle the seeding of the articles into the webpage
module.exports = class Articles {
  constructor(articles) {
    // Loads dependencies
    const NewsApi = require("newsapi");
    const newsApi = new NewsApi(process.env.NEWS_API_KEY);

    // Defines the article search criteria
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

    // Cycles through each article and uploads them to the article table
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
    });
  }
};
