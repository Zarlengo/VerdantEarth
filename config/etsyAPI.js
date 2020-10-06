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
        .then(async listingArray => {
          listingArray.forEach(listing => {
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
<<<<<<< HEAD
                    );
                  }
                })
                .catch(error => console.log(error));
            }, index * 1000);
          }
=======
                    }
                  );
                }
              })
              .catch(error => console.log(error));
          });
          await this.sleep(1000);
>>>>>>> 1d0058ae4c107e13caca1f9bedfaf9e7b6394dc5
        })
        .catch(err => console.log(err));
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
