const imageService = require('../services/imageService');

/**
 * Generate an AI image
 * POST /api/images/generate
 */
async function generateImage(req, res, next) {
  try {
    const { prompt, model, steps, height, width, enhance } = req.body;

    const result = await imageService.generateImage({
      prompt,
      model,
      steps,
      height,
      width,
      enhance
    });

    res.status(200).json({
      success: true,
      message: 'Image generated successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Enhance a text prompt
 * POST /api/images/enhance-prompt
 */
async function enhancePrompt(req, res, next) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const result = await imageService.enhancePrompt(prompt);

    res.status(200).json({
      success: true,
      message: 'Prompt enhanced successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get supported blockchain networks
 * GET /api/images/chains
 */
async function getChains(req, res, next) {
  try {
    const includeTestnets = req.query.testnet === 'true';

    const result = await imageService.getChains(includeTestnets);

    res.status(200).json({
      success: true,
      message: 'Chains retrieved successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Generate an NFT with image and metadata
 * POST /api/images/generate-nft
 */
async function generateNft(req, res, next) {
  try {
    const { prompt, walletAddress, chainId, model, steps, height, width, enhance, amount } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address is required'
      });
    }

    if (!chainId) {
      return res.status(400).json({
        success: false,
        message: 'Chain ID is required'
      });
    }

    const result = await imageService.generateNft({
      prompt,
      walletAddress,
      chainId,
      model,
      steps,
      height,
      width,
      enhance,
      amount
    });

    res.status(200).json({
      success: true,
      message: 'NFT generation started successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Mint an NFT using ChainGPT
 * POST /api/images/mint-nft
 */
async function mintNft(req, res, next) {
  try {
    const { collectionId, name, description, symbol, ids } = req.body;

    if (!collectionId) {
      return res.status(400).json({
        success: false,
        message: 'Collection ID is required'
      });
    }

    if (!name || !description || !symbol) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and symbol are required'
      });
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Token IDs array is required'
      });
    }

    const result = await imageService.mintNft({
      collectionId,
      name,
      description,
      symbol,
      ids
    });

    res.status(200).json({
      success: true,
      message: 'NFT minted successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get NFT generation progress
 * GET /api/images/nft-progress/:collectionId
 */
async function getNftProgress(req, res, next) {
  try {
    const { collectionId } = req.params;

    if (!collectionId) {
      return res.status(400).json({
        success: false,
        message: 'Collection ID is required'
      });
    }

    const result = await imageService.getNftProgress(collectionId);

    res.status(200).json({
      success: true,
      message: 'Progress retrieved successfully',
      data: result.data
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateImage,
  enhancePrompt,
  getChains,
  generateNft,
  mintNft,
  getNftProgress
};
