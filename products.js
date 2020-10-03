const express = require("express");
const app = express();
const fetch = require("node-fetch");
const Sequelize = require("sequelize");
require("dotenv").config();

function etsyApi() {


const listingURL1 = `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.txsog4n10f71882lvbdkpjyc}$keyword=zerowaste`
const listingURL2 = `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.txsog4n10f71882lvbdkpjyc}$keyword=compostable`
const listingURL3 = `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.txsog4n10f71882lvbdkpjyc}$keyword=reusable`
const listingURL4 = `https://openapi.etsy.com/v2/listings/active?api_key=${process.env.txsog4n10f71882lvbdkpjyc}$keyword=recyled`

const listingsToSeed = []

fetch(listingsURL)
  .then(res => res.json())
  .then(({results}) => {
    results.forEach(listing => {

      products.create({
        listing_id: listing.listing_id,
        title: listing.title,
        description: listing.description,
        url: listing.url,
        num_favorers: listing.num_favorers,
      }).then((results) => {
        console.log("db results: ", results);
      })
    })
  })}

  


  