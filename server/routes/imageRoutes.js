const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

/**
 * @route   POST /api/images/generate
 * @desc    Generate an AI image from a text prompt
 * @access  Public
 * @body    { prompt, model?, steps?, height?, width?, enhance? }
 */
router.post('/generate', imageController.generateImage);

/**
 * @route   POST /api/images/enhance-prompt
 * @desc    Enhance a text prompt using AI
 * @access  Public
 * @body    { prompt }
 */
router.post('/enhance-prompt', imageController.enhancePrompt);

/**
 * @route   GET /api/images/chains
 * @desc    Get supported blockchain networks
 * @access  Public
 * @query   testnet? (true/false)
 */
router.get('/chains', imageController.getChains);

/**
 * @route   POST /api/images/generate-nft
 * @desc    Generate an NFT with image and metadata using ChainGPT
 * @access  Public
 * @body    { prompt, walletAddress, chainId, model?, steps?, height?, width?, enhance?, amount? }
 */
router.post('/generate-nft', imageController.generateNft);

/**
 * @route   POST /api/images/mint-nft
 * @desc    Mint an NFT using ChainGPT
 * @access  Public
 * @body    { collectionId, name, description, symbol, ids }
 */
router.post('/mint-nft', imageController.mintNft);

/**
 * @route   GET /api/images/nft-progress/:collectionId
 * @desc    Get NFT generation progress
 * @access  Public
 */
router.get('/nft-progress/:collectionId', imageController.getNftProgress);

module.exports = router;
