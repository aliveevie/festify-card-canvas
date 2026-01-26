/**
 * API service for ChainGPT image generation
 */

// Get API URL from environment variables (Vite requires VITE_ prefix)
// Set this in .env.local file: VITE_API_URL=http://localhost:3001
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error('❌ VITE_API_URL is not set in .env.local');
  console.error('Please add: VITE_API_URL=http://localhost:3001 (or your server URL) to .env.local');
}

export interface GenerateImageParams {
  prompt: string;
  model?: 'velogen' | 'nebula_forge_xl' | 'VisionaryForge' | 'Dale3';
  steps?: number;
  height?: number;
  width?: number;
  enhance?: '1x' | '2x' | 'original';
}

export interface GenerateImageResponse {
  success: boolean;
  message: string;
  data: {
    type: 'Buffer';
    data: number[];
  };
}

export interface EnhancePromptResponse {
  success: boolean;
  message: string;
  data: {
    enhancedPrompt: string;
  };
}

export interface ChainInfo {
  chainId: number;
  name: string;
  network: 'mainnet' | 'testnet';
}

export interface GetChainsResponse {
  success: boolean;
  message: string;
  data: {
    chains: ChainInfo[];
  };
}

/**
 * Generate an AI image from a text prompt
 */
export async function generateImage(params: GenerateImageParams): Promise<GenerateImageResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured. Please set VITE_API_URL in .env.local');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/images/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate image');
  }

  return response.json();
}

/**
 * Enhance a text prompt using AI
 */
export async function enhancePrompt(prompt: string): Promise<EnhancePromptResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured. Please set VITE_API_URL in .env.local');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/images/enhance-prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to enhance prompt');
  }

  return response.json();
}

/**
 * Get supported blockchain networks
 */
export async function getChains(includeTestnets = false): Promise<GetChainsResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured. Please set VITE_API_URL in .env.local');
  }
  
  const response = await fetch(
    `${API_BASE_URL}/api/images/chains?testnet=${includeTestnets}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch chains');
  }

  return response.json();
}

/**
 * Convert image buffer data to base64 data URL
 */
export function bufferToDataURL(bufferData: number[]): string {
  const bytes = new Uint8Array(bufferData);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:image/jpeg;base64,${base64}`;
}

/**
 * Convert image buffer data to Blob
 */
export function bufferToBlob(bufferData: number[]): Blob {
  const bytes = new Uint8Array(bufferData);
  return new Blob([bytes], { type: 'image/jpeg' });
}

export interface GenerateNftParams {
  prompt: string;
  walletAddress: string;
  chainId: number;
  model?: 'velogen' | 'nebula_forge_xl' | 'VisionaryForge' | 'Dale3';
  steps?: number;
  height?: number;
  width?: number;
  enhance?: '1x' | '2x' | 'original';
  amount?: number;
}

export interface GenerateNftResponse {
  success: boolean;
  message: string;
  data: {
    collectionId: string;
    images?: string[];
    generated?: boolean;
  };
}

export interface MintNftParams {
  collectionId: string;
  name: string;
  description: string;
  symbol: string;
  ids: number[];
}

export interface MintNftResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    description: string;
    image: string;
    attributes?: any[];
    collectionId: string;
    transaction?: string | null;
  };
}

/**
 * Generate an NFT with image and metadata using ChainGPT
 */
export async function generateNft(params: GenerateNftParams): Promise<GenerateNftResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured. Please set VITE_API_URL in .env.local');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/images/generate-nft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate NFT');
  }

  return response.json();
}

/**
 * Mint an NFT using ChainGPT
 */
export async function mintNft(params: MintNftParams): Promise<MintNftResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured. Please set VITE_API_URL in .env.local');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/images/mint-nft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to mint NFT');
  }

  return response.json();
}
