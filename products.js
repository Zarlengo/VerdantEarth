module.exports = function etsyApi(products) {
  const fetch = require("node-fetch");
  const listingUrl = [`https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key || "txsog4n10f71882lvbdkpjyc"}&keyword=zerowaste`,
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key || "txsog4n10f71882lvbdkpjyc"}&keyword=compostable`,
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key || "txsog4n10f71882lvbdkpjyc"}&keyword=reusable`,
    `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key || "txsog4n10f71882lvbdkpjyc"}&keyword=recyled`
  ];
  listingUrl.forEach(listingsURL => {
    fetch(listingsURL)
      .then(res => res.json())
      .then(({ results }) => {
        console.log(results);
        results.forEach(listing => {
          products.create({
            listingId: listing.listing_id,
            title: listing.title,
            description: listing.description,
            url: listing.url,
            numFavorers: listing.num_favorers,
            tags: JSON.stringify(listing.tags)
          });
        });
      })
      .catch(err => console.log(err));
  });
};
