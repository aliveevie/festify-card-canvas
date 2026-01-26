const nft = require('../config/chaingpt');
const { Errors } = require('@chaingpt/nft');

/**
 * Generate an AI image from a text prompt
 * @param {Object} params - Generation parameters
 * @param {string} params.prompt - Text description of the image
 * @param {string} params.model - AI model to use (velogen, nebula_forge_xl, VisionaryForge, Dale3)
 * @param {number} params.steps - Number of refinement steps (optional)
 * @param {number} params.height - Image height in pixels
 * @param {number} params.width - Image width in pixels
 * @param {string} params.enhance - Upscaling option: "1x", "2x", or "original" (optional)
 * @returns {Promise<Object>} Image generation result
 */
async function generateImage(params) {
  try {
    const { prompt, model = 'velogen', steps, height = 512, width = 512, enhance } = params;

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const imageParams = {
      prompt,
      model,
      height,
      width
    };

    if (steps !== undefined) {
      imageParams.steps = steps;
    }

    if (enhance) {
      imageParams.enhance = enhance;
    }

    const result = await nft.generateImage(imageParams);
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'Image generation failed',
      error: error.message
    };
  }
}

/**
 * Enhance a text prompt using AI
 * @param {string} prompt - Original prompt text
 * @returns {Promise<Object>} Enhanced prompt result
 */
async function enhancePrompt(prompt) {
  try {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const result = await nft.enhancePrompt({ prompt });
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'Prompt enhancement failed',
      error: error.message
    };
  }
}

/**
 * Get supported blockchain networks
 * @param {boolean} includeTestnets - Whether to include test networks
 * @returns {Promise<Object>} List of supported chains
 */
async function getChains(includeTestnets = false) {
  try {
    const result = await nft.getChains(includeTestnets);
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'Failed to fetch chains',
      error: error.message
    };
  }
}

/**
 * Generate an NFT with image and metadata (using ChainGPT NFT generation with queue)
 * Uses queued generation to avoid IPFS upload timeouts
 * @param {Object} params - NFT generation parameters
 * @param {string} params.prompt - Text description of the image
 * @param {string} params.walletAddress - Recipient wallet address
 * @param {number} params.chainId - Blockchain chain ID
 * @param {string} params.model - AI model to use
 * @param {number} params.steps - Number of refinement steps
 * @param {number} params.height - Image height
 * @param {number} params.width - Image width
 * @param {string} params.enhance - Upscaling option
 * @param {number} params.amount - Number of NFTs to generate
 * @returns {Promise<Object>} NFT generation result with collectionId
 */
async function generateNft(params) {
  try {
    const {
      prompt,
      walletAddress,
      chainId,
      model = 'velogen',
      steps = 10,
      height = 1024,
      width = 1024,
      enhance = '1x',
      amount = 1
    } = params;

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    if (!chainId) {
      throw new Error('Chain ID is required');
    }

    const nftParams = {
      prompt,
      walletAddress,
      chainId,
      model,
      steps,
      height,
      width,
      enhance,
      amount
    };

    // Use queued generation - returns immediately with collectionId
    const queueResult = await nft.generateNftWithQueue(nftParams);
    
    if (!queueResult.data || !queueResult.data.collectionId) {
      throw new Error('Failed to queue NFT generation');
    }

    const collectionId = queueResult.data.collectionId;
    
    // Return collectionId immediately - minting can proceed
    // ChainGPT will handle IPFS upload in the background
    return {
      success: true,
      data: {
        collectionId,
        status: queueResult.data.status || 'queued'
      }
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'NFT generation failed',
      error: error.message
    };
  }
}

/**
 * Mint an NFT using ChainGPT
 * @param {Object} params - Minting parameters
 * @param {string} params.collectionId - Collection ID from generation
 * @param {string} params.name - NFT name
 * @param {string} params.description - NFT description
 * @param {string} params.symbol - NFT symbol
 * @param {number[]} params.ids - Array of token IDs to mint
 * @returns {Promise<Object>} Minting result
 */
async function mintNft(params) {
  try {
    const { collectionId, name, description, symbol, ids } = params;

    if (!collectionId) {
      throw new Error('Collection ID is required');
    }

    if (!name || !description || !symbol) {
      throw new Error('Name, description, and symbol are required');
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('Token IDs array is required');
    }

    const result = await nft.mintNft({
      collectionId,
      name,
      description,
      symbol,
      ids
    });

    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'NFT minting failed',
      error: error.message
    };
  }
}

/**
 * Get NFT generation progress
 * @param {string} collectionId - Collection ID from queued generation
 * @returns {Promise<Object>} Progress status
 */
async function getNftProgress(collectionId) {
  try {
    if (!collectionId) {
      throw new Error('Collection ID is required');
    }

    const result = await nft.getNftProgress({ collectionId });
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    if (error instanceof Errors.NftError) {
      throw {
        statusCode: 400,
        message: 'ChainGPT API Error',
        error: error.message
      };
    }
    throw {
      statusCode: 500,
      message: 'Failed to get NFT progress',
      error: error.message
    };
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
