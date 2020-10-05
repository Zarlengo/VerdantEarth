module.exports = class ETSY {
  constructor(products) {
    this.fetch = require("node-fetch");
    this.products = products;
    const listingURLs = [
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=zerowaste`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=compostable`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=reusable`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=recyled`
    ];
    listingURLs.forEach(listingURL => {
      this.fetch(listingURL)
        .then(response => response.json())
        .then(results => results.results)
        .then(listingArray => {
          listingArray.forEach(listing => {
            this.products.create({
              listingId: listing.listing_id,
              title: listing.title,
              description: listing.description,
              url: listing.url,
              numFavorers: listing.num_favorers,
              tags: JSON.stringify(listing.tags)
            });
            this.fetch(
              `https://openapi.etsy.com/v2/listings/${listing.listing_id}/images?api_key=${process.env.ETSY_key}&type=json`
            )
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return null;
              })
              .then(imageObject => {
                if (imageObject !== null) {
                  this.products.update(
                    {
                      imageURL: imageObject.results[0].url_75x75
                    },
                    {
                      where: {
                        listingId: listing.listing_id
                      }
                    }
                  );
                }
              })
              .catch(error => console.log(error));
          });
        })
        .catch(err => console.log(err));
    });
  }
};
