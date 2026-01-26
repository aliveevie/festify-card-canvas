const { Nft } = require('@chaingpt/nft');
require('dotenv').config();

// Initialize ChainGPT NFT SDK instance
const nft = new Nft({
  apiKey: process.env.API_KEY
});

module.exports = nft;
