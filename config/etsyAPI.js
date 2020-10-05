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
          setTimeout(() => {
            console.log("ETSY seed complete");
          }, listingArray.length * 1000);
          for (let index = 0; index < listingArray.length; index++) {
            const listing = listingArray[index];
            this.products.create({
              listingId: listing.listing_id,
              title: listing.title,
              description: listing.description,
              url: listing.url,
              numFavorers: listing.num_favorers,
              tags: JSON.stringify(listing.tags)
            });
            setTimeout(() => {
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
                        imageURL: imageObject.results[0].url_570xN
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
            }, index * 1000);
          }
        })
        .catch(err => console.log(err));
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
