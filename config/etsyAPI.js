// Class to handle the ETSY api call
module.exports = class ETSY {
  constructor(products) {
    // Load dependencies
    this.fetch = require("node-fetch");

    // Tag types to search ETSY for
    const listingURLs = [
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=zerowaste`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=compostable`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=reusable`,
      `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.ETSY_key}&tags=recyled`
    ];

    products.findAll().then(results => {
      const currentIds = results.map(row => row.listingId);


      // Cycles through each URL
      listingURLs.forEach(listingURL => {
        this.fetch(listingURL)
          .then(response => response.json())
          .then(results => results.results)
          .then(listingArray => {
            setTimeout(() => {
              // Notification that the URL has uploaded all the articles
              console.log("ETSY seed complete");
            }, listingArray.length * 1000);

            // Cycles through each tag array
            for (let index = 0; index < listingArray.length; index++) {
              const listing = listingArray[index];

              if (!(listing.listing_id in currentIds)) {
                // Adds the product to the database
                products.create({
                  listingId: listing.listing_id,
                  title: listing.title,
                  description: listing.description,
                  url: listing.url,
                  numFavorers: listing.num_favorers,
                  tags: JSON.stringify(listing.tags)
                });

                // A timer delay in the ETSY API call as there is a limit of 10 per second with the free level
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
                    // Since the initial ETSY object does not include a product image URL, ETSY is called again to acquire that URL
                    .then(imageObject => {
                      if (imageObject !== null) {
                        products.update(
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
            }
          })
          .catch(err => console.log(err));
      });
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
